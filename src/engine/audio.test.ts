import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { pronounceWord, stopAll } from "./audio";
import type { VocabWord } from "../types";

describe("audio", () => {
  let mockSpeak: ReturnType<typeof vi.fn>;
  let mockCancel: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSpeak = vi.fn();
    mockCancel = vi.fn();
    // Mock speechSynthesis on globalThis
    Object.defineProperty(globalThis, "speechSynthesis", {
      value: {
        speak: mockSpeak,
        cancel: mockCancel,
      },
      writable: true,
      configurable: true,
    });
    // Mock SpeechSynthesisUtterance
    Object.defineProperty(globalThis, "SpeechSynthesisUtterance", {
      value: class {
        text: string;
        lang = "";
        rate = 1;
        constructor(text: string) {
          this.text = text;
        }
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("pronounceWord speaks immediately when idle", () => {
    const word: VocabWord = {
      id: "test",
      script: "ТЕСТ",
      translation: "test",
      matchesItemId: null,
    };

    pronounceWord(word);
    expect(mockSpeak).toHaveBeenCalledTimes(1);
    const utterance = mockSpeak.mock.calls[0]![0];
    expect(utterance.text).toBe("ТЕСТ");
    expect(utterance.lang).toBe("ru-RU");
    expect(utterance.rate).toBe(0.8);
  });

  it("stopAll cancels speech synthesis", () => {
    stopAll();
    expect(mockCancel).toHaveBeenCalled();
  });
});
