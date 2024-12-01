import "./SpellCard.css"; // Importing CSS for styling
import { SpellDescription } from "../_types/ISpell";

interface SpellCardProps {
  imageSrc: string; // Path to the spell image
  name: string; // Name of the spell
  level: number; // Level of the spell
  type: string; // Type of the spell
  description: SpellDescription[]; // Array of SpellDescription objects
  flavorText?: string; // Optional flavor text
}

const SpellCard = (props: SpellCardProps) => {
  return (
    <div className="spell-card">
      <div className="spell-card-inner-border">
        <div className="spell-header">
          <h2 className="spell-name">{props.name}</h2>
          <span className="spell-level">Level {props.level}</span>
        </div>

        <img
          src={props.imageSrc}
          alt={`${props.name} spell`}
          className="spell-image"
        />

        <div className="spell-type">{props.type}</div>

        <div className="spell-description">
          {props.description.map((desc: SpellDescription) => (
            <p key={desc.id}>{desc.description}</p> // Render each description using its id as the key
          ))}
        </div>

        {props.flavorText && (
          <div className="spell-flavor-text">
            <em>{props.flavorText}</em>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpellCard;
