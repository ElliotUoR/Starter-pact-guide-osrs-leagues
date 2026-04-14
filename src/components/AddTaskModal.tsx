'use client';

import { useState } from 'react';
import type { Step, StepType } from '@/data/guideData';
import { pactImg } from '@/utils/assetPath';
import { usePactImages } from '@/context/PactImagesContext';

const TYPE_OPTIONS: { value: StepType; label: string }[] = [
  { value: 'step', label: 'Task' },
  { value: 'pact', label: 'Pact' },
  { value: 'info', label: 'Tooltip / Info' },
  { value: 'warning', label: 'Warning' },
  { value: 'relic', label: 'Relic' },
  { value: 'keystone', label: 'Keystone' },
  { value: 'assignment', label: 'Assignment' },
];

function formatImageName(filename: string): string {
  return filename.replace('.png', '').replaceAll('_', ' ');
}

function ImagePicker({
  value,
  onChange,
}: {
  readonly value: string;
  readonly onChange: (v: string) => void;
}) {
  const images = usePactImages();
  return (
    <div>
      <p className="block text-xs text-osrs-muted uppercase tracking-wider mb-1.5">
        Image <span className="normal-case tracking-normal text-osrs-muted/60">(optional)</span>
      </p>
      <div className="grid grid-cols-3 gap-2 max-h-[272px] overflow-y-auto scrollbar-thin pr-0.5">
        {images.map((filename) => {
          const selected = value === filename;
          return (
            <button
              key={filename}
              type="button"
              onClick={() => onChange(selected ? '' : filename)}
              className={`flex flex-col items-center gap-1.5 rounded-md border px-2 py-2 transition-colors text-center ${
                selected
                  ? 'border-osrs-gold bg-osrs-gold/10 text-osrs-gold'
                  : 'border-osrs-border bg-osrs-card hover:border-osrs-gold/40 text-osrs-muted'
              }`}
            >
              <img
                src={pactImg(filename)}
                alt={formatImageName(filename)}
                className="w-9 h-9 object-contain"
              />
              <span className="text-[10px] leading-tight">{formatImageName(filename)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const REGION_OPTIONS = [
  'Global',
  'Varlamore',
  'Karamja',
  'Kandarin',
  'Kourend',
  'Tirannwn',
] as const;

interface Props {
  readonly onAdd: (step: Step) => void;
  readonly onClose: () => void;
}

const INPUT_CLASS =
  'w-full bg-osrs-card border border-osrs-border rounded px-3 py-2 text-sm text-osrs-parchment placeholder:text-osrs-muted/50 focus:outline-none focus:border-osrs-gold/60';

function PactFields({
  region,
  points,
  isReset,
  onRegion,
  onPoints,
  onReset,
}: {
  readonly region: string;
  readonly points: string;
  readonly isReset: boolean;
  readonly onRegion: (v: string) => void;
  readonly onPoints: (v: string) => void;
  readonly onReset: (v: boolean) => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="pact-region" className="block text-xs text-osrs-muted uppercase tracking-wider mb-1.5">
          Region
        </label>
        <select id="pact-region" value={region} onChange={(e) => onRegion(e.target.value)} className={INPUT_CLASS}>
          <option value="">— none —</option>
          {REGION_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label htmlFor="pact-points" className="block text-xs text-osrs-muted uppercase tracking-wider mb-1.5">
            Points
          </label>
          <input
            id="pact-points"
            type="number"
            value={points}
            onChange={(e) => onPoints(e.target.value)}
            placeholder="e.g. 80"
            className={INPUT_CLASS}
          />
        </div>
        <label className="flex items-center gap-2 pb-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isReset}
            onChange={(e) => onReset(e.target.checked)}
            className="accent-osrs-gold"
          />
          <span className="text-sm text-osrs-muted">+ Reset</span>
        </label>
      </div>
    </div>
  );
}

export default function AddTaskModal({ onAdd, onClose }: Props) {
  const [type, setType] = useState<StepType>('step');
  const [text, setText] = useState('');
  const [region, setRegion] = useState('');
  const [points, setPoints] = useState('');
  const [isReset, setIsReset] = useState(false);
  const [assignmentRank, setAssignmentRank] = useState<'Major' | 'Minor'>('Minor');
  const [pactImage, setPactImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const step: Step = {
      id: `edit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text: trimmed,
      type,
    };

    if (type === 'pact') {
      if (region) step.region = region as Step['region'];
      const pts = Number.parseInt(points, 10);
      if (!Number.isNaN(pts)) step.points = pts;
      if (isReset) step.isReset = true;
    }

    if (type === 'assignment') {
      step.assignmentRank = assignmentRank;
    }

    if ((type === 'assignment' || type === 'keystone') && pactImage) {
      step.pactImage = pactImage;
    }

    onAdd(step);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 w-full cursor-default"
        onClick={onClose}
      />
      <div className="relative bg-osrs-panel border border-osrs-border rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-osrs-border">
          <h2 className="text-base font-bold text-osrs-gold">Add Task</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-osrs-muted hover:text-osrs-parchment text-xl leading-none transition-colors px-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Category */}
          <div>
            <label htmlFor="task-category" className="block text-xs text-osrs-muted uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              id="task-category"
              value={type}
              onChange={(e) => setType(e.target.value as StepType)}
              className={INPUT_CLASS}
            >
              {TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Text */}
          <div>
            <label htmlFor="task-text" className="block text-xs text-osrs-muted uppercase tracking-wider mb-1.5">
              Text
            </label>
            <textarea
              id="task-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="Enter task description…"
              className={`${INPUT_CLASS} resize-none`}
            />
            <p className="text-[10px] text-osrs-muted/60 mt-1.5">
              Links: <code className="text-osrs-muted font-mono">[label](url)</code> e.g.{' '}
              <code className="text-osrs-muted/80 font-mono">[Rune Store](https://…)</code>
            </p>
          </div>

          {/* Pact-specific fields */}
          {type === 'pact' && (
            <PactFields
              region={region}
              points={points}
              isReset={isReset}
              onRegion={setRegion}
              onPoints={setPoints}
              onReset={setIsReset}
            />
          )}

          {/* Assignment rank */}
          {type === 'assignment' && (
            <div>
              <label htmlFor="task-rank" className="block text-xs text-osrs-muted uppercase tracking-wider mb-1.5">
                Rank
              </label>
              <select
                id="task-rank"
                value={assignmentRank}
                onChange={(e) => setAssignmentRank(e.target.value as 'Major' | 'Minor')}
                className={INPUT_CLASS}
              >
                <option value="Major">Major</option>
                <option value="Minor">Minor</option>
              </select>
            </div>
          )}

          {/* Image picker for assignment / keystone */}
          {(type === 'assignment' || type === 'keystone') && (
            <ImagePicker value={pactImage} onChange={setPactImage} />
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-osrs-muted hover:text-osrs-parchment border border-osrs-border hover:border-osrs-muted rounded px-4 py-1.5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm font-semibold text-osrs-bg bg-osrs-gold hover:bg-osrs-gold/80 rounded px-4 py-1.5 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
