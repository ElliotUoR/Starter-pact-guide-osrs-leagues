'use client';

import { useEffect, useRef, useState } from 'react';
import type { StageMeta } from '@/hooks/useEditableStages';

type Field = 'title' | 'subtitle' | 'intro';

interface CtxMenu {
  x: number;
  y: number;
  field: Field;
}

interface InlineEditorProps {
  readonly initialValue: string;
  readonly multiline: boolean;
  readonly onCommit: (value: string) => void;
  readonly onCancel: () => void;
}

function InlineEditor({ initialValue, multiline, onCommit, onCancel }: InlineEditorProps) {
  const [value, setValue] = useState(initialValue);
  const ref = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
    (ref.current as HTMLInputElement | null)?.select();
  }, []);

  const commit = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== initialValue) onCommit(trimmed);
    else onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (!multiline || !e.shiftKey)) { e.preventDefault(); commit(); }
    if (e.key === 'Escape') onCancel();
  };

  if (multiline) {
    return (
      <div className="rounded-md border border-osrs-gold/50 bg-osrs-card px-3 py-2 mt-1">
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          rows={3}
          className="w-full bg-transparent text-sm text-osrs-muted leading-relaxed focus:outline-none resize-none"
        />
        <p className="text-[10px] text-osrs-muted/60 mt-1">Enter to save · Escape to cancel · Shift+Enter for newline</p>
      </div>
    );
  }

  return (
    <input
      ref={ref as React.Ref<HTMLInputElement>}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={commit}
      onKeyDown={handleKeyDown}
      className="bg-osrs-card border border-osrs-gold/50 rounded px-2 py-0.5 text-osrs-gold font-bold focus:outline-none"
    />
  );
}

interface Props {
  readonly title: string;
  readonly subtitle?: string;
  readonly intro?: string;
  readonly stageIndex: number;
  readonly isOverview: boolean;
  readonly isEditMode: boolean;
  readonly onSave: (meta: StageMeta) => void;
}

export default function EditableStageHeader({
  title, subtitle, intro, stageIndex, isOverview, isEditMode, onSave,
}: Props) {
  const [ctxMenu, setCtxMenu] = useState<CtxMenu | null>(null);
  const [editingField, setEditingField] = useState<Field | null>(null);

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

  const handleContextMenu = (field: Field) => (e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY, field });
  };

  const startEdit = () => {
    if (ctxMenu !== null) setEditingField(ctxMenu.field);
    setCtxMenu(null);
  };

  const commitEdit = (field: Field) => (value: string) => {
    onSave({ [field]: value });
    setEditingField(null);
  };

  const cancelEdit = () => setEditingField(null);

  const editHint = isEditMode
    ? ' cursor-context-menu hover:ring-1 hover:ring-osrs-gold/30 rounded transition-shadow'
    : '';

  return (
    <div>
      <div className="flex items-baseline gap-3">
        {!isOverview && (
          <span className="text-[11px] font-mono text-osrs-muted border border-osrs-border rounded px-2 py-0.5">
            Stage {stageIndex}
          </span>
        )}

        {editingField === 'title' ? (
          <InlineEditor
            initialValue={title}
            multiline={false}
            onCommit={commitEdit('title')}
            onCancel={cancelEdit}
          />
        ) : (
          <h1
            className={`text-2xl font-bold text-osrs-gold${editHint}`}
            onContextMenu={handleContextMenu('title')}
          >
            {title}
          </h1>
        )}

        {editingField === 'subtitle' ? (
          <InlineEditor
            initialValue={subtitle ?? ''}
            multiline={false}
            onCommit={commitEdit('subtitle')}
            onCancel={cancelEdit}
          />
        ) : (
          <span
            className={`text-sm text-osrs-muted${editHint}`}
            onContextMenu={handleContextMenu('subtitle')}
          >
            {subtitle}
          </span>
        )}
      </div>

      {editingField === 'intro' ? (
        <InlineEditor
          initialValue={intro ?? ''}
          multiline={true}
          onCommit={commitEdit('intro')}
          onCancel={cancelEdit}
        />
      ) : (
        <p
          className={`mt-2 text-sm text-osrs-muted leading-relaxed max-w-2xl${editHint}`}
          onContextMenu={handleContextMenu('intro')}
        >
          {intro}
        </p>
      )}

      {ctxMenu !== null && (
        <div
          role="menu"
          aria-label="Field options"
          className="fixed z-50 bg-osrs-panel border border-osrs-border rounded-md shadow-xl py-1 min-w-[140px]"
          style={{ top: ctxMenu.y, left: ctxMenu.x }}
        >
          <button
            type="button"
            role="menuitem"
            onClick={startEdit}
            className="w-full text-left px-4 py-2 text-sm text-osrs-parchment hover:bg-osrs-card transition-colors"
          >
            Edit {ctxMenu.field}
          </button>
        </div>
      )}
    </div>
  );
}
