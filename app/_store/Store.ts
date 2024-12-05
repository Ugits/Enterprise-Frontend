"use client";

import { createStore } from "zustand/vanilla";
import { ISpell } from "../_types/ISpell";

export interface State {
  spellList: ISpell[];
  setSpellList: (spellList: ISpell[]) => void;
}

export const createSpellStore = (initialSpellList: ISpell[]) =>
  createStore<State>((set) => ({
    spellList: initialSpellList,
    setSpellList: (spellList) => set({ spellList }),
  }));
