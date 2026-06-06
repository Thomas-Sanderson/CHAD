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

  it("pronounceWord queues speech via setTimeout", async () => {
    vi.useFakeTimers();
    const word: VocabWord = {
      id: "test",
      cyrillic: "ТЕСТ",
      translation: "test",
      matchesItemId: null,
    };

    pronounceWord(word);
    expect(mockCancel).toHaveBeenCalled();
    expect(mockSpeak).not.toHaveBeenCalled(); // not yet — queued

    vi.advanceTimersByTime(60);
    expect(mockSpeak).toHaveBeenCalledTimes(1);
    const utterance = mockSpeak.mock.calls[0]![0];
    expect(utterance.text).toBe("ТЕСТ");
    expect(utterance.lang).toBe("ru-RU");
    expect(utterance.rate).toBe(0.8);
    vi.useRealTimers();
  });

  it("stopAll cancels speech synthesis", () => {
    stopAll();
    expect(mockCancel).toHaveBeenCalled();
  });

  it("rapid calls only speak the last word", () => {
    vi.useFakeTimers();
    const w1: VocabWord = { id: "w1", cyrillic: "СЛОВО", translation: "word", matchesItemId: null };
    const w2: VocabWord = { id: "w2", cyrillic: "ТЕСТ", translation: "test", matchesItemId: null };

    pronounceWord(w1);
    pronounceWord(w2); // should replace w1

    vi.advanceTimersByTime(60);
    expect(mockSpeak).toHaveBeenCalledTimes(1);
    expect(mockSpeak.mock.calls[0]![0].text).toBe("ТЕСТ");
    vi.useRealTimers();
  });
});
