"use client";

import React, { createContext, useContext } from "react";
import { createSpellStore, State } from "./Store";
import { useStore as useZustandStore } from "zustand";

interface StoreProviderProps {
  children: React.ReactNode;
  initialSpellList: State["spellList"];
}

const StoreContext = createContext<ReturnType<typeof createSpellStore> | null>(
  null
);

export const StoreProvider: React.FC<StoreProviderProps> = ({
  children,
  initialSpellList,
}) => {
  const store = React.useMemo(
    () => createSpellStore(initialSpellList),
    [initialSpellList]
  );

  console.log("StoreProvider initialized with spellList:", initialSpellList);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export function useStore<T>(
  selector: (state: State) => T,
  equalityFn?: (a: T, b: T) => boolean
): T {
  const store = useContext(StoreContext);
  if (!store) {
    console.error("useStore called outside StoreProvider"); // Debug log
    throw new Error("useStore must be used within a StoreProvider");
  }

  const value = useZustandStore(store, selector, equalityFn);
  return value;
}
