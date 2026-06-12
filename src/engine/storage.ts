/**
 * Safe localStorage wrappers.
 *
 * localStorage can throw in Safari private mode, sandboxed iframes with
 * blocked third-party storage, or when the quota is exceeded. The game must
 * never crash because persistence is unavailable — progress simply isn't
 * saved for that session.
 */

export function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable (private mode, blocked iframe, quota) — skip persist.
  }
}
