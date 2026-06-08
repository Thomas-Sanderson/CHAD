import type { InputState } from "../types";

export function createInputState(): InputState {
  return {
    left: false, right: false, jump: false, interact: false,
    shout: false, inventory: false,
  };
}

export function setupKeyboardInput(state: InputState): () => void {
  const onKeyDown = (e: KeyboardEvent) => {
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
  state: InputState
): () => void {
  let touchStartX = 0;

  const onTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (!touch) return;
    touchStartX = touch.clientX;
    const rect = canvas.getBoundingClientRect();
    const touchY = touch.clientY - rect.top;

    // Top half of canvas = jump
    if (touchY < rect.height * 0.4) {
      state.jump = true;
    }

    // Bottom-center = interact
    const touchX = touch.clientX - rect.left;
    if (touchY > rect.height * 0.7 && touchX > rect.width * 0.35 && touchX < rect.width * 0.65) {
      state.interact = true;
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (!touch) return;
    const dx = touch.clientX - touchStartX;
    state.left = dx < -20;
    state.right = dx > 20;
  };

  const onTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    state.left = false;
    state.right = false;
    state.jump = false;
    state.interact = false;
  };

  canvas.addEventListener("touchstart", onTouchStart, { passive: false });
  canvas.addEventListener("touchmove", onTouchMove, { passive: false });
  canvas.addEventListener("touchend", onTouchEnd, { passive: false });

  return () => {
    canvas.removeEventListener("touchstart", onTouchStart);
    canvas.removeEventListener("touchmove", onTouchMove);
    canvas.removeEventListener("touchend", onTouchEnd);
  };
}
