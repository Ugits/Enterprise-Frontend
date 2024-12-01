import SpellCard from "./SpellCard";
import {ISpell} from "../_types/ISpell"
import { spellListMOCK } from "../_data/spellListMOCK";
import { useState } from "react";


const SpellList = () => {
    //const { spellList } = useSpellStore();
    const [spellList, setSpelllist] = useState<ISpell[]>(null)


    return (
      <div className="p-6">
        <div
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {spellListMOCK.map((spell: ISpell) => (
            <SpellCard
              key={spell.index}
              imageSrc={`spell-images/${spell.index}.jpg`}
              name={spell.name}
              description={spell.description}
              level={spell.level}
              type={"type"}
              flavorText={"flavor text"}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default SpellList;