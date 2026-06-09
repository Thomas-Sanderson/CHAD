/** True when the game is loaded inside an iframe (embedded on another site). */
export const isEmbedded: boolean = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true; // cross-origin iframe blocks access → definitely embedded
  }
})();
