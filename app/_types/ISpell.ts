export interface ISpell {
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

export interface SpellDescription {
  id: number;
  description: string;
}
