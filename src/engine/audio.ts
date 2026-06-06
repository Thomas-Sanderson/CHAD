import type { VocabWord } from "../types";

// Chrome's speechSynthesis breaks if you call cancel() too rapidly.
// This guard prevents the stuck-state bug.
let lastSpeakTime = 0;

export function pronounceWord(word: VocabWord): void {
  // Try audioNormal → audioSlow → Web Speech API
  if (word.audioNormal || word.audioSlow) {
    const src = word.audioNormal ?? word.audioSlow!;
    const audio = new Audio(src);
    audio.play().catch(() => {
      speakCyrillic(word.cyrillic);
    });
    return;
  }

  speakCyrillic(word.cyrillic);
}

function speakCyrillic(text: string): void {
  if (typeof speechSynthesis === "undefined") return;

  // Cancel previous only if enough time has passed to avoid Chrome bug
  const now = Date.now();
  if (now - lastSpeakTime > 100 && speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
  lastSpeakTime = now;

  // Chrome sometimes gets stuck after cancel — resume/pause cycle unsticks it
  speechSynthesis.resume();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ru-RU";
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
}

export function speakText(text: string): void {
  speakCyrillic(text);
}

export function stopAll(): void {
  if (typeof speechSynthesis !== "undefined") {
    speechSynthesis.cancel();
  }
}
