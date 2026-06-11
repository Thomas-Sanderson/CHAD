// Speech recognition engine for the reveal screen speech gate.
// Uses the Web Speech API (SpeechRecognition) with generous fuzzy
// matching — the player is learning, not being tested.

// --- Type declarations (not all DOM libs include these) ---
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}
interface SpeechRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative | undefined;
}
interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult | undefined;
}
interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}
interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}
interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
interface SpeechRecognitionCtor {
  new (): SpeechRecognitionInstance;
}

const CONSENT_KEY = "speech-recognition-consent";

// --- Feature detection ---

export function isSpeechAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
  );
}

// --- Privacy consent (one-time, localStorage) ---

export function getSpeechConsent(): boolean | null {
  const v = localStorage.getItem(CONSENT_KEY);
  if (v === "yes") return true;
  if (v === "no") return false;
  return null;
}

export function setSpeechConsent(consent: boolean): void {
  localStorage.setItem(CONSENT_KEY, consent ? "yes" : "no");
}

// --- Levenshtein distance ---

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let curr = new Array<number>(n + 1);
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      curr[j] =
        a[i - 1] === b[j - 1]
          ? prev[j - 1]!
          : 1 + Math.min(prev[j - 1]!, prev[j]!, curr[j - 1]!);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n]!;
}

// --- Fuzzy matching (multi-strategy, generous) ---

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, "").replace(/ё/g, "е");
}

export function fuzzyMatch(
  transcript: string,
  expected: string,
  pronunciation?: string,
): { match: boolean; distance: number } {
  const t = normalize(transcript);
  const e = normalize(expected);

  // 1. Exact
  if (t === e) return { match: true, distance: 0 };
  // 2. Contains — API may return extra words around the target
  if (t.includes(e)) return { match: true, distance: 0 };
  // 3. Levenshtein ≤ 3
  const dist = levenshtein(t, e);
  if (dist <= 3) return { match: true, distance: dist };
  // 4. Starts with first 3+ chars (trailing garbage from background noise)
  const prefixLen = Math.max(3, Math.floor(e.length / 2));
  if (e.length >= 3 && t.startsWith(e.slice(0, prefixLen)))
    return { match: true, distance: dist };
  // 5. Phonetic fallback — compare pronunciation (Latin) if API returned Latin
  if (pronunciation) {
    const p = normalize(pronunciation.replace(/-/g, ""));
    const pDist = levenshtein(t, p);
    if (t === p || t.includes(p) || pDist <= 3)
      return { match: true, distance: Math.min(dist, pDist) };
  }
  return { match: false, distance: dist };
}

// --- Listen for a word ---

export type SpeechResult =
  | { type: "match"; transcript: string; distance: number }
  | { type: "no_match"; transcript: string; distance: number }
  | { type: "no_speech" }
  | { type: "error"; error: string };

export function listenForWord(
  expected: string,
  pronunciation?: string,
): Promise<SpeechResult> {
  return new Promise((resolve) => {
    // Cancel any active TTS — Chrome/Brave can't listen while speaking
    if (typeof speechSynthesis !== "undefined") {
      speechSynthesis.cancel();
    }

    const w = window as unknown as Record<string, unknown>;
    const Ctor = (w["SpeechRecognition"] ??
      w["webkitSpeechRecognition"]) as SpeechRecognitionCtor | undefined;

    if (!Ctor) {
      resolve({ type: "error", error: "not_supported" });
      return;
    }

    let resolved = false;
    const done = (result: SpeechResult) => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timeout);
      resolve(result);
    };

    const recognition = new Ctor();
    recognition.lang = "ru-RU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognition.continuous = true;

    let started = false;

    // Safety timeout — stop after 8 seconds if no result
    let timeout: ReturnType<typeof setTimeout>;

    recognition.onstart = () => {
      started = true;
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const results = event.results[0];
      if (!results || results.length === 0) {
        done({ type: "no_speech" });
        return;
      }

      let bestDistance = Infinity;
      let bestTranscript = "";

      // Check all alternatives — the third-best guess might match
      for (let i = 0; i < results.length; i++) {
        const alt = results[i];
        if (!alt || alt.confidence < 0.2) continue;
        const transcript = alt.transcript.trim();
        const m = fuzzyMatch(transcript, expected, pronunciation);
        if (m.match) {
          recognition.stop();
          done({ type: "match", transcript, distance: m.distance });
          return;
        }
        if (m.distance < bestDistance) {
          bestDistance = m.distance;
          bestTranscript = transcript;
        }
      }

      recognition.stop();
      done(
        bestTranscript
          ? {
              type: "no_match",
              transcript: bestTranscript,
              distance: bestDistance,
            }
          : { type: "no_speech" },
      );
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      // "no-speech" is the browser error code — map to our no_speech result
      if (event.error === "no-speech" || event.error === "aborted") {
        done({ type: "no_speech" });
        return;
      }
      done({ type: "error", error: event.error });
    };

    recognition.onend = () => {
      done(started ? { type: "no_speech" } : { type: "error", error: "session_ended" });
    };

    // Delay start to let audio system settle after TTS cancel
    setTimeout(() => {
      try {
        recognition.start();
        timeout = setTimeout(() => {
          recognition.stop();
        }, 8000);
      } catch {
        done({ type: "error", error: "start_failed" });
      }
    }, 250);
  });
}
