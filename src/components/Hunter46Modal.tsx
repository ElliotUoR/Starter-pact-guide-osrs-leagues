'use client';

interface Breakpoint {
  level: number;
  catches: number;
}

interface HunterStep {
  level: number;
  creature: string;
  url: string;
  location: string;
  xpBase: number;
  breakpoints: Breakpoint[];
  recommended?: boolean;
  note?: string;
}

// XP table: level → cumulative XP (from wiki)
// Level 45: 61,512 | 46: 67,983 | 62: 333,804
// Leagues multiplier: ×16
//
// Catches = ceil((targetXP − startXP) / (xpBase × 16))
//
// Crimson Swift    34 xp → 544  leagues
// Copper Longtail 61.2 xp → 979.2
// Cerulean Twitch 64.5 xp → 1,032
// Ruby Harvest     24 xp → 384
// Tropical Wagtail 95.2 xp → 1,523.2
// Snowy Knight     44 xp → 704
// Black Warlock    54 xp → 864
const STEPS: HunterStep[] = [
  {
    level: 1,
    creature: 'Crimson Swift',
    url: 'https://oldschool.runescape.wiki/w/Crimson_swift',
    location: 'North-east Tlati Rainforest',
    xpBase: 34,
    recommended: true,
    breakpoints: [
      // ceil((969-0)/544)=2, ceil(1358/544)=3, ceil(2411/544)=5,
      // ceil(3973/544)=8, ceil(22406/544)=42, ceil(61512/544)=114
      { level: 9, catches: 2 },
      { level: 11, catches: 3 },
      { level: 15, catches: 5 },
      { level: 19, catches: 8 },
      { level: 35, catches: 42 },
      { level: 45, catches: 114 },
    ],
  },
  {
    level: 9,
    creature: 'Copper Longtail',
    url: 'https://oldschool.runescape.wiki/w/Copper_longtail',
    location: 'Auburnvale / Aldarin',
    xpBase: 61.2,
    breakpoints: [
      // start XP 969. per catch 979.2 (floor 979 for ceil calc)
      // ceil(389/979)=1, ceil(1442/979)=2, ceil(3004/979)=4,
      // ceil(21437/979)=22, ceil(60543/979)=62
      { level: 11, catches: 1 },
      { level: 15, catches: 2 },
      { level: 19, catches: 4 },
      { level: 35, catches: 22 },
      { level: 45, catches: 62 },
    ],
  },
  {
    level: 11,
    creature: 'Cerulean Twitch',
    url: 'https://oldschool.runescape.wiki/w/Cerulean_twitch',
    location: 'Mons Gratia',
    xpBase: 64.5,
    breakpoints: [
      // start XP 1358. per catch 1032
      // ceil(1053/1032)=2, ceil(2615/1032)=3,
      // ceil(21048/1032)=21, ceil(60154/1032)=59
      { level: 15, catches: 2 },
      { level: 19, catches: 3 },
      { level: 35, catches: 21 },
      { level: 45, catches: 59 },
    ],
  },
  {
    level: 15,
    creature: 'Ruby Harvest',
    url: 'https://oldschool.runescape.wiki/w/Ruby_harvest',
    location: 'Auburn Valley / Auburnvale / Aldarin',
    xpBase: 24,
    breakpoints: [
      // start XP 2411. per catch 384
      // ceil(1562/384)=5, ceil(19995/384)=53, ceil(59101/384)=154
      { level: 19, catches: 5 },
      { level: 35, catches: 53 },
      { level: 45, catches: 154 },
    ],
  },
  {
    level: 19,
    creature: 'Tropical Wagtail',
    url: 'https://oldschool.runescape.wiki/w/Tropical_wagtail',
    location: 'Tlati Rainforest',
    xpBase: 95.2,
    recommended: true,
    breakpoints: [
      // start XP 3973. per catch 1523.2 (floor 1523 for calc)
      // ceil(18433/1523)=13, ceil(57539/1523)=38
      { level: 35, catches: 13 },
      { level: 45, catches: 38 },
    ],
  },
  {
    level: 35,
    creature: 'Snowy Knight',
    url: 'https://oldschool.runescape.wiki/w/Snowy_knight',
    location: 'Mons Gratia',
    xpBase: 44,
    note: 'Fastest way there is Quetzal to Quetzacalli Gorge',
    breakpoints: [
      // start XP 22406. per catch 704
      // ceil(39106/704)=56
      { level: 45, catches: 56 },
    ],
  },
  {
    level: 45,
    creature: 'Black Warlock',
    url: 'https://oldschool.runescape.wiki/w/Black_warlock',
    location: 'Tlati Rainforest / Crypt of Tonali',
    xpBase: 54,
    recommended: true,
    breakpoints: [
      // start XP 61512. per catch 864
      // ceil(6471/864)=8, ceil(272292/864)=316
      { level: 46, catches: 8 },
      { level: 62, catches: 316 },
    ],
  },
];

function formatXp(xpBase: number): string {
  const leagues = xpBase * 16;
  return Number.isInteger(leagues)
    ? leagues.toLocaleString()
    : leagues.toFixed(1).replaceAll(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getCardClass(s: HunterStep): string {
  if (s.recommended) return 'border-green-700/50 bg-green-950/50 hover:border-green-600/60';
  if (s.note) return 'border-blue-700/50 bg-blue-950/50 hover:border-blue-600/60';
  return 'border-osrs-border bg-osrs-card hover:border-osrs-border/80';
}

function getBadgeClass(s: HunterStep): string {
  if (s.recommended) return 'bg-green-900/40 text-green-300';
  if (s.note) return 'bg-blue-900/40 text-blue-300';
  return 'bg-osrs-border text-osrs-muted';
}

function getLinkClass(s: HunterStep): string {
  if (s.recommended) return 'text-green-300 hover:text-green-200';
  if (s.note) return 'text-blue-300 hover:text-blue-200';
  return 'text-osrs-parchment hover:text-osrs-gold';
}

interface Props {
  readonly onClose: () => void;
}

export default function Hunter46Modal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 w-full cursor-default"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="relative bg-osrs-panel border border-osrs-border rounded-lg w-full max-w-lg max-h-[85vh] overflow-y-auto">
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

        {/* Quetzal travel tip */}
        <div className="mx-4 mt-3 mb-1 flex gap-2 rounded-md border border-yellow-700/40 bg-yellow-900/20 px-3 py-2">
          <span className="mt-0.5 flex-shrink-0 text-yellow-400 text-xs">💡</span>
          <p className="text-xs text-yellow-300/90 leading-snug">
            Fastest way to{' '}
            <span className="font-semibold text-yellow-200">Tlati Rainforest</span> /{' '}
            <span className="font-semibold text-yellow-200">Hunter Guild</span> is Quetzal travel.
          </p>
        </div>

        {/* Steps */}
        <div className="p-4 space-y-2">
          {STEPS.map((s, i) => {
            const nextLevel = STEPS[i + 1]?.level;
            return (
              <div
                key={s.level}
                className={`group rounded-lg border transition-colors duration-150 ${getCardClass(s)}`}
              >
                {/* Main row */}
                <div className="flex items-start gap-3 px-4 py-3">
                  {/* Level badge */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-0.5 pt-0.5">
                    <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${getBadgeClass(s)}`}>
                      {s.level}
                    </span>
                    {nextLevel !== undefined && (
                      <span className="text-[9px] text-osrs-muted/50 font-mono">→{nextLevel}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-semibold underline transition-colors ${getLinkClass(s)}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {s.creature}
                      </a>
                      {s.recommended === true && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide bg-green-900/50 text-green-300 border border-green-700/40">
                          Recommended
                        </span>
                      )}
                      {s.note !== undefined && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide bg-blue-900/50 text-blue-300 border border-blue-700/40">
                          Alternate
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-osrs-muted mt-0.5">{s.location}</p>
                    {s.note !== undefined && (
                      <p className="text-xs text-blue-300/80 mt-1 italic">{s.note}</p>
                    )}
                  </div>

                  {/* XP per catch */}
                  <div className="flex-shrink-0 text-right pt-0.5">
                    <span className="text-xs font-mono text-osrs-parchment/80">
                      {formatXp(s.xpBase)}
                    </span>
                    <p className="text-[10px] text-osrs-muted">xp/catch</p>
                  </div>
                </div>

                {/* Hover breakpoints */}
                <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-[max-height] duration-300 ease-out">
                  <div className="px-4 pb-3 pt-0 border-t border-osrs-border/40">
                    <p className="text-[10px] text-osrs-muted uppercase tracking-wider mb-2 mt-2">
                      Catches to reach…
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {s.breakpoints.map((bp) => (
                        <div key={bp.level} className="flex items-baseline gap-1.5">
                          <span className="text-[10px] text-osrs-muted font-mono">Lvl {bp.level}</span>
                          <span className="text-sm font-bold font-mono text-osrs-parchment">
                            {bp.catches}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
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
