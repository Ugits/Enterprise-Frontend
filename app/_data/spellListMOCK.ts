import { ISpell } from "../_types/ISpell";

export const spellListMOCK: ISpell[] = [
  {
    index: "fireball",
    name: "Fireball",
    classes: [
      {
        id: 1,
        index: "wizard",
        name: "Wizard",
      },
      {
        id: 2,
        index: "sorcerer",
        name: "Sorcerer",
      },
    ],
    description: [
      {
        id: 1,

        description:
          "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame.",
      },
      {
        id: 2,
        description:
          "Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one.",
      },
    ],
    level: 3,
    range: "150 feet",
    ritual: false,
    duration: "Instantaneous",
    concentration: false,
    casting_time: "1 action",
  },
  {
    index: "mage-hand",
    name: "Mage Hand",
    classes: [
      {
        id: 1,
        index: "wizard",
        name: "Wizard",
      },
      {
        id: 2,
        index: "sorcerer",
        name: "Sorcerer",
      },
      {
        id: 3,
        index: "bard",
        name: "Bard",
      },
      {
        id: 4,
        index: "warlock",
        name: "Warlock",
      },
      {
        id: 5,
        index: "cleric",
        name: "Cleric",
      },
    ],
    description: [
      {
        id: 1,
        description:
          "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action.",
      },
      {
        id: 2,
        description:
          "The hand is invisible and can perform simple tasks such as lifting, carrying, manipulating objects, opening unlocked doors or containers, stowing or retrieving items from open containers, or pouring the contents out of a vial.",
      },
    ],
    level: 0,
    range: "30 feet",
    ritual: false,
    duration: "1 minute",
    concentration: false,
    casting_time: "1 action",
  },
  {
    index: "detect-magic",
    name: "Detect Magic",
    classes: [
      {
        id: 1,
        index: "bard",
        name: "Bard",
      },
      {
        id: 2,
        index: "cleric",
        name: "Cleric",
      },
      {
        id: 3,
        index: "druid",
        name: "Druid",
      },
      {
        id: 4,
        index: "paladin",
        name: "Paladin",
      },
      {
        id: 5,
        index: "ranger",
        name: "Ranger",
      },
      {
        id: 6,
        index: "sorcerer",
        name: "Sorcerer",
      },
      {
        id: 7,
        index: "warlock",
        name: "Warlock",
      },
      {
        id: 8,
        index: "wizard",
        name: "Wizard",
      },
    ],
    description: [
      {
        id: 1,
        description:
          "For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any.",
      },
    ],
    level: 1,
    range: "Self",
    ritual: true,
    duration: "10 minutes",
    concentration: true,
    casting_time: "1 ritual",
  },
];
