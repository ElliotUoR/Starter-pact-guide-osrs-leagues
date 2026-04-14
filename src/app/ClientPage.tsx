'use client';

import { useCallback, useEffect, useState } from 'react';
import { stages as baseStages } from '@/data/guideData';
import { useProgress, useCurrentStage } from '@/hooks/useProgress';
import { useEditableStages } from '@/hooks/useEditableStages';
import StageView from '@/components/StageView';

const TOTAL_STAGES = baseStages.length;

export default function ClientPage() {
  const { progress, toggle, reset, loaded: progressLoaded } = useProgress();
  const { stage: stageIndex, setStage, loaded: stageLoaded } = useCurrentStage(TOTAL_STAGES - 1);
  const { stages, loaded: stagesLoaded, addStep, deleteStep, editStep, reorderSteps, addBuild, updateBuild, editStageMeta } = useEditableStages();
  const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = useCallback(() => setIsEditMode((prev) => !prev), []);

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
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft') navigate('prev');
    };
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  const totalPactsCompleted = stages
    .flatMap((s) => s.steps.filter((st) => st.type === 'pact'))
    .filter((st) => progress[st.id]).length;

  if (!progressLoaded || !stageLoaded || !stagesLoaded) {
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
      isEditMode={isEditMode}
      onToggleEditMode={toggleEditMode}
      onAddStep={addStep}
      onDeleteStep={deleteStep}
      onEditStep={editStep}
      onReorderSteps={reorderSteps}
      onEditStageMeta={editStageMeta}
      onAddBuild={addBuild}
      onUpdateBuild={updateBuild}
    />
  );
}
