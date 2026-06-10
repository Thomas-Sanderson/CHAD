import type { VocabWord } from "../types";
import { isMuted } from "./sfx";

// Chrome's speechSynthesis corrupts when cancel() and speak() are
// called in rapid succession. We avoid cancel() entirely — instead
// we track a single utterance and let it finish naturally, or
// replace it by speaking over it (which Chrome handles fine).
//
// For rapid-fire letter sounds (WASD navigator), we skip
// speechSynthesis and use a short silence — the drill action
// speaks the full word which is the important audio.

let speaking = false;
let pendingSpeech: ReturnType<typeof setTimeout> | null = null;

export function pronounceWord(word: VocabWord): void {
  if (word.audioNormal || word.audioSlow) {
    const src = word.audioNormal ?? word.audioSlow!;
    const audio = new Audio(src);
    audio.play().catch(() => {
      doSpeak(word.script, word.pronunciation);
    });
    return;
  }

  doSpeak(word.script, word.pronunciation);
}

export function speakText(text: string): void {
  doSpeak(text);
}

/** Chad's voice: default pitch/rate, English lang so TTS butchers the Cyrillic naturally */
export function speakAsChad(text: string): void {
  doSpeak(text, undefined, { lang: "en-US", male: true });
}

export function speakScold(text: string): void {
  doSpeak(text, undefined, { pitch: 1.4, rate: 1.1 });
}

interface VoiceOpts {
  pitch?: number;
  rate?: number;
  lang?: string; // force a specific lang code (e.g. "en-US" for Chad's bad accent)
  male?: boolean; // try to pick a male voice
}

function doSpeak(text: string, pronunciation?: string, opts?: VoiceOpts): void {
  if (typeof speechSynthesis === "undefined") return;
  if (isMuted()) return;

  // Clear any pending queued speech
  if (pendingSpeech !== null) {
    clearTimeout(pendingSpeech);
    pendingSpeech = null;
  }

  // If currently speaking, cancel and wait before re-speaking.
  // If idle, speak immediately.
  // For scripts without browser TTS support (Amharic), use pronunciation (Latin) with English voice
  const detectedLang = detectLang(text);
  const needsFallback = detectedLang === "am-ET" && pronunciation;
  const speakable = needsFallback ? pronunciation : text;
  const speakLang = opts?.lang ?? (needsFallback ? "en-US" : detectedLang);

  if (speaking) {
    speechSynthesis.cancel();
    speaking = false;
    pendingSpeech = setTimeout(() => {
      pendingSpeech = null;
      fireSpeak(speakable, speakLang, opts?.pitch, opts?.rate, opts?.male);
    }, 80);
  } else {
    fireSpeak(speakable, speakLang, opts?.pitch, opts?.rate, opts?.male);
  }
}

function detectLang(text: string): string {
  // Ge'ez script (Amharic/Ethiopic): U+1200–U+137F
  if (/[\u1200-\u137F]/.test(text)) return "am-ET";
  // Cyrillic script: Russian
  if (/[\u0400-\u04FF]/.test(text)) return "ru-RU";
  // Latin script defaults to Italian (only Latin-script skin for now)
  return "it-IT";
}

// Cache male voice per lang so async getVoices() quirks don't cause reversion
const maleVoiceCache = new Map<string, SpeechSynthesisVoice>();

function findMaleVoice(lang: string): SpeechSynthesisVoice | null {
  const cached = maleVoiceCache.get(lang);
  if (cached) return cached;

  const voices = speechSynthesis.getVoices();
  if (voices.length === 0) return null; // voices not loaded yet, try next time

  const langPrefix = lang.split("-")[0]!;
  const matching = voices.filter((v) => v.lang.startsWith(langPrefix));
  // Common male voice name patterns across platforms
  const male = matching.find((v) =>
    /\b(male|daniel|james|tom|fred|alex|aaron|rishi|jorge|luca)\b/i.test(v.name)
  );
  if (male) { maleVoiceCache.set(lang, male); return male; }
  // On macOS, non-"enhanced" voices with no gender hint — pick one that isn't Samantha/Karen/etc.
  const notFemale = matching.find((v) =>
    !/\b(samantha|karen|victoria|fiona|moira|tessa|susan|kate|zoe|allison)\b/i.test(v.name)
  );
  if (notFemale) { maleVoiceCache.set(lang, notFemale); return notFemale; }
  return null;
}

// Pre-warm voice cache when voices become available
if (typeof speechSynthesis !== "undefined") {
  speechSynthesis.addEventListener("voiceschanged", () => {
    maleVoiceCache.clear(); // re-resolve on voice list changes
    findMaleVoice("en-US");
  });
}

function fireSpeak(
  text: string,
  lang?: string,
  pitch?: number,
  rate?: number,
  male?: boolean,
): void {
  if (typeof speechSynthesis === "undefined") return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang ?? detectLang(text);
  utterance.rate = rate ?? 0.8;
  if (pitch !== undefined) utterance.pitch = pitch;
  if (male) {
    const voice = findMaleVoice(utterance.lang);
    if (voice) utterance.voice = voice;
  }
  utterance.onstart = () => { speaking = true; };
  utterance.onend = () => { speaking = false; };
  utterance.onerror = () => { speaking = false; };
  speechSynthesis.speak(utterance);
}

/** Queue speech after the current utterance finishes — no cancel, no overlap. */
export function speakQueued(text: string, opts?: VoiceOpts): void {
  if (typeof speechSynthesis === "undefined") return;
  if (isMuted()) return;
  const lang = detectLang(text);
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = opts?.rate ?? 0.8;
  if (opts?.pitch !== undefined) utterance.pitch = opts.pitch;
  utterance.onstart = () => { speaking = true; };
  utterance.onend = () => { speaking = false; };
  utterance.onerror = () => { speaking = false; };
  speechSynthesis.speak(utterance);
}

export function stopAll(): void {
  if (pendingSpeech !== null) {
    clearTimeout(pendingSpeech);
    pendingSpeech = null;
  }
  speaking = false;
  if (typeof speechSynthesis !== "undefined") {
    speechSynthesis.cancel();
  }
}
