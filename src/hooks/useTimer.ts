import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerMode, TimerStatus, TimerSettings } from '../types';
import { DEFAULT_SETTINGS } from '../utils/constants';

interface UseTimerReturn {
  mode: TimerMode;
  status: TimerStatus;
  timeLeft: number;
  currentCycle: number;
  totalCycles: number;
  settings: TimerSettings;
  start: () => void;
  pause: () => void;
  reset: () => void;
  updateSettings: (newSettings: Partial<TimerSettings>) => void;
  onWorkComplete?: () => void;
  onBreakComplete?: () => void;
  onCycleComplete?: () => void;
}

export function useTimer(
  initialSettings: TimerSettings = DEFAULT_SETTINGS,
  onWorkComplete?: () => void,
  onBreakComplete?: () => void,
  onCycleComplete?: () => void
): UseTimerReturn {
  const [mode, setMode] = useState<TimerMode>('work');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(initialSettings.workDuration * 60);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [settings, setSettings] = useState(initialSettings);

  const intervalRef = useRef<number | null>(null);
  const onWorkCompleteRef = useRef(onWorkComplete);
  const onBreakCompleteRef = useRef(onBreakComplete);
  const onCycleCompleteRef = useRef(onCycleComplete);

  // Update refs when callbacks change
  useEffect(() => {
    onWorkCompleteRef.current = onWorkComplete;
    onBreakCompleteRef.current = onBreakComplete;
    onCycleCompleteRef.current = onCycleComplete;
  }, [onWorkComplete, onBreakComplete, onCycleComplete]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const start = useCallback(() => {
    setStatus('running');
  }, []);

  const pause = useCallback(() => {
    setStatus('paused');
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setStatus('idle');
    setMode('work');
    setCurrentCycle(1);
    setTimeLeft(settings.workDuration * 60);
  }, [settings.workDuration]);

  const updateSettings = useCallback((newSettings: Partial<TimerSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      // If timer is idle and we're in work mode, update timeLeft
      if (status === 'idle' && mode === 'work') {
        setTimeLeft(updated.workDuration * 60);
      } else if (status === 'idle' && mode === 'break') {
        setTimeLeft(updated.breakDuration * 60);
      }
      return updated;
    });
  }, [status, mode]);

  // Main timer logic
  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Timer completed
            setStatus('completed');

            if (mode === 'work') {
              // Work session complete
              onWorkCompleteRef.current?.();

              // Check if we've completed all cycles
              if (currentCycle >= settings.cycles) {
                // All cycles complete
                onCycleCompleteRef.current?.();
                // Reset to beginning
                setCurrentCycle(1);
                setMode('work');
                return settings.workDuration * 60;
              } else {
                // Move to break
                setMode('break');
                setCurrentCycle(prev => prev + 1);
                setTimeout(() => {
                  setStatus('idle');
                  setTimeLeft(settings.breakDuration * 60);
                }, 2000); // Show completion for 2 seconds
                return 0;
              }
            } else {
              // Break complete
              onBreakCompleteRef.current?.();
              setMode('work');
              setTimeout(() => {
                setStatus('idle');
                setTimeLeft(settings.workDuration * 60);
              }, 2000); // Show completion for 2 seconds
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, mode, currentCycle, settings]);

  return {
    mode,
    status,
    timeLeft,
    currentCycle,
    totalCycles: settings.cycles,
    settings,
    start,
    pause,
    reset,
    updateSettings,
  };
}
