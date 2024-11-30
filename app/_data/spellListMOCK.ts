import { Spell } from "../_types/ISpell"; // Adjust the import path as necessary

export const spellList: Spell[] = [
  {
    index: "fireball",
    name: "Fireball",
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
    level: 0, // Cantrips are often represented as level 0
    range: "30 feet",
    ritual: false,
    duration: "1 minute",
    concentration: false,
    casting_time: "1 action",
  },
  {
    index: "detect-magic",
    name: "Detect Magic",
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