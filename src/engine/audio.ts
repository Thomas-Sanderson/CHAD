import type { VocabWord } from "../types";

export function pronounceWord(word: VocabWord): void {
  stopAll();

  // Try audioNormal → audioSlow → Web Speech API
  if (word.audioNormal || word.audioSlow) {
    const src = word.audioNormal ?? word.audioSlow!;
    const audio = new Audio(src);
    audio.play().catch(() => {
      // Audio file failed, fall back to speech synthesis
      speakCyrillic(word.cyrillic);
    });
    return;
  }

  speakCyrillic(word.cyrillic);
}

function speakCyrillic(text: string): void {
  if (typeof speechSynthesis === "undefined") return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ru-RU";
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
}

export function speakText(text: string): void {
  stopAll();
  speakCyrillic(text);
}

export function stopAll(): void {
  if (typeof speechSynthesis !== "undefined") {
    speechSynthesis.cancel();
  }
}
