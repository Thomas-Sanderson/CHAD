import type { VocabWord } from "../types";

// Pending speech timer — lets us cancel queued speech without breaking Chrome
let pendingSpeech: ReturnType<typeof setTimeout> | null = null;

export function pronounceWord(word: VocabWord): void {
  if (word.audioNormal || word.audioSlow) {
    const src = word.audioNormal ?? word.audioSlow!;
    const audio = new Audio(src);
    audio.play().catch(() => {
      queueSpeak(word.cyrillic);
    });
    return;
  }

  queueSpeak(word.cyrillic);
}

export function speakText(text: string): void {
  queueSpeak(text);
}

// Cancel any in-flight speech, then speak after a tick.
// The setTimeout gives Chrome's speechSynthesis time to
// process the cancel before we call speak() again.
function queueSpeak(text: string): void {
  if (typeof speechSynthesis === "undefined") return;

  if (pendingSpeech !== null) {
    clearTimeout(pendingSpeech);
    pendingSpeech = null;
  }

  speechSynthesis.cancel();

  pendingSpeech = setTimeout(() => {
    pendingSpeech = null;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }, 50);
}

export function stopAll(): void {
  if (pendingSpeech !== null) {
    clearTimeout(pendingSpeech);
    pendingSpeech = null;
  }
  if (typeof speechSynthesis !== "undefined") {
    speechSynthesis.cancel();
  }
}
