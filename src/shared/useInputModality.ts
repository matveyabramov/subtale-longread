import { useEffect } from 'react';

export function useInputModality() {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.dataset.inputModality;
    root.dataset.inputModality = 'keyboard';
    const pointer = () => { root.dataset.inputModality = 'pointer'; };
    const keyboard = (event: KeyboardEvent) => {
      if (!['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) root.dataset.inputModality = 'keyboard';
    };
    document.addEventListener('pointerdown', pointer, true);
    document.addEventListener('touchstart', pointer, { capture: true, passive: true });
    document.addEventListener('wheel', pointer, { capture: true, passive: true });
    document.addEventListener('keydown', keyboard, true);
    return () => {
      document.removeEventListener('pointerdown', pointer, true);
      document.removeEventListener('touchstart', pointer, true);
      document.removeEventListener('wheel', pointer, true);
      document.removeEventListener('keydown', keyboard, true);
      if (previous === undefined) delete root.dataset.inputModality;
      else root.dataset.inputModality = previous;
    };
  }, []);
}
