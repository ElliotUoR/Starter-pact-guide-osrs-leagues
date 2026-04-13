'use client';

interface Props {
  readonly onClose: () => void;
}

export default function HunterRumoursModal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <div
        className="bg-osrs-panel border border-osrs-border rounded-lg w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-osrs-border">
          <div>
            <p className="text-[10px] text-osrs-muted uppercase tracking-widest leading-none mb-1">
              Varlamore Setup
            </p>
            <h2 className="text-base font-bold text-osrs-gold leading-tight">Hunter Rumours</h2>
          </div>
          <button
            onClick={onClose}
            className="text-osrs-muted hover:text-osrs-parchment text-xl leading-none transition-colors px-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Intro */}
        <div className="px-5 py-4 border-b border-osrs-border/60 space-y-2">
          <p className="text-sm text-osrs-muted leading-relaxed">
            Hunter rumours are like Slayer tasks assigned by guild hunters in{' '}
            <a
              href="https://oldschool.runescape.wiki/w/The_Burrow"
              target="_blank"
              rel="noopener noreferrer"
              className="text-osrs-gold underline hover:text-osrs-gold/70 transition-colors"
            >
              The Burrow
            </a>
            . First, talk to{' '}
            <a
              href="https://oldschool.runescape.wiki/w/Guild_Scribe_Verity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-osrs-gold underline hover:text-osrs-gold/70 transition-colors"
            >
              Guild Scribe Verity
            </a>{' '}
            in the Burrow under the{' '}
            <a
              href="https://oldschool.runescape.wiki/w/Hunter_Guild"
              target="_blank"
              rel="noopener noreferrer"
              className="text-osrs-gold underline hover:text-osrs-gold/70 transition-colors"
            >
              Hunter Guild
            </a>
            .
          </p>
          <p className="text-sm text-osrs-muted leading-relaxed">
            Unlike Slayer (fixed kills), rumours can finish at any point up to a maximum limit. You
            can effectively{' '}
            <span className="text-osrs-parchment font-medium">&apos;block&apos;</span> tasks — if
            the novice hunter gives you a pyre fox task, talk to an adept hunter and they{' '}
            <em>cannot</em> assign pyre fox (the novice is holding it). With only Varlamore unlocked
            this lets you always receive red chinchompa tasks.
          </p>
        </div>

        {/* Tip */}
        <div className="mx-4 mb-1 mt-3 flex gap-2 rounded-md border border-yellow-700/40 bg-yellow-900/20 px-3 py-2">
          <span className="mt-0.5 flex-shrink-0 text-yellow-400 text-xs">💡</span>
          <p className="text-xs text-yellow-300/90 leading-snug">
            It may be faster to train straight to{' '}
            <span className="font-mono font-bold text-yellow-200">62</span> via black warlocks
            (catch{' '}
            <span className="font-mono font-bold text-yellow-200">316</span>) then start doing
            adept contracts.
          </p>
        </div>

        {/* 4 boxes — 2×2 grid */}
        <div className="grid grid-cols-2 gap-3 p-4">
          {/* Top-left: Novice */}
          <div className="border border-osrs-border rounded-lg p-3 bg-osrs-card">
            <p className="text-[10px] uppercase tracking-widest text-osrs-muted mb-2">
              Novice Setup
            </p>
            <ul className="space-y-1.5">
              <li className="text-sm text-osrs-parchment">
                • Need level{' '}
                <span className="text-osrs-gold font-mono font-bold">46</span> Hunter for
                first rumours
              </li>
              <li className="text-sm text-osrs-parchment">
                • Spam novice rumours until level{' '}
                <span className="text-osrs-gold font-mono font-bold">57</span>
              </li>
            </ul>
          </div>

          {/* Top-right: Adept */}
          <div className="border border-osrs-border rounded-lg p-3 bg-osrs-card">
            <p className="text-[10px] uppercase tracking-widest text-osrs-muted mb-2">
              Adept Setup
            </p>
            <ul className="space-y-1.5">
              <li className="text-sm text-osrs-parchment">
                • At <span className="text-osrs-gold font-mono font-bold">57</span>: use{' '}
                <span className="text-osrs-parchment font-semibold">Ornus</span> until pyre fox task
              </li>
              <li className="text-sm text-osrs-parchment">
                • Train hunter to{' '}
                <span className="text-osrs-gold font-mono font-bold">62</span> to catch red chins
              </li>
              <li className="text-sm text-osrs-parchment">
                • Use <span className="text-osrs-parchment font-semibold">Cervus</span> — always
                gives red chins
              </li>
            </ul>
          </div>

          {/* Bottom-left: Expert */}
          <div className="border border-osrs-border rounded-lg p-3 bg-osrs-card">
            <p className="text-[10px] uppercase tracking-widest text-osrs-muted mb-2">
              Expert Setup
            </p>
            <ul className="space-y-1.5">
              <li className="text-sm text-osrs-parchment">
                • At <span className="text-osrs-gold font-mono font-bold">72</span>: use{' '}
                <span className="text-osrs-parchment font-semibold">Aco</span> until sunlight
                antelope task
              </li>
              <li className="text-sm text-osrs-parchment">
                • Use <span className="text-osrs-parchment font-semibold">Teco</span> for red chins
              </li>
              <li className="text-sm text-osrs-parchment">
                • At <span className="text-osrs-gold font-mono font-bold">75</span>: use{' '}
                <span className="text-osrs-parchment font-semibold">Cervus</span> to block sunlight
                moths
              </li>
              <li className="text-sm text-osrs-muted border-t border-osrs-border/50 pt-2 mt-1 leading-snug">
                <span className="text-osrs-parchment font-semibold">Alternate at 72:</span> block
                tecu salamander (Gilman/novice) + sunlight antelope (Teco) → switch between red
                chins and moonlight moths
              </li>
            </ul>
          </div>

          {/* Bottom-right: Master */}
          <div className="border border-osrs-border rounded-lg p-3 bg-osrs-card">
            <p className="text-[10px] uppercase tracking-widest text-osrs-muted mb-2">
              Master Setup
            </p>
            <p className="text-xs text-osrs-muted mb-2 leading-snug">
              2 extra loot rolls but cannot fully do red chins — takes more time to set up.
            </p>
            <ul className="space-y-1.5">
              <li className="text-sm text-osrs-parchment">
                • Block moonlight antelope →{' '}
                <span className="text-osrs-parchment font-semibold">Gilman</span>{' '}
                <span className="text-osrs-muted">(novice)</span>
              </li>
              <li className="text-sm text-osrs-parchment">
                • Block tecu salamander →{' '}
                <span className="text-osrs-parchment font-semibold">Aco</span>{' '}
                <span className="text-osrs-muted">(expert)</span>
              </li>
              <li className="text-sm text-osrs-parchment">
                • Block sunlight antelope →{' '}
                <span className="text-osrs-parchment font-semibold">Teco</span>{' '}
                <span className="text-osrs-muted">(expert)</span>
              </li>
              <li className="text-sm text-osrs-muted border-t border-osrs-border/50 pt-2 mt-1 leading-snug">
                Can&apos;t block moonlight moths — switch between them and chins
              </li>
            </ul>
          </div>
        </div>

        <div className="px-5 pb-4 flex justify-end">
          <button
            onClick={onClose}
            className="text-sm text-osrs-muted hover:text-osrs-parchment border border-osrs-border hover:border-osrs-muted rounded px-4 py-1.5 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
