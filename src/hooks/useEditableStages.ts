'use client';

import { useCallback, useEffect, useState } from 'react';
import { stages as baseStages, type Stage, type Step } from '@/data/guideData';

const EDITS_KEY = 'osrs-league-edits';

export interface StageMeta {
  title?: string;
  subtitle?: string;
  intro?: string;
  customBuilds?: { name: string; url: string }[];
}

interface Overrides {
  steps: Record<number, Step[]>;
  meta: Record<number, StageMeta>;
}

function loadOverrides(): Overrides {
  try {
    const raw = localStorage.getItem(EDITS_KEY);
    if (!raw) return { steps: {}, meta: {} };
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    // New format has a 'steps' object key; old format had numeric keys mapping to Step arrays
    if ('steps' in parsed && typeof parsed.steps === 'object' && !Array.isArray(parsed.steps)) {
      return {
        steps: (parsed.steps ?? {}) as Record<number, Step[]>,
        meta: (parsed.meta ?? {}) as Record<number, StageMeta>,
      };
    }
    // Migrate old format: root was Record<number, Step[]>
    return { steps: parsed as unknown as Record<number, Step[]>, meta: {} };
  } catch {
    return { steps: {}, meta: {} };
  }
}

function saveOverrides(overrides: Overrides): void {
  try {
    localStorage.setItem(EDITS_KEY, JSON.stringify(overrides));
  } catch {
    // ignore
  }
}

function buildStages(overrides: Overrides): Stage[] {
  return baseStages.map((stage) => {
    let result: Stage = stage;
    if (overrides.steps[stage.id] !== undefined) {
      result = { ...result, steps: overrides.steps[stage.id] };
    }
    const meta = overrides.meta[stage.id];
    if (meta) {
      const { customBuilds, ...restMeta } = meta;
      result = { ...result, ...restMeta };
      if (customBuilds !== undefined) {
        result = { ...result, customBuilds: [...(result.customBuilds ?? []), ...customBuilds] };
      }
    }
    return result;
  });
}

function baseStepsFor(stageId: number): Step[] {
  return baseStages.find((s) => s.id === stageId)?.steps ?? [];
}

export function useEditableStages() {
  const [overrides, setOverrides] = useState<Overrides>({ steps: {}, meta: {} });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setOverrides(loadOverrides());
    setLoaded(true);
  }, []);

  // Core step mutator
  const mutateSteps = useCallback((stageId: number, updater: (prev: Step[]) => Step[]) => {
    setOverrides((prev) => {
      const current = prev.steps[stageId] ?? baseStepsFor(stageId);
      const next: Overrides = {
        ...prev,
        steps: { ...prev.steps, [stageId]: updater(current) },
      };
      saveOverrides(next);
      return next;
    });
  }, []);

  const addStep = useCallback(
    (stageId: number, step: Step) => {
      mutateSteps(stageId, (steps) => [...steps, step]);
    },
    [mutateSteps],
  );

  const deleteStep = useCallback(
    (stageId: number, stepId: string) => {
      mutateSteps(stageId, (steps) => steps.filter((s) => s.id !== stepId));
    },
    [mutateSteps],
  );

  const editStep = useCallback(
    (stageId: number, stepId: string, newText: string) => {
      mutateSteps(stageId, (steps) =>
        steps.map((s) => (s.id === stepId ? { ...s, text: newText } : s)),
      );
    },
    [mutateSteps],
  );

  const reorderSteps = useCallback(
    (stageId: number, fromIndex: number, toIndex: number) => {
      if (fromIndex === toIndex) return;
      mutateSteps(stageId, (steps) => {
        const next = [...steps];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        return next;
      });
    },
    [mutateSteps],
  );

  const addBuild = useCallback((stageId: number, build: { name: string; url: string }) => {
    setOverrides((prev) => {
      const existing = prev.meta[stageId]?.customBuilds ?? [];
      const next: Overrides = {
        ...prev,
        meta: {
          ...prev.meta,
          [stageId]: { ...prev.meta[stageId], customBuilds: [...existing, build] },
        },
      };
      saveOverrides(next);
      return next;
    });
  }, []);

  const updateBuild = useCallback((stageId: number, oldUrl: string, build: { name: string; url: string }) => {
    setOverrides((prev) => {
      const existing = prev.meta[stageId]?.customBuilds ?? [];
      const updated = existing.map((b) => (b.url === oldUrl ? build : b));
      const next: Overrides = {
        ...prev,
        meta: {
          ...prev.meta,
          [stageId]: { ...prev.meta[stageId], customBuilds: updated },
        },
      };
      saveOverrides(next);
      return next;
    });
  }, []);

  const editStageMeta = useCallback((stageId: number, meta: StageMeta) => {
    setOverrides((prev) => {
      const next: Overrides = {
        ...prev,
        meta: {
          ...prev.meta,
          [stageId]: { ...prev.meta[stageId], ...meta },
        },
      };
      saveOverrides(next);
      return next;
    });
  }, []);

  const resetEdits = useCallback(() => {
    const empty: Overrides = { steps: {}, meta: {} };
    setOverrides(empty);
    try {
      localStorage.removeItem(EDITS_KEY);
    } catch {
      // ignore
    }
  }, []);

  const hasEdits =
    Object.keys(overrides.steps).length > 0 || Object.keys(overrides.meta).length > 0;

  return {
    stages: buildStages(overrides),
    loaded,
    addStep,
    deleteStep,
    editStep,
    reorderSteps,
    addBuild,
    updateBuild,
    editStageMeta,
    resetEdits,
    hasEdits,
  };
}
