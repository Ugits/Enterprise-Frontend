"use client";

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import SpellCard from "./SpellCard"; // Adjust the path as needed
import { ISpell } from "../_types/ISpell";

interface SearchProps {
  spellName: string;
}

export interface SearchBTNHandle {
  fetchSpellData: (name?: string) => void;
}

const SearchBTN = forwardRef<SearchBTNHandle, SearchProps>(
  ({ spellName }, ref) => {
    const [spellData, setSpellData] = useState<ISpell | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const fetchSpellData = (name: string = spellName) => {
      if (!name.trim()) {
        setError("Please enter a spell name.");
        setIsOverlayVisible(true);
        return;
      }

      setLoading(true);
      setError(null);

      fetch(`http://localhost:8443/spells/${encodeURIComponent(name)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Spell not found");
          }
          return response.json();
        })
        .then((data: ISpell) => {
          setSpellData(data);
          setLoading(false);
          setIsOverlayVisible(true);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
          setIsOverlayVisible(true);
        });
    };

    const handleCloseOverlay = () => {
      setIsOverlayVisible(false);
      setSpellData(null);
      setError(null);
    };

    useImperativeHandle(ref, () => ({
      fetchSpellData,
    }));

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOverlayVisible) {
          handleCloseOverlay();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOverlayVisible]);

    return (
      <>
        <button
          onClick={() => fetchSpellData()}
          className="px-4 py-2 m-4 bg-slate-800 text-white rounded hover:bg-slate-600 transition duration-300 text-shadow-lg"
        >
          Search Spell
        </button>

        {isOverlayVisible && (
          <div
            onClick={handleCloseOverlay}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="
                shadow-2xl transform scale-150
                flex flex-row justify-center items-center rounded-3xl p-1 h-[50vh] overflow-visible 
              "
            >
              {loading && <p className="text-center">Loading...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}
              {spellData && (
                <div className="flex flex-row">
                  <SpellCard
                    imageSrc={`spell-images/${spellData.index}.jpg`}
                    name={spellData.name}
                    description={spellData.description}
                    level={spellData.level}
                    type={"type"}
                    flavorText={"flavorText"}
                  />
                  <div>
                    <button
                      onClick={handleCloseOverlay}
                      className="flex justify-start ml-2 text-gray-400 hover:text-gray-700"
                    >
                      &#10005;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
);

SearchBTN.displayName = "SearchBTN";

export default SearchBTN;
