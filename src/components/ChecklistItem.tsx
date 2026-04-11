'use client';

import { Step } from '@/data/guideData';

interface Props {
  step: Step;
  checked: boolean;
  onToggle: (id: string) => void;
  compact?: boolean;
}

const typeStyles = {
  pact: {
    border: 'border-osrs-pact-border bg-osrs-pact-bg',
    badge: 'bg-osrs-pact-blue/20 text-osrs-pact-blue border border-osrs-pact-blue/40',
    checkbox: 'border-osrs-pact-blue checked:bg-osrs-pact-blue',
    text: 'text-blue-200',
  },
  step: {
    border: 'border-osrs-border bg-osrs-card',
    badge: '',
    checkbox: 'border-osrs-gold checked:bg-osrs-gold',
    text: 'text-osrs-parchment',
  },
  info: {
    border: 'border-osrs-border/40 bg-transparent',
    badge: '',
    checkbox: 'border-osrs-muted checked:bg-osrs-muted',
    text: 'text-osrs-muted',
  },
  warning: {
    border: 'border-yellow-700/50 bg-osrs-warning-bg',
    badge: 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/40',
    checkbox: 'border-yellow-600 checked:bg-yellow-600',
    text: 'text-yellow-300',
  },
};

export default function ChecklistItem({ step, checked, onToggle, compact = false }: Props) {
  const styles = typeStyles[step.type];
  const isCheckable = step.type !== 'info';

  return (
    <div
      className={`
        flex items-start gap-3 rounded-md border px-3 py-2 transition-all duration-200
        ${styles.border}
        ${checked ? 'opacity-40' : ''}
        ${compact ? 'py-1.5' : 'py-2.5'}
      `}
    >
      {/* Checkbox */}
      {isCheckable ? (
        <button
          onClick={() => onToggle(step.id)}
          className={`
            mt-0.5 flex-shrink-0 w-4 h-4 rounded border-2 transition-colors duration-150
            flex items-center justify-center
            ${styles.checkbox}
            ${checked ? 'bg-opacity-100' : 'bg-transparent'}
            ${compact ? 'w-3.5 h-3.5' : ''}
          `}
          aria-label={checked ? 'Mark incomplete' : 'Mark complete'}
        >
          {checked && (
            <svg className="w-2.5 h-2.5 text-osrs-bg" viewBox="0 0 10 10" fill="currentColor">
              <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          )}
        </button>
      ) : (
        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-osrs-muted/60" />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {/* Type badge */}
          {step.type === 'pact' && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${styles.badge}`}>
              Pact
            </span>
          )}
          {step.type === 'warning' && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${styles.badge}`}>
              Important
            </span>
          )}

          {/* Text */}
          <span
            className={`text-sm leading-snug ${styles.text} ${checked ? 'line-through decoration-1' : ''} ${compact ? 'text-xs' : ''}`}
          >
            {step.text}
          </span>
        </div>

        {/* Points badge for pact tasks */}
        {step.type === 'pact' && step.points && (
          <div className="mt-1">
            <span className="text-[10px] text-osrs-pact-blue/70 font-mono">
              {step.points} pts{step.isReset ? ' + Reset' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
