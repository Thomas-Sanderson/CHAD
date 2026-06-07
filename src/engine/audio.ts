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
      doSpeak(word.cyrillic);
    });
    return;
  }

  doSpeak(word.cyrillic);
}

export function speakText(text: string): void {
  doSpeak(text);
}

function doSpeak(text: string): void {
  if (typeof speechSynthesis === "undefined") return;

  // Clear any pending queued speech
  if (pendingSpeech !== null) {
    clearTimeout(pendingSpeech);
    pendingSpeech = null;
  }

  // If currently speaking, cancel and wait before re-speaking.
  // If idle, speak immediately.
  if (speaking) {
    speechSynthesis.cancel();
    speaking = false;
    pendingSpeech = setTimeout(() => {
      pendingSpeech = null;
      fireSpeak(text);
    }, 80);
  } else {
    fireSpeak(text);
  }
}

function detectLang(text: string): string {
  // Ge'ez script (Amharic/Ethiopic): U+1200–U+137F
  if (/[\u1200-\u137F]/.test(text)) return "am-ET";
  return "ru-RU";
}

function fireSpeak(text: string): void {
  if (typeof speechSynthesis === "undefined") return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = detectLang(text);
  utterance.rate = 0.8;
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
