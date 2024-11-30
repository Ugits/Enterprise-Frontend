import { SpellDescription } from "./ISpellDescription";

export interface Spell {
  index: string;
  name: string;
  description: SpellDescription[];
  level: number;
  range: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
}

