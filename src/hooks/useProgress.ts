'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'osrs-league-progress';
const STAGE_KEY = 'osrs-league-stage';

export function useProgress() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {
      // ignore parse errors
    }
    setLoaded(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setProgress((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setProgress({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return { progress, toggle, reset, loaded };
}

export function useCurrentStage(max: number) {
  const [stage, setStageState] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STAGE_KEY);
      if (raw !== null) {
        const n = parseInt(raw, 10);
        if (!isNaN(n) && n >= 0 && n <= max) setStageState(n);
      }
    } catch {}
    setLoaded(true);
  }, [max]);

  const setStage = useCallback(
    (n: number) => {
      const clamped = Math.max(0, Math.min(max, n));
      setStageState(clamped);
      try {
        localStorage.setItem(STAGE_KEY, String(clamped));
      } catch {}
    },
    [max],
  );

  return { stage, setStage, loaded };
}
