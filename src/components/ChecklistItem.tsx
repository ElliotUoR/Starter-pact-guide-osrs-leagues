'use client';

import { useState } from 'react';
import { Step, StepLink } from '@/data/guideData';
import { relicImg, pactImg } from '@/utils/assetPath';
import HunterRumoursModal from './HunterRumoursModal';
import Hunter46Modal from './Hunter46Modal';
import type { ReactNode } from 'react';

const MODAL_COMPONENTS: Record<string, React.ComponentType<{ onClose: () => void }>> = {
  'hunter-rumours': HunterRumoursModal,
  'hunter-46': Hunter46Modal,
};

function renderTextWithLinks(text: string, links?: StepLink[]): ReactNode {
  if (!links || links.length === 0) return text;

  // Build sorted list of [startIndex, link] pairs
  const matches: { index: number; link: StepLink }[] = [];
  for (const link of links) {
    const idx = text.indexOf(link.text);
    if (idx !== -1) matches.push({ index: idx, link });
  }
  matches.sort((a, b) => a.index - b.index);

  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const { index, link } of matches) {
    if (index > cursor) parts.push(text.slice(cursor, index));
    parts.push(
      <a
        key={link.url}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-osrs-gold hover:text-osrs-gold/70 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {link.text}
      </a>,
    );
    cursor = index + link.text.length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}

interface Props {
  readonly step: Step;
  readonly checked: boolean;
  readonly onToggle: (id: string) => void;
  readonly compact?: boolean;
}

const typeStyles = {
  pact: {
    border: 'border-osrs-pact-border bg-osrs-pact-bg hover:border-osrs-pact-blue/60',
    badge: 'bg-osrs-pact-blue/20 text-osrs-pact-blue border border-osrs-pact-blue/40',
    checkBorder: 'border-osrs-pact-blue',
    checkFill: 'bg-osrs-pact-blue',
    text: 'text-blue-200',
  },
  step: {
    border: 'border-osrs-border bg-osrs-card hover:border-osrs-gold/40',
    badge: '',
    checkBorder: 'border-osrs-gold',
    checkFill: 'bg-osrs-gold',
    text: 'text-osrs-parchment',
  },
  info: {
    border: 'border-osrs-border/40 bg-transparent',
    badge: '',
    checkBorder: '',
    checkFill: '',
    text: 'text-osrs-muted',
  },
  warning: {
    border: 'border-yellow-700/50 bg-osrs-warning-bg hover:border-yellow-600/60',
    badge: 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/40',
    checkBorder: 'border-yellow-600',
    checkFill: 'bg-yellow-600',
    text: 'text-yellow-300',
  },
  relic: {
    border: 'border-osrs-gold/50 bg-osrs-gold/10 hover:border-osrs-gold/70',
    badge: '',
    checkBorder: 'border-osrs-gold',
    checkFill: 'bg-osrs-gold',
    text: 'text-red-400 font-bold',
  },
  keystone: {
    border: 'border-red-800/70 bg-red-950/80 hover:border-red-700/80',
    badge: 'bg-red-900/50 text-red-300 border border-red-700/50',
    checkBorder: 'border-red-500',
    checkFill: 'bg-red-700',
    text: 'text-red-200 font-semibold',
  },
  assignment: {
    border: 'border-orange-700/50 bg-orange-950/50 hover:border-orange-600/60',
    badge: 'bg-orange-900/40 text-orange-300 border border-orange-700/40',
    checkBorder: 'border-orange-500',
    checkFill: 'bg-orange-700',
    text: 'text-orange-200 font-semibold',
  },
};

const BADGE_LABELS: Partial<Record<string, string>> = {
  pact: 'Pact',
  warning: 'Important',
  keystone: 'Keystone',
  // assignment badge is dynamic (Major/Minor) — handled separately
};

const REGION_STYLES: Record<string, string> = {
  Global:    'bg-slate-800/60 text-slate-300 border-slate-600/40',
  Varlamore: 'bg-amber-900/40 text-amber-300 border-amber-600/40',
  Karamja:   'bg-orange-900/40 text-orange-300 border-orange-600/40',
  Kandarin:  'bg-cyan-900/40 text-cyan-300 border-cyan-600/40',
  Kourend:   'bg-purple-900/40 text-purple-300 border-purple-600/40',
  Tirannwn:  'bg-emerald-900/40 text-emerald-300 border-emerald-600/40',
};

function StepBadge({ type, badge, region, assignmentRank }: { readonly type: string; readonly badge: string; readonly region?: string; readonly assignmentRank?: string }) {
  const label = type === 'assignment' ? assignmentRank : BADGE_LABELS[type];
  return (
    <>
      {label && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${badge}`}>
          {label}
        </span>
      )}
      {region && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide border ${REGION_STYLES[region] ?? ''}`}>
          {region}
        </span>
      )}
    </>
  );
}

function StepImages({ relics, pactImage }: { readonly relics?: string[]; readonly pactImage?: string }) {
  return (
    <>
      {pactImage && (
        <img
          src={pactImg(pactImage)}
          alt={pactImage.replaceAll('_', ' ').replaceAll('.png', '')}
          className="w-9 h-9 object-contain ml-2"
          title={pactImage.replaceAll('_', ' ').replaceAll('.png', '')}
        />
      )}
      {relics && relics.length > 0 && (
        <span className="flex items-center gap-1.5 ml-4">
          {relics.map((filename) => (
            <img
              key={filename}
              src={relicImg(filename)}
              alt={filename.replaceAll('_', ' ').replaceAll('.png', '')}
              className="w-7 h-7 object-contain"
              title={filename.replaceAll('_', ' ').replaceAll('.png', '')}
            />
          ))}
        </span>
      )}
    </>
  );
}

function CheckboxIndicator({ checked, checkBorder, checkFill, compact }: {
  readonly checked: boolean;
  readonly checkBorder: string;
  readonly checkFill: string;
  readonly compact: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`
        mt-0.5 flex-shrink-0 rounded border-2 transition-colors duration-150
        flex items-center justify-center
        ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}
        ${checked ? `${checkFill} ${checkBorder}` : `bg-transparent ${checkBorder}`}
      `}
    >
      {checked && (
        <svg className="w-2.5 h-2.5 text-osrs-bg" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}

function PactPoints({ points, isReset }: { readonly points?: number; readonly isReset?: boolean }) {
  if (!points) return null;
  return (
    <div className="mt-1">
      <span className="text-[10px] text-osrs-pact-blue/70 font-mono">
        {points} pts{isReset ? ' + Reset' : ''}
      </span>
    </div>
  );
}

function ModalItem({ step, compact }: { readonly step: Step; readonly compact: boolean }) {
  const [open, setOpen] = useState(false);
  const ModalComponent = step.modal ? MODAL_COMPONENTS[step.modal] : undefined;
  const py = compact ? 'py-1.5' : 'py-2';
  const textSize = compact ? 'text-xs' : '';
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`w-full text-left flex items-center gap-3 rounded-md border px-3 ${py} border-osrs-gold/40 bg-osrs-gold/8 hover:border-osrs-gold/70 hover:bg-osrs-gold/15 transition-all duration-200 cursor-pointer group`}
      >
        <svg className="flex-shrink-0 w-3.5 h-3.5 text-osrs-gold/70 group-hover:text-osrs-gold transition-colors" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 110 1.5A.75.75 0 018 4zm1 8H7v-5h2v5z" />
        </svg>
        <span className={`flex-1 text-sm text-osrs-gold/80 group-hover:text-osrs-gold transition-colors font-medium ${textSize}`}>
          {step.text}
        </span>
        <svg className="flex-shrink-0 w-3 h-3 text-osrs-gold/50 group-hover:text-osrs-gold/80 transition-colors" viewBox="0 0 12 12" fill="none">
          <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && ModalComponent && <ModalComponent onClose={() => setOpen(false)} />}
    </>
  );
}

export default function ChecklistItem({ step, checked, onToggle, compact = false }: Props) {
  const styles = typeStyles[step.type];
  const isCheckable = step.type !== 'info';
  const isKeystone = step.type === 'keystone';
  const isAssignment = step.type === 'assignment';
  const py = compact ? 'py-1.5' : 'py-2.5';

  if (step.modal) return <ModalItem step={step} compact={compact} />;

  const leading = isCheckable
    ? <CheckboxIndicator checked={checked} checkBorder={styles.checkBorder} checkFill={styles.checkFill} compact={compact} />
    : <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-osrs-muted/60" />;

  const textClass = `text-sm leading-snug ${styles.text} ${checked ? 'line-through decoration-1' : ''} ${compact ? 'text-xs' : ''}`;

  const content = (
    <>
      {leading}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <StepBadge type={step.type} badge={styles.badge} region={step.region} assignmentRank={step.assignmentRank} />
          <span className={textClass}>{renderTextWithLinks(step.text, step.links)}</span>
          <StepImages relics={step.relics} pactImage={isKeystone || isAssignment ? step.pactImage : undefined} />
        </div>
        <PactPoints points={step.points} isReset={step.isReset} />
      </div>
    </>
  );

  if (isCheckable) {
    const alignment = isKeystone || isAssignment ? 'items-center' : 'items-start';
    return (
      <button
        type="button"
        onClick={() => onToggle(step.id)}
        className={`w-full text-left flex ${alignment} gap-3 rounded-md border px-3 ${py} transition-all duration-200 cursor-pointer select-none ${styles.border} ${checked ? 'opacity-40' : ''}`}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={`flex items-start gap-3 rounded-md border px-3 ${py} ${styles.border}`}>
      {content}
    </div>
  );
}
