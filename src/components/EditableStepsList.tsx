'use client';

import { useEffect, useRef, useState } from 'react';
import type { Step } from '@/data/guideData';
import AddTaskModal from './AddTaskModal';
import ChecklistItem from './ChecklistItem';

interface Props {
  readonly steps: Step[];
  readonly progress: Record<string, boolean>;
  readonly onToggle: (id: string) => void;
  readonly isEditMode: boolean;
  readonly onAddStep: (step: Step) => void;
  readonly onDeleteStep: (stepId: string) => void;
  readonly onEditStep: (stepId: string, newText: string) => void;
  readonly onReorderSteps: (fromIndex: number, toIndex: number) => void;
}

interface CtxMenu {
  x: number;
  y: number;
  stepId: string;
  stepText: string;
}

// ── Inline text editor ───────────────────────────────────────────────────────

interface StepEditorProps {
  readonly initialText: string;
  readonly onCommit: (text: string) => void;
  readonly onCancel: () => void;
}

function StepEditor({ initialText, onCommit, onCancel }: StepEditorProps) {
  const [value, setValue] = useState(initialText);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  const commit = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== initialText) onCommit(trimmed);
    else onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commit(); }
    if (e.key === 'Escape') onCancel();
  };

  return (
    <div className="rounded-md border border-osrs-gold/50 bg-osrs-card px-3 py-2">
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        rows={2}
        className="w-full bg-transparent text-sm text-osrs-parchment focus:outline-none resize-none"
      />
      <p className="text-[10px] text-osrs-muted mt-1">
        Enter to save · Escape to cancel · Shift+Enter for newline
      </p>
    </div>
  );
}

// ── Drag handle dots ─────────────────────────────────────────────────────────

function DragHandle() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-[3px] opacity-30 group-hover/row:opacity-60 transition-opacity pointer-events-none"
    >
      {[0, 1, 2].map((row) => (
        <span key={row} className="flex gap-[3px]">
          <span className="w-[3px] h-[3px] rounded-full bg-osrs-muted" />
          <span className="w-[3px] h-[3px] rounded-full bg-osrs-muted" />
        </span>
      ))}
    </span>
  );
}

// ── Context menu ─────────────────────────────────────────────────────────────

function StepContextMenu({
  menu,
  onEditText,
  onDelete,
}: {
  readonly menu: CtxMenu;
  readonly onEditText: () => void;
  readonly onDelete: () => void;
}) {
  return (
    <div
      role="menu"
      aria-label="Task options"
      className="fixed z-50 bg-osrs-panel border border-osrs-border rounded-md shadow-xl py-1 min-w-[150px]"
      style={{ top: menu.y, left: menu.x }}
    >
      <button
        type="button"
        role="menuitem"
        onClick={onEditText}
        className="w-full text-left px-4 py-2 text-sm text-osrs-parchment hover:bg-osrs-card transition-colors"
      >
        Edit text
      </button>
      <div className="mx-3 my-0.5 border-t border-osrs-border/60" />
      <button
        type="button"
        role="menuitem"
        onClick={onDelete}
        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-950/50 transition-colors"
      >
        Delete task
      </button>
    </div>
  );
}

// ── Step row helpers ─────────────────────────────────────────────────────────

function buildRowClass(draggable: boolean, isDragging: boolean, isOver: boolean): string {
  const grab = draggable ? ' pl-5 cursor-grab active:cursor-grabbing' : '';
  const dim = isDragging ? ' opacity-40' : '';
  const ring = isOver ? ' ring-1 ring-osrs-gold/50 rounded-md' : '';
  return `relative group/row${grab}${dim}${ring}`;
}

interface DragArgs {
  draggable: boolean;
  isEditMode: boolean;
  index: number;
  step: Step;
  onDragStart: (i: number, e: React.DragEvent) => void;
  onDragOver: (i: number, e: React.DragEvent) => void;
  onDrop: (i: number, e: React.DragEvent) => void;
  onDragEnd: () => void;
  onContextMenu: (step: Step, e: React.MouseEvent) => void;
}

function buildDragHandlers(a: DragArgs) {
  return {
    draggable: a.draggable,
    onDragStart: a.draggable ? (e: React.DragEvent) => a.onDragStart(a.index, e) : undefined,
    onDragOver: a.isEditMode ? (e: React.DragEvent) => a.onDragOver(a.index, e) : undefined,
    onDrop: a.isEditMode ? (e: React.DragEvent) => a.onDrop(a.index, e) : undefined,
    onDragEnd: a.isEditMode ? a.onDragEnd : undefined,
    onContextMenu: a.draggable ? (e: React.MouseEvent) => a.onContextMenu(a.step, e) : undefined,
  };
}

// ── Individual step row ──────────────────────────────────────────────────────

interface StepRowProps {
  readonly step: Step;
  readonly index: number;
  readonly progress: Record<string, boolean>;
  readonly onToggle: (id: string) => void;
  readonly isEditMode: boolean;
  readonly isDragging: boolean;
  readonly isOver: boolean;
  readonly isEditing: boolean;
  readonly onDragStart: (i: number, e: React.DragEvent) => void;
  readonly onDragOver: (i: number, e: React.DragEvent) => void;
  readonly onDrop: (i: number, e: React.DragEvent) => void;
  readonly onDragEnd: () => void;
  readonly onContextMenu: (step: Step, e: React.MouseEvent) => void;
  readonly onCommitEdit: (text: string) => void;
  readonly onCancelEdit: () => void;
}

function StepRow({
  step, index, progress, onToggle, isEditMode,
  isDragging, isOver, isEditing,
  onDragStart, onDragOver, onDrop, onDragEnd, onContextMenu,
  onCommitEdit, onCancelEdit,
}: StepRowProps) {
  const draggable = isEditMode && !isEditing;
  const handlers = buildDragHandlers({ draggable, isEditMode, index, step, onDragStart, onDragOver, onDrop, onDragEnd, onContextMenu });

  return (
    <li {...handlers} className={buildRowClass(draggable, isDragging, isOver)}>
      {draggable && <DragHandle />}
      {isEditing ? (
        <StepEditor initialText={step.text} onCommit={onCommitEdit} onCancel={onCancelEdit} />
      ) : (
        <ChecklistItem step={step} checked={!!progress[step.id]} onToggle={onToggle} />
      )}
    </li>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function EditableStepsList({
  steps, progress, onToggle, isEditMode,
  onAddStep, onDeleteStep, onEditStep, onReorderSteps,
}: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [ctxMenu, setCtxMenu] = useState<CtxMenu | null>(null);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (ctxMenu === null) return;
    const close = () => setCtxMenu(null);
    const onEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') setCtxMenu(null); };
    document.addEventListener('click', close);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', onEscape);
    };
  }, [ctxMenu]);

  const handleDragStart = (i: number, e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    setDragIndex(i);
  };

  const handleDragOver = (i: number, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== i) setDragOverIndex(i);
  };

  const handleDrop = (i: number, e: React.DragEvent) => {
    e.preventDefault();
    if (dragIndex !== null && dragIndex !== i) onReorderSteps(dragIndex, i);
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => { setDragIndex(null); setDragOverIndex(null); };

  const handleContextMenu = (step: Step, e: React.MouseEvent) => {
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY, stepId: step.id, stepText: step.text });
  };

  const handleEditText = () => {
    if (ctxMenu !== null) setEditingStepId(ctxMenu.stepId);
    setCtxMenu(null);
  };

  const handleDelete = () => {
    if (ctxMenu !== null) onDeleteStep(ctxMenu.stepId);
    setCtxMenu(null);
  };

  return (
    <>
      <ul className="list-none space-y-2">
        {steps.map((step, i) => (
          <StepRow
            key={step.id}
            step={step}
            index={i}
            progress={progress}
            onToggle={onToggle}
            isEditMode={isEditMode}
            isDragging={dragIndex === i}
            isOver={dragOverIndex === i && dragIndex !== i}
            isEditing={editingStepId === step.id}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            onContextMenu={handleContextMenu}
            onCommitEdit={(text) => { onEditStep(step.id, text); setEditingStepId(null); }}
            onCancelEdit={() => setEditingStepId(null)}
          />
        ))}
      </ul>

      {isEditMode && (
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="w-full mt-1 flex items-center justify-center gap-2 py-2 rounded-md border border-dashed border-osrs-gold/30 hover:border-osrs-gold/60 text-sm text-osrs-gold/50 hover:text-osrs-gold/80 transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M7 2v10M2 7h10" />
          </svg>
          Add Task
        </button>
      )}

      {ctxMenu !== null && (
        <StepContextMenu menu={ctxMenu} onEditText={handleEditText} onDelete={handleDelete} />
      )}

      {showAddModal && (
        <AddTaskModal onAdd={onAddStep} onClose={() => setShowAddModal(false)} />
      )}
    </>
  );
}
