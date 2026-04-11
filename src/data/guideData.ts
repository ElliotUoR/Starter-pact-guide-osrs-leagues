export type StepType = 'pact' | 'step' | 'info' | 'warning' | 'relic';

export interface StepLink {
  /** The substring of `text` to turn into a hyperlink */
  text: string;
  url: string;
}

export interface Step {
  id: string;
  text: string;
  type: StepType;
  points?: number;
  isReset?: boolean;
  /** Relic image filenames from /images/relics/ to display after the text */
  relics?: string[];
  /** Inline hyperlinks — each entry wraps a substring of `text` in an anchor tag */
  links?: StepLink[];
  /** If set, clicking the item opens a named modal overlay instead of toggling */
  modal?: string;
}

export interface GearItem {
  name: string;
  note?: string;
}

export interface GearUpgrade {
  id: string;
  label: string;
  items: GearItem[];
  howTo: string;
  optional?: boolean;
  links?: { label: string; url: string }[];
}

export interface Stage {
  id: number;
  title: string;
  subtitle: string;
  intro: string;
  steps: Step[];
  gearUpgrades: GearUpgrade[];
  buildLink?: string;
  buildLabel?: string;
  dpsLinks?: { label: string; url: string }[];
}

export const stages: Stage[] = [
  // ─── Stage 0: Overview ──────────────────────────────────────────────────────
  {
    id: 0,
    title: 'Strategy Overview',
    subtitle: 'Introduction',
    intro:
      'A Demonic Pacts build centred around Kandarin echo weapons and prayer gear. The synergy gives you a permanent max hit via elemental weakness — aim for 50+ prayer bonus. Use this guide to work through all 40 pacts and build one of the strongest hybrid setups in Leagues 6.',
    steps: [
      {
        id: 's0-1',
        text: 'Regions: Kandarin → Kourend → Prifddinas. Kourend is needed for Slayer — have it by tier 6, but it is the weakest of the three for pacts.',
        type: 'info',
      },
      {
        id: 's0-2',
        text: 'Core problem: Mage accuracy falls flat against Vardorvis, Sol, etc. Solution: Air setup is cheap; hybrid into melee where magic underperforms (Tekton, Sol, Vard).',
        type: 'info',
      },
      {
        id: 's0-3',
        text: 'Exception: Olm head still wants ranged — rune cbow, tbow, or dhunter cbow are all best here.',
        type: 'info',
      },
      {
        id: 's0-4',
        text: 'Node strategy: Take all accuracy nodes first, then dip into melee speed attacks as the build matures.',
        type: 'info',
      },
      {
        id: 's0-5',
        text: 'This guide covers assumed progress only — relic picks are not included.',
        type: 'warning',
      },
    ],
    gearUpgrades: [],
    buildLink:
      'https://tools.runescape.wiki/osrs-dps-staging?id=WeepingYeastKrandorian',
    buildLabel: 'Final Loadout Reference',
  },

  // ─── Stage 1: Getting Started ────────────────────────────────────────────────
  {
    id: 1,
    title: 'Getting Started',
    subtitle: 'Pacts 1–5',
    intro:
      'Complete the early tutorial tasks to unlock the Leagues system. Low point tasks are critical — unlock all three regions as fast as possible.',
    steps: [
      { id: 's1-p1', text: 'Complete the Leagues Tutorial', type: 'pact', points: 10 },
      { id: 's1-p2', text: 'Open the Leagues Menu', type: 'pact', points: 10 },
      {
        id: 's1-r1',
        text: 'Unlock first relic — Endless Harvest recommended',
        type: 'relic',
        relics: ['Endless_Harvest.png', 'Barbarian_Gathering.png', 'Abundance.png'],
      },
      {
        id: 's1-p3',
        text: 'Defeat a Hill Giant',
        type: 'pact',
        points: 10,
        links: [{ text: 'Hill Giant', url: 'https://oldschool.runescape.wiki/w/Hill_Giant' }],
      },
      {
        id: 's1-hginfo',
        text: 'Hill Giants are found in south Avium Savannah and have a 25% earth weakness.',
        type: 'info',
      },
      {
        id: 's1-r2',
        text: 'Unlock Woodsman relic',
        type: 'relic',
        relics: ['Woodsman.png'],
      },
      {
        id: 's1-arcuani',
        text: "When you have gp from rumours, visit Arcuani's Archery Supplies to buy bows and ammo to level to 45 ranged",
        type: 'info',
        links: [
          {
            text: "Arcuani's Archery Supplies",
            url: 'https://oldschool.runescape.wiki/w/Arcuani%27s_Archery_Supplies',
          },
        ],
      },
      {
        id: 's1-nounlock',
        text: 'DO NOT UNLOCK ANY OTHER REGIONS UNTIL COMPLETING HUNTER',
        type: 'warning',
      },
      {
        id: 's1-h46',
        text: 'Get 46 Hunter for rumours',
        type: 'step',
      },
      {
        id: 's1-h46modal',
        text: 'Click here for lvl 46 hunter guide',
        type: 'info',
        modal: 'hunter-46',
      },
      {
        id: 's1-rumours',
        text: 'Spam hunter rumours',
        type: 'step',
      },
      {
        id: 's1-1',
        text: 'Get 91 Hunter and 74 Fletching — transmute EH logs or use rumour sack logs for quick xp',
        type: 'step',
      },
      {
        id: 's1-hunterinfo',
        text: 'Click here for more info on setting up hunter rumours',
        type: 'info',
        modal: 'hunter-rumours',
      },
      {
        id: 's1-pts3',
        text: 'Get enough points for 3rd relic',
        type: 'step',
      },
      {
        id: 's1-r3',
        text: 'Unlock Bank Heist, Evil Eye, Map of Alacrity',
        type: 'relic',
        relics: ['Bank_Heist.png', 'Evil_Eye.png', 'Map_of_Alacrity.png'],
      },
      {
        id: 's1-mapinfo',
        text: 'Map of Alacrity has convenient teleports for red chins and varlamore tree patch',
        type: 'info',
      },
      {
        id: 's1-pts4',
        text: 'Get enough points for 4th relic',
        type: 'step',
      },
      {
        id: 's1-pts4info',
        text: 'Get 99 hunter and level fletching higher for points if there are tasks',
        type: 'info',
      },
      {
        id: 's1-r4',
        text: 'Unlock Transmutation',
        type: 'relic',
        relics: ['Transmutation.png'],
      },
      {
        id: 's1-transinfo',
        text: "After unlocking use rumour money to buy runes to transmute, e.g. 12k fire runes will take an hour to convert to 12k chaos runes",
        type: 'info',
        links: [
          { text: 'buy runes', url: 'https://oldschool.runescape.wiki/w/Tal_Teklan_Rune_Shop' },
        ],
      },
      {
        id: 's1-2',
        text: 'Get 43 Prayer (6,293 maingame xp) from 28 sunkissed bones — or transmute 28 regular bones to superior then bury',
        type: 'step',
      },
      {
        id: 's1-3',
        text: 'If tier 3+: only need 19 sunkissed + 28 regular bones. Might as well grab ranged & magic prayer too.',
        type: 'info',
      },
      {
        id: 's1-boneinfo',
        text: 'To bury sunkissed bones, break them into shards with a chisel, then sacrifice with blessed wine at the Libation bowl',
        type: 'info',
        links: [
          { text: 'blessed wine', url: 'https://oldschool.runescape.wiki/w/Jug_of_blessed_wine' },
          { text: 'Libation bowl', url: 'https://oldschool.runescape.wiki/w/Libation_bowl' },
        ],
      },
      { id: 's1-p5', text: 'Use the Protect from Melee Prayer', type: 'pact', points: 30 },
      {
        id: 's1-seeds',
        text: 'Setup seeds and saplings for farming, use transmute to obtain desired amount of seeds (and supercompost) below',
        type: 'step',
      },
      {
        id: 's1-4',
        text: 'Plant Teak at the hardwood patch on day 1 — 15hr grow timer, 58,320 xp',
        type: 'warning',
      },
      {
        id: 's1-5',
        text: 'Plant all seeds gathered from Hunter at Varlamore patches — need 65 Farming ASAP',
        type: 'warning',
      },
      {
        id: 's1-6',
        text: 'Enable farming patch notifications and always use supercompost',
        type: 'step',
      },
      {
        id: 's1-7',
        text: 'See the sapling quantity table below — always bring the recommended spares',
        type: 'info',
      },
    ],
    gearUpgrades: [
      {
        id: 's1-g1',
        label: 'Shortbow',
        items: [{ name: 'Shortbow' }],
        howTo: "Buy from Arcuani's Archery Supplies in Varlamore",
      },
      {
        id: 's1-g2',
        label: 'Iron Arrows',
        items: [{ name: 'Iron Arrows' }],
        howTo: "Buy from Arcuani's Archery Supplies in Varlamore",
      },
    ],
    buildLink:
      'https://www.osrsleaguescountdown.io/tree?share=1BQBAAgAAAIAAAAAAAAAAAAA&name=..%20v%20start%20cbow%205p',
    buildLabel: '5p Build',
  },

  // ─── Stage 2: Huey & Karamja ─────────────────────────────────────────────────
  {
    id: 2,
    title: 'Huey & Karamja',
    subtitle: 'Pacts 6–10',
    intro:
      'Unlock Kandarin first for Karamja access. Train Ranged for the Sunlight Hunter Bow, gear up for the kill style of your choice, then clear the Karamja pact tasks.',
    steps: [
      { id: 's2-1', text: 'Train Ranged to 45 (7,700 maingame xp — ~5,200 at relic 3 with 1.5× xp)', type: 'step' },
      { id: 's2-2', text: 'Unlock Kandarin or Kourend and catch grey chins', type: 'step' },
      { id: 's2-3', text: 'Train Ranged to 55 at Harpie Bug Swarms using grey chins', type: 'step' },
      { id: 's2-4', text: 'Train Ranged to 65 at Harpie Bug Swarms using red chins', type: 'step' },
      { id: 's2-p6', text: 'Reach Combat Level 50', type: 'pact', points: 30 },
      { id: 's2-cmb', text: '50 Combat = 65 Ranged + 50 Hitpoints + 46 Prayer', type: 'info' },
      {
        id: 's2-5',
        text: 'Get 63 Crafting via shopping or gem mining in Karamja — transmute to highest gem cuttable',
        type: 'step',
      },
      { id: 's2-6', text: 'Complete the Death on the Isle quest', type: 'step' },
      {
        id: 's2-7',
        text: 'Craft Green Dragonhide set (body, vbrace, legs, shield) after transmuting',
        type: 'step',
      },
      { id: 's2-8', text: 'Craft Snakeskin Boots after transmuting', type: 'step' },
      { id: 's2-9', text: 'Craft a Coif', type: 'step' },
      {
        id: 's2-10',
        text: 'Optional: 70 Crafting for Power Ammy — 63-70 via dragonstones (8x = 336 gems, 12x = 224)',
        type: 'step',
      },
      {
        id: 's2-11',
        text: 'Mage route (3.5 DPS): 70 Magic for Earth Wave, buy Earth Staff from Auburnvale, get Full Mystic if Kandarin is unlocked. Needs ~8hrs of transmutes.',
        type: 'info',
      },
      {
        id: 's2-12',
        text: 'Range route is ~1.3 DPS at Huey with prayer up. Mage is ~3.5 DPS — significantly better if you can afford the transmutes.',
        type: 'info',
      },
      { id: 's2-p1', text: '1 Hueycoatl Kill', type: 'pact', points: 80 },
      { id: 's2-p2', text: 'Defeat a Steel Dragon on Karamja', type: 'pact', points: 30 },
      { id: 's2-p3', text: 'Defeat a TzHaar', type: 'pact', points: 30 },
      {
        id: 's2-p4',
        text: 'Defeat a Demonic Gorilla',
        type: 'pact',
        points: 80,
      },
      {
        id: 's2-p5',
        text: 'Defeat a Mithril Dragon — pray melee, bring good food (hits 18s). Can be done before Huey.',
        type: 'pact',
        points: 80,
      },
    ],
    gearUpgrades: [
      {
        id: 's2-g1',
        label: 'Green Dragonhide Set',
        items: [
          { name: 'Body, Vambraces, Legs, Shield' },
          { name: 'Snakeskin Boots' },
          { name: 'Coif' },
        ],
        howTo: 'Transmute for green dragonhide + snakeskin, then craft at 63 Crafting',
      },
      {
        id: 's2-g2',
        label: 'Power Amulet',
        items: [{ name: 'Power Amulet', note: 'Slight DPS gain' }],
        howTo: '70 Crafting — 63-70 via dragonstones (8x = 336 gems, 12x = 224)',
        optional: true,
      },
      {
        id: 's2-g3',
        label: 'Mage Setup (Alt Route)',
        items: [{ name: 'Earth Staff' }, { name: 'Full Mystic Set' }],
        howTo: 'Buy Earth Staff from Auburnvale shop. Full Mystic if Kandarin is unlocked.',
        optional: true,
      },
    ],
    buildLink:
      'https://www.osrsleaguescountdown.io/tree?share=1BQBAAgAAAMAAAQAAACQAEAA&name=..%20v%20start%20cbow%2010p',
    buildLabel: '10p Build',
  },

  // ─── Stage 3: Kourend ────────────────────────────────────────────────────────
  {
    id: 3,
    title: 'Kourend',
    subtitle: 'Pacts 11–12',
    intro:
      'Unlock Kourend as your second region. Two quick pacts and the max hit keystone unlock. Start preparing Crafting for the gear upgrades ahead.',
    steps: [
      { id: 's3-p1', text: 'Open 1 Grubby Chest', type: 'pact', points: 10 },
      { id: 's3-1', text: 'Assign the Max Hit keystone', type: 'step' },
      { id: 's3-p2', text: '150 Lizardmen Shaman Kills', type: 'pact', points: 30 },
      {
        id: 's3-2',
        text: 'For Shayzien armour: EH barb fish until ~40 Strength — enough to prayer flick through. ~40 min at 15 sec per kill.',
        type: 'info',
      },
      { id: 's3-3', text: 'Train to 71 Crafting for Power Ammy + Blue Dragonhide set', type: 'step' },
      { id: 's3-4', text: 'Plant Hespori seed ASAP — ~6.4 hrs to grow', type: 'step' },
      {
        id: 's3-5',
        text: 'Note: magic W water tree is worse here even with more points — do not invest in it yet.',
        type: 'info',
      },
    ],
    gearUpgrades: [
      {
        id: 's3-g1',
        label: 'Power Ammy + Blue Dragonhide',
        items: [{ name: 'Power Amulet' }, { name: 'Blue Dragonhide Set' }],
        howTo: 'Train to 71 Crafting',
      },
    ],
  },

  // ─── Stage 4: Echo Bosses & Fire Cape ────────────────────────────────────────
  {
    id: 4,
    title: 'Echo Bosses & Fire Cape',
    subtitle: 'Pacts 13–16',
    intro:
      'These 4 pacts are the easiest at this stage. Getting max hit first saves more time than rushing the Fire Cape early. Kill two Echo Bosses to unlock max hit, then clear the TzHaar content.',
    steps: [
      { id: 's4-p1', text: 'Kill 1 unique Echo Boss', type: 'pact', points: 80, isReset: true },
      {
        id: 's4-1',
        text: 'Echo Amoxliatl: normal Amox is ~123 sec at 75 Ranged with blue dhide — boss looks relatively simple',
        type: 'info',
      },
      {
        id: 's4-2',
        text: 'Echo Hespori: bring chins, food and prayers. Much easier with a mage build on 3t staff.',
        type: 'info',
      },
      {
        id: 's4-3',
        text: 'Echo Thermonuclear Smoke Devil: doable but requires 90+ Slayer — unlikely at this stage',
        type: 'info',
      },
      { id: 's4-p2', text: 'Kill 2 unique Echo Bosses', type: 'pact', points: 80, isReset: true },
      {
        id: 's4-4',
        text: 'Killing one Echo Boss makes the next easier — max hit unlocks after the second kill',
        type: 'info',
      },
      { id: 's4-p3', text: 'Equip a Fire Cape', type: 'pact', points: 200 },
      { id: 's4-p4', text: "Complete Tzhaar-Ket-Rek's third challenge", type: 'pact', points: 80 },
    ],
    gearUpgrades: [],
    buildLink:
      'https://www.osrsleaguescountdown.io/tree?share=1BQBAAgAAAMAAAQAACGQAMAs&name=..%20v%20start%20cbow%2016p',
    buildLabel: '16p Build',
  },

  // ─── Stage 5: Prifddinas ─────────────────────────────────────────────────────
  {
    id: 5,
    title: 'Prifddinas',
    subtitle: 'Pacts 17–18',
    intro:
      'Unlock Prifddinas as your third region. You should have your t6 relic and third region around the same time — likely the relic first. Respec into magic once Slayer is done.',
    steps: [
      { id: 's5-1', text: 'Respec into magic once Slayer grind is done', type: 'step' },
      { id: 's5-p1', text: 'Kill a Black Dragon in Tirannwn', type: 'pact', points: 30 },
      { id: 's5-p2', text: 'Complete the Corrupted Gauntlet', type: 'pact', points: 80 },
      { id: 's5-2', text: 'Stock up on Ranarrs + Snapegrass for prayer sustain going forward', type: 'step' },
      { id: 's5-3', text: 'Transmute + cook raw fish for best HP food', type: 'step' },
      {
        id: 's5-4',
        text: 'Train to 70 Smithing for Zalcano — ore transmute or iron ore works (61.5k maingame xp at 12x)',
        type: 'step',
      },
      { id: 's5-5', text: 'Complete Scrambled Eggs quest for 5k Smithing xp', type: 'step' },
      {
        id: 's5-6',
        text: 'Plan for 89 Crafting for Zenyte jewelry — requires 70 Smithing + Crafting when training in Priff',
        type: 'info',
      },
    ],
    gearUpgrades: [],
  },

  // ─── Stage 6: Slayer & Equipment Push ────────────────────────────────────────
  {
    id: 6,
    title: 'Slayer & Equipment Push',
    subtitle: 'Pacts 19–25',
    intro:
      'A big Slayer grind to push through 7 pacts. Slayer tasks + Zalcano will bring you to roughly 25-26 pacts. Prioritise 95 Slayer for Hydras above everything else.',
    steps: [
      { id: 's6-1', text: 'Get 95 Slayer for Hydras — this is top priority', type: 'warning' },
      {
        id: 's6-2',
        text: 'Farm Antler Guard from Slayer tasks — massive offhand upgrade, do not skip',
        type: 'step',
      },
      { id: 's6-p1', text: 'Defeat Zalcano', type: 'pact', points: 80 },
      { id: 's6-p2', text: 'Equip a Dark Bow in Tirannwn', type: 'pact', points: 80 },
      { id: 's6-p3', text: '1 Skotizo Kill', type: 'pact', points: 80 },
      { id: 's6-p4', text: 'Defeat the Kraken Boss 50 Times', type: 'pact', points: 80 },
      { id: 's6-p5', text: 'Equip a Trident of the Seas', type: 'pact', points: 80 },
      { id: 's6-p6', text: 'Equip an Abyssal Tentacle', type: 'pact', points: 200 },
      { id: 's6-p7', text: 'Equip an Occult Necklace', type: 'pact', points: 200 },
      {
        id: 's6-3',
        text: 'If you end up at only 25 pacts, drop echo throw from the build',
        type: 'info',
      },
    ],
    gearUpgrades: [
      {
        id: 's6-g1',
        label: 'Antler Guard',
        items: [{ name: 'Antler Guard', note: 'Massive offhand upgrade' }],
        howTo: 'Farm from Slayer tasks — prioritise this',
      },
    ],
    buildLink:
      'https://www.osrsleaguescountdown.io/tree?share=1BQDAAgAAAMCAAQAGLG8AMA8&name=..%20v%20start%20cbow%2026p',
    buildLabel: '26p Build',
  },

  // ─── Stage 7: Echo Thermy ────────────────────────────────────────────────────
  {
    id: 7,
    title: 'Echo Thermy',
    subtitle: 'Pact 26',
    intro:
      'Respec to kill the Echo Thermonuclear Smoke Devil on task. After this kill you will have 26 pacts and be set up for the final equipment push.',
    steps: [
      { id: 's7-1', text: 'Respec the build for Echo Thermonuclear Smoke Devil', type: 'step' },
      { id: 's7-2', text: 'Kill Echo Thermy on Slayer task — do not forget prayers!', type: 'step' },
      { id: 's7-p1', text: 'Kill 3 unique Echo Bosses', type: 'pact', points: 80, isReset: true },
    ],
    gearUpgrades: [],
    buildLink:
      'https://www.osrsleaguescountdown.io/tree?share=1yxgAD2MDANARBAIAAIAAAAA&name=.!%20Air%20Prayer%2025p',
    buildLabel: '25p Build (Echo Thermy)',
    dpsLinks: [
      { label: 'Echo Thermy DPS Setup', url: 'https://dps.osrs.wiki/?id=SpinachCoconutEssence' },
    ],
  },

  // ─── Stage 8: Final Equipment Push ───────────────────────────────────────────
  {
    id: 8,
    title: 'Final Equipment Push',
    subtitle: 'Pacts 27–31',
    intro:
      'Push to 32 pacts to unlock the melee tree. Echo Hunlleff is the key source of upgrade materials — get the armour seed and thieve to 99 Crafting/Smithing for Zenyte.',
    steps: [
      { id: 's8-p1', text: 'Craft a Toxic Blowpipe', type: 'pact', points: 200 },
      {
        id: 's8-p2',
        text: 'Use a prayer altar to restore 90 prayer in Prifddinas',
        type: 'pact',
        points: 200,
      },
      { id: 's8-1', text: 'Do Echo Hunlleff — take the trident node', type: 'step' },
      { id: 's8-p3', text: 'Equip a Corrupted Weapon', type: 'pact', points: 400 },
      {
        id: 's8-p4',
        text: 'Kill 4 unique Echo Bosses',
        type: 'pact',
        points: 200,
        isReset: true,
      },
      { id: 's8-2', text: 'Get an armour seed from Echo Hunlleff if possible', type: 'step' },
      { id: 's8-3', text: 'Thieve until 99 Crafting and Smithing', type: 'step' },
      {
        id: 's8-p5',
        text: 'Equip Some Zenyte Jewelry',
        type: 'pact',
        points: 200,
      },
    ],
    gearUpgrades: [
      {
        id: 's8-g1',
        label: 'Zenyte Jewelry',
        items: [{ name: 'Zenyte Jewelry', note: 'Partial hybrid melee build is enough' }],
        howTo: 'Get armour seed from Echo Hunlleff, then thieve to 99 Crafting/Smithing',
      },
    ],
    buildLink:
      'https://www.osrsleaguescountdown.io/tree?share=1y5gID2MDEdIRBEIAAIAAAAA&name=.!%20Air%20Prayer%2031p',
    buildLabel: '31p Build',
  },

  // ─── Stage 9: End Game ───────────────────────────────────────────────────────
  {
    id: 9,
    title: 'End Game',
    subtitle: 'Pacts 32–40',
    intro:
      'The final push. Work through Fortis Colosseum, Chambers of Xeric, and the Inferno to complete all 40 pacts and finalise the build.',
    steps: [
      { id: 's9-1', text: 'Train melee skills — roughly 18x xp rate so not too bad', type: 'step' },
      { id: 's9-2', text: 'Farm Perilous Moons for the Sol melee loadout', type: 'step' },
      { id: 's9-p1', text: 'Complete Wave 12 of Fortis Colosseum', type: 'pact', points: 200 },
      { id: 's9-3', text: 'Take an accuracy node after Colosseum', type: 'step' },
      {
        id: 's9-4',
        text: 'Need 4 more pacts for water spell healing (reaching 36). Spam clue scrolls and get 2 zenytes — upgrades count a lot here.',
        type: 'info',
      },
      {
        id: 's9-5',
        text: 'T8 relic is great around now — take water upgrades once unlocked',
        type: 'info',
      },
      {
        id: 's9-p2',
        text: '25 Chambers of Xeric Completions',
        type: 'pact',
        points: 80,
      },
      {
        id: 's9-6',
        text: 'Do normals until Augury drops — Preserve is also a great upgrade',
        type: 'info',
      },
      { id: 's9-p3', text: 'Equip any Ancestral Piece', type: 'pact', points: 200 },
      { id: 's9-p4', text: 'Equip a Dragon Hunter Lance', type: 'pact', points: 200 },
      {
        id: 's9-p5',
        text: 'Equip Avernic Treads — 100% stay for Conflicts',
        type: 'pact',
        points: 200,
      },
      { id: 's9-7', text: 'Do CoX until Ancestral top or bottom drops', type: 'step' },
      { id: 's9-8', text: 'Farm Sol for prayer + kill Echo Hunlleff', type: 'step' },
      { id: 's9-p6', text: 'Defeat Awakened Vardorvis', type: 'pact', points: 200 },
      { id: 's9-9', text: 'Do Inferno — take another minor accuracy node', type: 'step' },
      { id: 's9-p7', text: 'Equip an Infernal Cape', type: 'pact', points: 400 },
      {
        id: 's9-p8',
        text: "Complete Tzhaar-Ket-Rek's Special challenge — pre-pot if possible with water healing",
        type: 'pact',
        points: 400,
      },
      { id: 's9-10', text: 'Take final minor accuracy node', type: 'step' },
      {
        id: 's9-p9',
        text: 'Equip a piece of Radiant Oathplate — farm the contracts; may not be as hard as it seems',
        type: 'pact',
        points: 200,
      },
      { id: 's9-11', text: 'Take +1% magic damage node to finish the tree', type: 'step' },
      { id: 's9-12', text: 'Farm Devout Boots', type: 'step' },
      { id: 's9-13', text: 'Farm Ancestral Body', type: 'step' },
      { id: 's9-14', text: 'Get Ardougne Cloak 4 if not already obtained', type: 'step' },
    ],
    gearUpgrades: [
      {
        id: 's9-g1',
        label: 'Sol Loadout (Melee)',
        items: [{ name: 'Perilous Moons gear', note: 'Train melees first — ~18x xp rate' }],
        howTo: 'Farm Perilous Moons before Colosseum attempt',
        links: [
          { label: 'DPS Reference', url: 'https://dps.osrs.wiki/?id=SanguineGourdCake' },
          { label: 'Pre-Colosseum Setup', url: 'https://dps.osrs.wiki/?id=BlacksmithsSilverBetrayal' },
        ],
      },
      {
        id: 's9-g2',
        label: 'Ancestral Piece (CoX)',
        items: [{ name: 'Ancestral Top or Bottom', note: 'Either piece works for the pact' }],
        howTo: 'Farm Chambers of Xeric — do normals until Augury, then stay for Ancestral',
        links: [
          { label: 'Melee Setup', url: 'https://dps.osrs.wiki/?id=GarmentsDressingPulley' },
          { label: 'Mage Setup', url: 'https://dps.osrs.wiki/?id=SteamPineFenkenstrain' },
        ],
      },
      {
        id: 's9-g3',
        label: 'Final Build Polish',
        items: [
          { name: 'Devout Boots' },
          { name: 'Ancestral Body' },
          { name: 'Ardougne Cloak 4' },
        ],
        howTo: 'Farm/complete after Inferno — build is done!',
        links: [{ label: 'Final Build DPS', url: 'https://dps.osrs.wiki/?id=VolumeMailImcandorias' }],
      },
    ],
    buildLink:
      'https://www.osrsleaguescountdown.io/tree?share=1y7kYD2MHE9IxDEYAAIABAAA&name=.!%20Air%20Prayer%2040p',
    buildLabel: 'Final 40p Build',
  },
];

export const TOTAL_PACTS = stages.flatMap((s) => s.steps.filter((st) => st.type === 'pact')).length;
