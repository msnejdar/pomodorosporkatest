import { useEffect } from 'react';

interface KeyboardHandlers {
  onSpace?: () => void;
  onR?: () => void;
  onS?: () => void;
  onEscape?: () => void;
}

export function useKeyboard(handlers: KeyboardHandlers) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case ' ':
          event.preventDefault();
          handlers.onSpace?.();
          break;
        case 'r':
          event.preventDefault();
          handlers.onR?.();
          break;
        case 's':
          event.preventDefault();
          handlers.onS?.();
          break;
        case 'escape':
          event.preventDefault();
          handlers.onEscape?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}
