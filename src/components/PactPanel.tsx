'use client';

import { Step } from '@/data/guideData';

interface Props {
  pactSteps: Step[];
  progress: Record<string, boolean>;
  onToggle: (id: string) => void;
  totalPactsCompleted: number;
  totalPacts: number;
}

export default function PactPanel({ pactSteps, progress, onToggle, totalPactsCompleted, totalPacts }: Props) {
  const stageCompleted = pactSteps.filter((s) => progress[s.id]).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-osrs-pact-border">
        <h3 className="text-xs font-bold uppercase tracking-widest text-osrs-pact-blue">
          Pact Tasks
        </h3>
        <span className="text-[10px] font-mono text-osrs-pact-blue/70 bg-osrs-pact-bg border border-osrs-pact-border rounded px-1.5 py-0.5">
          {stageCompleted}/{pactSteps.length}
        </span>
      </div>

      {/* Pact list */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
        {pactSteps.length === 0 ? (
          <p className="text-osrs-muted text-xs italic text-center mt-8">No pact tasks this stage</p>
        ) : (
          pactSteps.map((step) => {
            const done = !!progress[step.id];
            return (
              <button
                key={step.id}
                onClick={() => onToggle(step.id)}
                className={`
                  w-full text-left rounded border px-3 py-2.5 transition-all duration-200
                  ${done
                    ? 'border-osrs-pact-border/30 bg-osrs-pact-bg/30 opacity-50'
                    : 'border-osrs-pact-border bg-osrs-pact-bg hover:bg-osrs-pact-bg/80 hover:border-osrs-pact-blue/40'
                  }
                `}
              >
                <div className="flex items-start gap-2">
                  {/* Checkbox indicator */}
                  <div
                    className={`
                      mt-0.5 flex-shrink-0 w-3.5 h-3.5 rounded border-2 border-osrs-pact-blue
                      flex items-center justify-center transition-colors
                      ${done ? 'bg-osrs-pact-blue' : 'bg-transparent'}
                    `}
                  >
                    {done && (
                      <svg className="w-2 h-2 text-osrs-bg" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className={`text-xs leading-snug font-medium ${done ? 'line-through text-osrs-muted' : 'text-blue-200'}`}>
                      {step.text}
                    </p>
                    <p className="text-[10px] text-osrs-pact-blue/60 font-mono mt-0.5">
                      {step.points} pts{step.isReset ? ' + Reset' : ''}
                    </p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Global progress footer */}
      <div className="mt-3 pt-2 border-t border-osrs-border">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-osrs-muted uppercase tracking-wide">Total Progress</span>
          <span className="text-[10px] font-mono text-osrs-gold">{totalPactsCompleted}/{totalPacts}</span>
        </div>
        <div className="w-full h-1.5 bg-osrs-border rounded-full overflow-hidden">
          <div
            className="h-full bg-osrs-pact-blue rounded-full transition-all duration-500"
            style={{ width: `${(totalPactsCompleted / totalPacts) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
