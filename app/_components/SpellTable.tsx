"use client";

import SpellCard from "./SpellCard";
import { ISpell } from "../_types/ISpell";
import { useStore } from "../_store/StoreContext";



const SpellTable = () => {
  const spellList = useStore((state) => state.spellList);

  if (!spellList || spellList.length === 0) {
    return <div>No spells available.</div>;
  }

  return (
    <div className="">
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {spellList.map((spell: ISpell) => (
          <div
          className="
          -my-6
          -mx-3
          hover:shadow-2xl scale-75 transform hover:scale-105 transition duration-500"
          >
            <SpellCard
              key={spell.index}
              imageSrc={`spell-images/${spell.index}.jpg`}
              name={spell.name}
              description={spell.description}
              level={spell.level}
              type={"type"}
              flavorText={"flavor text"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpellTable;
