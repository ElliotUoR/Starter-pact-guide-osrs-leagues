'use client';

const STEPS = [
  {
    text: "Buy 11.1k feathers from ",
    linkLabel: "Picaria's Fishing Shop",
    linkUrl: "https://oldschool.runescape.wiki/w/Picaria%27s_Fishing_Shop",
    after: " near Sunset Coast via quetzal.",
  },
  { text: "After unlocking Woodsman, get 15 fletching from cutting logs into arrow shafts/shortbows/longbows." },
  { text: "Cut 185 oak logs (~11 mins or less)." },
  { text: "Fletch into 5,540 arrow shafts." },
  { text: "Feather arrow shafts while training hunter till 45 fletching." },
  {
    text: "If 45 Woodcutting achieved, get a teak log from a ",
    linkLabel: "teak tree",
    linkUrl: "https://oldschool.runescape.wiki/w/Teak_tree",
    after: " (near red chins).",
  },
  { text: "If not 45 Woodcutting, you will get a teak log from rumours." },
  { text: "You can now 3t chins with a knife." },
];

interface Props {
  readonly onClose: () => void;
}

export default function Fletching45Modal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div aria-hidden className="absolute inset-0 bg-black/60" />
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <div className="relative z-10 bg-osrs-panel border border-osrs-border rounded-lg shadow-2xl w-full max-w-lg mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-osrs-gold font-bold text-base">Lvl 45 Fletching Guide</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-osrs-muted hover:text-osrs-parchment transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>
        <ol className="space-y-2 list-none">
          {STEPS.map((s) => (
            <li key={s.text} className="flex gap-2.5 text-sm text-osrs-parchment">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-osrs-gold/20 text-osrs-gold text-[11px] font-bold flex items-center justify-center mt-0.5">
                {STEPS.indexOf(s) + 1}
              </span>
              <span className="leading-snug">
                {s.text}
                {s.linkLabel && (
                  <a
                    href={s.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-osrs-gold hover:text-osrs-gold/70 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {s.linkLabel}
                  </a>
                )}
                {s.after}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
