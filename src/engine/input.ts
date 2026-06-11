import type { InputState } from "../types";
import { isTouchDevice } from "./touch";

export function createInputState(): InputState {
  return {
    left: false, right: false, jump: false, jumpHeld: false, interact: false,
    shout: false, inventory: false,
  };
}

export function setupKeyboardInput(state: InputState, pausedRef?: { current: boolean }): () => void {
  const onKeyDown = (e: KeyboardEvent) => {
    if (pausedRef?.current) return;
    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        state.left = true;
        e.preventDefault();
        break;
      case "ArrowRight":
      case "KeyD":
        state.right = true;
        e.preventDefault();
        break;
      case "ArrowUp":
      case "KeyW":
      case "Space":
        state.jump = true;
        state.jumpHeld = true;
        e.preventDefault();
        break;
      case "KeyE":
        state.interact = true;
        e.preventDefault();
        break;
      case "KeyP":
        state.shout = true;
        e.preventDefault();
        break;
      case "KeyI":
        state.inventory = true;
        e.preventDefault();
        break;
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (pausedRef?.current) return;
    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        state.left = false;
        break;
      case "ArrowRight":
      case "KeyD":
        state.right = false;
        break;
      case "ArrowUp":
      case "KeyW":
      case "Space":
        state.jump = false;
        state.jumpHeld = false;
        break;
      case "KeyE":
        state.interact = false;
        break;
      case "KeyP":
        state.shout = false;
        break;
      case "KeyI":
        state.inventory = false;
        break;
    }
  };

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  return () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  };
}

export function setupTouchInput(
  canvas: HTMLCanvasElement,
  _state: InputState
): () => void {
  // On touch devices, the TouchControls React component handles all input.
  // We just prevent default to stop scrolling/zooming on the canvas.
  if (isTouchDevice) {
    const prevent = (e: TouchEvent) => e.preventDefault();
    canvas.addEventListener("touchstart", prevent, { passive: false });
    canvas.addEventListener("touchmove", prevent, { passive: false });
    return () => {
      canvas.removeEventListener("touchstart", prevent);
      canvas.removeEventListener("touchmove", prevent);
    };
  }

  // Non-touch fallback (shouldn't normally fire on desktop but keeps parity)
  return () => {};
}
