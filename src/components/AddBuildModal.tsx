'use client';

import { useState } from 'react';

interface Props {
  readonly onAdd: (build: { name: string; url: string }) => void;
  readonly onClose: () => void;
  readonly initialName?: string;
  readonly initialUrl?: string;
}

const INPUT_CLASS =
  'w-full bg-osrs-card border border-osrs-border rounded px-3 py-2 text-sm text-osrs-parchment placeholder:text-osrs-muted/50 focus:outline-none focus:border-osrs-gold/60';

export default function AddBuildModal({ onAdd, onClose, initialName = '', initialUrl = '' }: Props) {
  const [name, setName] = useState(initialName);
  const [url, setUrl] = useState(initialUrl);
  const isEditing = initialName !== '' || initialUrl !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedUrl = url.trim();
    if (!trimmedName || !trimmedUrl) return;
    onAdd({ name: trimmedName, url: trimmedUrl });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 w-full cursor-default"
        onClick={onClose}
      />
      <div className="relative bg-osrs-panel border border-osrs-border rounded-lg w-full max-w-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-osrs-border">
          <h2 className="text-base font-bold text-osrs-gold">
            {isEditing ? 'Edit Build Link' : 'Add Build Link'}
          </h2>
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
          <div>
            <label htmlFor="build-name" className="block text-xs text-osrs-muted uppercase tracking-wider mb-1.5">
              Name
            </label>
            <input
              id="build-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 24p Build"
              className={INPUT_CLASS}
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="build-url" className="block text-xs text-osrs-muted uppercase tracking-wider mb-1.5">
              Link
            </label>
            <input
              id="build-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://…"
              className={INPUT_CLASS}
            />
          </div>

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
              disabled={!name.trim() || !url.trim()}
              className="text-sm font-semibold text-osrs-bg bg-osrs-gold hover:bg-osrs-gold/80 disabled:opacity-40 disabled:cursor-not-allowed rounded px-4 py-1.5 transition-colors"
            >
              {isEditing ? 'Save Build' : 'Add Build'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
