'use client';

interface Props {
  readonly onClose: () => void;
}

const STEPS = [
  {
    level: 1,
    creature: 'Crimson Swift',
    url: 'https://oldschool.runescape.wiki/w/Crimson_swift',
    location: 'North-east Tlati Rainforest',
  },
  {
    level: 9,
    creature: 'Copper Longtail',
    url: 'https://oldschool.runescape.wiki/w/Copper_longtail',
    location: 'Auburnvale / Aldarin',
  },
  {
    level: 11,
    creature: 'Cerulean Twitch',
    url: 'https://oldschool.runescape.wiki/w/Cerulean_twitch',
    location: 'Mons Gratia',
  },
  {
    level: 15,
    creature: 'Ruby Harvest',
    url: 'https://oldschool.runescape.wiki/w/Ruby_harvest',
    location: 'Auburn Valley / Auburnvale / Aldarin',
  },
  {
    level: 19,
    creature: 'Tropical Wagtail',
    url: 'https://oldschool.runescape.wiki/w/Tropical_wagtail',
    location: 'Tlati Rainforest',
  },
  {
    level: 35,
    creature: 'Snowy Knight',
    url: 'https://oldschool.runescape.wiki/w/Snowy_knight',
    location: 'Mons Gratia',
  },
  {
    level: 45,
    creature: 'Black Warlock',
    url: 'https://oldschool.runescape.wiki/w/Black_warlock',
    location: 'Tlati Rainforest / Crypt of Tonali',
  },
];

export default function Hunter46Modal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <div
        className="bg-osrs-panel border border-osrs-border rounded-lg w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-osrs-border">
          <div>
            <p className="text-[10px] text-osrs-muted uppercase tracking-widest leading-none mb-1">
              Hunter Progression
            </p>
            <h2 className="text-base font-bold text-osrs-gold leading-tight">
              Getting to Level 46 Hunter
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-osrs-muted hover:text-osrs-parchment text-xl leading-none transition-colors px-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Steps */}
        <div className="p-4 space-y-2">
          {STEPS.map((s, i) => {
            const isLast = i === STEPS.length - 1;
            const nextLevel = STEPS[i + 1]?.level;
            return (
              <div
                key={s.level}
                className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${isLast ? 'border-osrs-gold/40 bg-osrs-gold/10' : 'border-osrs-border bg-osrs-card'}`}
              >
                {/* Level badge */}
                <div className="flex-shrink-0 flex flex-col items-center gap-0.5 pt-0.5">
                  <span
                    className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${isLast ? 'bg-osrs-gold/20 text-osrs-gold' : 'bg-osrs-border text-osrs-muted'}`}
                  >
                    {s.level}
                  </span>
                  {nextLevel && (
                    <span className="text-[9px] text-osrs-muted/50 font-mono">→{nextLevel}</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-semibold underline transition-colors ${isLast ? 'text-osrs-gold hover:text-osrs-gold/70' : 'text-osrs-parchment hover:text-osrs-gold'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {s.creature}
                  </a>
                  <p className="text-xs text-osrs-muted mt-0.5">{s.location}</p>
                </div>
              </div>
            );
          })}
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
