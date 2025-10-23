import { useRef, useCallback, useEffect } from 'react';
import { Howl } from 'howler';

interface UseSoundReturn {
  play: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
}

export function useSound(enabled: boolean = true, initialVolume: number = 0.7): UseSoundReturn {
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Create a simple beep sound using Howler with data URI
    // This is a notification beep
    soundRef.current = new Howl({
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGm98OScTgwOUKzn77dhGwU7k9r0yoMsBAUpgczx3I4+CRZftuvsp1QUCkef4PK9bSIFK4DN8tmIOQcZaLvt5ZxPDBBQrOjxt2IcBTmT2vTJhC0EBCiAy/LajT8IFV+u7O2mUxMKSJ/g8r5uIwUrgc7y2Ik2Bxhou+3lnFAMEFCt6PK4YhwFOpPa9MmDLgQEJ4DN8tqNPwgVXq7s7qZTFApHn+Dyvmw='],
      volume: initialVolume,
      html5: true,
    });

    return () => {
      soundRef.current?.unload();
    };
  }, [initialVolume]);

  const play = useCallback(() => {
    if (enabled && soundRef.current) {
      soundRef.current.play();
    }
  }, [enabled]);

  const stop = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (soundRef.current) {
      soundRef.current.volume(Math.max(0, Math.min(1, volume)));
    }
  }, []);

  return { play, stop, setVolume };
}
