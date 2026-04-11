'use client';

import { GearUpgrade } from '@/data/guideData';

interface Props {
  gearUpgrades: GearUpgrade[];
}

export default function GearPanel({ gearUpgrades }: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-osrs-gear-border">
        <h3 className="text-xs font-bold uppercase tracking-widest text-osrs-gear-green">
          Gear Upgrades
        </h3>
        <span className="text-[10px] font-mono text-osrs-gear-green/70 bg-osrs-gear-bg border border-osrs-gear-border rounded px-1.5 py-0.5">
          {gearUpgrades.length}
        </span>
      </div>

      {/* Gear cards */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
        {gearUpgrades.length === 0 ? (
          <p className="text-osrs-muted text-xs italic text-center mt-8">No gear upgrades this stage</p>
        ) : (
          gearUpgrades.map((upgrade) => (
            <div
              key={upgrade.id}
              className="rounded border border-osrs-gear-border bg-osrs-gear-bg p-3"
            >
              {/* Title row */}
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-3.5 h-3.5 text-osrs-gear-green flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1l1.9 3.8 4.2.6-3 3 .7 4.2L8 10.5l-3.8 2 .7-4.2-3-3 4.2-.6L8 1z" />
                </svg>
                <span className="text-xs font-bold text-osrs-gear-green">{upgrade.label}</span>
                {upgrade.optional && (
                  <span className="text-[10px] text-osrs-muted border border-osrs-border rounded px-1">
                    optional
                  </span>
                )}
              </div>

              {/* Items list */}
              <ul className="space-y-1 mb-2">
                {upgrade.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-osrs-gear-green/60 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-emerald-200">{item.name}</span>
                      {item.note && (
                        <span className="text-[10px] text-osrs-muted ml-1">— {item.note}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* How to obtain */}
              <div className="border-t border-osrs-gear-border/50 pt-2 mt-2">
                <p className="text-[10px] text-osrs-muted uppercase tracking-wide mb-0.5">How to obtain</p>
                <p className="text-xs text-osrs-muted/80 leading-snug">{upgrade.howTo}</p>
              </div>

              {/* Links */}
              {upgrade.links && upgrade.links.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {upgrade.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-osrs-gear-green/80 hover:text-osrs-gear-green underline underline-offset-2 transition-colors"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
