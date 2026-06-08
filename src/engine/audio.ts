import type { VocabWord } from "../types";

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

export function speakScold(text: string): void {
  doSpeak(text, undefined, { pitch: 1.4, rate: 1.1 });
}

interface VoiceOpts {
  pitch?: number;
  rate?: number;
}

function doSpeak(text: string, pronunciation?: string, opts?: VoiceOpts): void {
  if (typeof speechSynthesis === "undefined") return;

  // Clear any pending queued speech
  if (pendingSpeech !== null) {
    clearTimeout(pendingSpeech);
    pendingSpeech = null;
  }

  // If currently speaking, cancel and wait before re-speaking.
  // If idle, speak immediately.
  // For scripts without browser TTS support (Amharic), use pronunciation (Latin) with English voice
  const lang = detectLang(text);
  const speakable = (lang !== "ru-RU" && pronunciation) ? pronunciation : text;
  const speakLang = (lang !== "ru-RU" && pronunciation) ? "en-US" : lang;

  if (speaking) {
    speechSynthesis.cancel();
    speaking = false;
    pendingSpeech = setTimeout(() => {
      pendingSpeech = null;
      fireSpeak(speakable, speakLang, opts?.pitch, opts?.rate);
    }, 80);
  } else {
    fireSpeak(speakable, speakLang, opts?.pitch, opts?.rate);
  }
}

function detectLang(text: string): string {
  // Ge'ez script (Amharic/Ethiopic): U+1200–U+137F
  if (/[\u1200-\u137F]/.test(text)) return "am-ET";
  return "ru-RU";
}

function fireSpeak(
  text: string,
  lang?: string,
  pitch?: number,
  rate?: number,
): void {
  if (typeof speechSynthesis === "undefined") return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang ?? detectLang(text);
  utterance.rate = rate ?? 0.8;
  if (pitch !== undefined) utterance.pitch = pitch;
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
