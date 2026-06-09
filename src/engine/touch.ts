/** True on devices with touch support (phones, tablets). */
export const isTouchDevice: boolean = (() => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
})();
