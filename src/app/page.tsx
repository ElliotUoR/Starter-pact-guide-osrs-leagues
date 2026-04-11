'use client';

import { useCallback, useEffect, useState } from 'react';
import { stages } from '@/data/guideData';
import { useProgress, useCurrentStage } from '@/hooks/useProgress';
import StageView from '@/components/StageView';

const TOTAL_STAGES = stages.length;

export default function GuidePage() {
  const { progress, toggle, reset, loaded: progressLoaded } = useProgress();
  const { stage: stageIndex, setStage, loaded: stageLoaded } = useCurrentStage(TOTAL_STAGES - 1);
  const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null);

  const navigate = useCallback(
    (dir: 'prev' | 'next') => {
      const next = dir === 'next' ? stageIndex + 1 : stageIndex - 1;
      if (next < 0 || next >= TOTAL_STAGES) return;
      setAnimDir(dir === 'next' ? 'right' : 'left');
      setStage(next);
    },
    [stageIndex, setStage],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft') navigate('prev');
    };
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  // Count total pacts completed across all stages
  const totalPactsCompleted = stages
    .flatMap((s) => s.steps.filter((st) => st.type === 'pact'))
    .filter((st) => progress[st.id]).length;

  // Wait for localStorage to hydrate before rendering to avoid flash
  if (!progressLoaded || !stageLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-osrs-bg">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-8 h-8 text-osrs-gold animate-pulse" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
          </svg>
          <p className="text-osrs-muted text-sm">Loading guide…</p>
        </div>
      </div>
    );
  }

  const currentStage = stages[stageIndex];

  return (
    <StageView
      key={stageIndex}
      stage={currentStage}
      stageIndex={stageIndex}
      totalStages={TOTAL_STAGES}
      progress={progress}
      onToggle={toggle}
      onPrev={() => navigate('prev')}
      onNext={() => navigate('next')}
      onReset={handleReset}
      animDir={animDir}
      totalPactsCompleted={totalPactsCompleted}
    />
  );
}
