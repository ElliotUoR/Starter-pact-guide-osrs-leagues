'use client';

import { Stage, TOTAL_PACTS, stages } from '@/data/guideData';
import ChecklistItem from './ChecklistItem';
import PactPanel from './PactPanel';
import GearPanel from './GearPanel';
import FarmingTable from './FarmingTable';

interface Props {
  readonly stage: Stage;
  readonly stageIndex: number;
  readonly totalStages: number;
  readonly progress: Record<string, boolean>;
  readonly onToggle: (id: string) => void;
  readonly onPrev: () => void;
  readonly onNext: () => void;
  readonly onReset: () => void;
  readonly animDir: 'left' | 'right' | null;
  readonly totalPactsCompleted: number;
}

export default function StageView({
  stage,
  stageIndex,
  totalStages,
  progress,
  onToggle,
  onPrev,
  onNext,
  onReset,
  animDir,
  totalPactsCompleted,
}: Props) {
  const pactSteps = stage.steps.filter((s) => s.type === 'pact');
  const isOverview = stage.id === 0;

  let animClass = '';
  if (animDir === 'right') animClass = 'animate-slide-in-right';
  else if (animDir === 'left') animClass = 'animate-slide-in-left';

  return (
    <div className={`flex flex-col h-screen bg-osrs-bg text-osrs-parchment ${animClass}`}>
      {/* ── Top header bar ─────────────────────────────────────────────────── */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-osrs-border bg-osrs-panel">
        {/* Logo / title */}
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-osrs-gold" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
          </svg>
          <div>
            <p className="text-[10px] text-osrs-muted uppercase tracking-widest leading-none">OSRS Leagues 6</p>
            <p className="text-sm font-bold text-osrs-gold leading-tight">Demonic Pacts Guide</p>
          </div>
        </div>

        {/* Stage dots */}
        <div className="flex items-center gap-1.5">
          {stages.map((s, i) => {
            let dotClass = 'w-2 h-2 bg-osrs-border';
            if (i === stageIndex) dotClass = 'w-4 h-2.5 bg-osrs-gold';
            else if (i < stageIndex) dotClass = 'w-2 h-2 bg-osrs-gold-dim';
            return (
              <div
                key={s.id}
                className={`rounded-full transition-all duration-300 ${dotClass}`}
              />
            );
          })}
        </div>

        {/* Pacts counter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-red-900/60 bg-red-950/40">
          <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z" />
          </svg>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-red-400 leading-none tabular-nums">{totalPactsCompleted}</span>
            <span className="text-[11px] text-red-700 font-mono">/ {TOTAL_PACTS}</span>
          </div>
          <span className="text-[10px] text-red-700 uppercase tracking-wide leading-none">Pacts</span>
        </div>

        {/* Reset button */}
        <button
          onClick={() => {
            if (confirm('Reset all progress? This cannot be undone.')) onReset();
          }}
          className="text-[11px] text-osrs-muted hover:text-osrs-parchment border border-osrs-border hover:border-osrs-muted rounded px-2.5 py-1 transition-colors"
        >
          Reset
        </button>
      </header>

      {/* ── Main content area ──────────────────────────────────────────────── */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left: stage content */}
        <section
          className={`
            flex flex-col overflow-hidden border-r border-osrs-border
            ${isOverview ? 'flex-1' : 'w-[54%]'}
          `}
        >
          {/* Stage title */}
          <div className="flex-shrink-0 px-6 pt-5 pb-4 border-b border-osrs-border/60">
            <div className="flex items-baseline gap-3">
              {!isOverview && (
                <span className="text-[11px] font-mono text-osrs-muted border border-osrs-border rounded px-2 py-0.5">
                  Stage {stageIndex}
                </span>
              )}
              <h1 className="text-2xl font-bold text-osrs-gold">{stage.title}</h1>
              <span className="text-sm text-osrs-muted">{stage.subtitle}</span>
            </div>
            <p className="mt-2 text-sm text-osrs-muted leading-relaxed max-w-2xl">{stage.intro}</p>

            {/* Build link */}
            {stage.buildLink && (
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={stage.buildLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-osrs-gold/80 hover:text-osrs-gold border border-osrs-gold-dim hover:border-osrs-gold rounded px-2.5 py-1 transition-colors"
                >
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 1l1.2 3.7H11l-3.1 2.3 1.2 3.7L6 8.5l-3.1 2.2 1.2-3.7L1 4.7h3.8L6 1z" />
                  </svg>
                  {stage.buildLabel ?? 'View Build'}
                </a>
                {stage.secondaryBuildLink && (
                  <a
                    href={stage.secondaryBuildLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-osrs-muted hover:text-osrs-parchment border border-osrs-border hover:border-osrs-muted rounded px-2.5 py-1 transition-colors"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M6 1l1.2 3.7H11l-3.1 2.3 1.2 3.7L6 8.5l-3.1 2.2 1.2-3.7L1 4.7h3.8L6 1z" />
                    </svg>
                    {stage.secondaryBuildLabel ?? 'Alt Build'}
                  </a>
                )}
                {stage.tertiaryBuildLink && (
                  <a
                    href={stage.tertiaryBuildLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-osrs-muted hover:text-osrs-parchment border border-osrs-border hover:border-osrs-muted rounded px-2.5 py-1 transition-colors"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M6 1l1.2 3.7H11l-3.1 2.3 1.2 3.7L6 8.5l-3.1 2.2 1.2-3.7L1 4.7h3.8L6 1z" />
                    </svg>
                    {stage.tertiaryBuildLabel ?? 'Alt Build'}
                  </a>
                )}
                {stage.dpsLinks?.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-osrs-muted hover:text-osrs-parchment border border-osrs-border hover:border-osrs-muted rounded px-2.5 py-1 transition-colors"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Steps list */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 scrollbar-thin">
            {stage.steps.length === 0 ? (
              <p className="text-osrs-muted text-sm italic">No steps for this stage.</p>
            ) : (
              stage.steps.map((step) => (
                <ChecklistItem
                  key={step.id}
                  step={step}
                  checked={!!progress[step.id]}
                  onToggle={onToggle}
                />
              ))
            )}
            {stage.id === 1 && <FarmingTable />}
          </div>
        </section>

        {/* Right panels (hidden on overview) */}
        {!isOverview && (
          <aside className="flex flex-col w-[46%] overflow-hidden">
            {/* Pact panel — top half */}
            <div className="flex-1 overflow-hidden border-b border-osrs-border bg-osrs-panel p-4">
              <PactPanel
                pactSteps={pactSteps}
                progress={progress}
                onToggle={onToggle}
                totalPactsCompleted={totalPactsCompleted}
                totalPacts={TOTAL_PACTS}
              />
            </div>

            {/* Gear panel — bottom half */}
            <div className="flex-1 overflow-hidden bg-osrs-panel p-4">
              <GearPanel gearUpgrades={stage.gearUpgrades} />
            </div>
          </aside>
        )}

        {/* Overview special layout — full-width cards */}
        {isOverview && (
          <div className="flex-shrink-0 w-72 border-l border-osrs-border bg-osrs-panel p-5 flex flex-col gap-4">
            <div>
              <p className="text-[10px] text-osrs-muted uppercase tracking-widest mb-2">Quick Stats</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-osrs-muted">Total pacts</span>
                  <span className="text-osrs-gold font-mono">{TOTAL_PACTS}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-osrs-muted">Stages</span>
                  <span className="text-osrs-gold font-mono">{totalStages - 1}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-osrs-muted">Regions</span>
                  <span className="text-osrs-parchment text-xs">Kandarin → Kourend → Priff</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-osrs-muted uppercase tracking-widest mb-2">Your Progress</p>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-osrs-muted">Pacts done</span>
                <span className="text-osrs-gold font-mono">{totalPactsCompleted}/{TOTAL_PACTS}</span>
              </div>
              <div className="w-full h-2 bg-osrs-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-osrs-gold-dim to-osrs-gold rounded-full transition-all duration-500"
                  style={{ width: `${(totalPactsCompleted / TOTAL_PACTS) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-osrs-muted mt-1">
                {Math.round((totalPactsCompleted / TOTAL_PACTS) * 100)}% complete
              </p>
            </div>

            <div className="mt-auto">
              <button
                onClick={onNext}
                className="w-full bg-osrs-gold/10 hover:bg-osrs-gold/20 border border-osrs-gold-dim hover:border-osrs-gold text-osrs-gold font-semibold text-sm py-2.5 rounded transition-all duration-200"
              >
                Start Guide →
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ── Bottom navigation ──────────────────────────────────────────────── */}
      <footer className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-t border-osrs-border bg-osrs-panel">
        {/* Prev */}
        <button
          onClick={onPrev}
          disabled={stageIndex === 0}
          className={`
            flex items-center gap-2 text-sm font-medium px-4 py-2 rounded border transition-all duration-200
            ${
              stageIndex === 0
                ? 'text-osrs-muted/30 border-osrs-border/30 cursor-not-allowed'
                : 'text-osrs-parchment border-osrs-border hover:border-osrs-gold hover:text-osrs-gold'
            }
          `}
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          Previous
        </button>

        {/* Stage indicator */}
        <div className="text-center">
          <p className="text-xs text-osrs-muted">
            {stageIndex === 0 ? 'Overview' : `Stage ${stageIndex} of ${totalStages - 1}`}
          </p>
          <p className="text-sm font-semibold text-osrs-parchment">{stage.title}</p>
        </div>

        {/* Next */}
        <button
          onClick={onNext}
          disabled={stageIndex === totalStages - 1}
          className={`
            flex items-center gap-2 text-sm font-medium px-4 py-2 rounded border transition-all duration-200
            ${
              stageIndex === totalStages - 1
                ? 'text-osrs-muted/30 border-osrs-border/30 cursor-not-allowed'
                : 'text-osrs-parchment border-osrs-border hover:border-osrs-gold hover:text-osrs-gold'
            }
          `}
        >
          Next
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </button>
      </footer>
    </div>
  );
}
