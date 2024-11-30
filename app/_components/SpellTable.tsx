import SpellCard from "./SpellCard";
import { spellList } from "../_data/spellListMOCK";


const SpellList = () => {
    //const { spellList } = useSpellStore();
  
    return (
      <div>
        <div
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {spellList.map((spell) => (
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