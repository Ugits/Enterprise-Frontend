"use client";

import React, { useState, useRef, useEffect } from "react";
import UserCredentials from "../../_components/UserCredentials";
import SpellTable from "../../_components/SpellTable";
import BackButton from "@/app/_components/BackButton";
import SearchBTN, { SearchBTNHandle } from "@/app/_components/SearchBTN";

interface DashboardProps {
  spellNames: string[];
}

const Dashboard = ({ spellNames }: DashboardProps) => {
  const [inputSpellName, setInputSpellName] = useState<string>("");
  const [filteredSpellNames, setFilteredSpellNames] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const token = sessionStorage.getItem("accessToken")
  const searchBtnRef = useRef<SearchBTNHandle>(null);

  useEffect(() => {
    if (inputSpellName) {
      const filtered = spellNames.filter((name) =>
        name.toLowerCase().startsWith(inputSpellName.toLowerCase())
      );
      setFilteredSpellNames(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestionIndex(-1);
    } else {
      setFilteredSpellNames([]);
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  }, [inputSpellName, spellNames]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setInputSpellName(suggestion);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
    
    if (searchBtnRef.current) {
      searchBtnRef.current.fetchSpellData(suggestion);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex < filteredSpellNames.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (e.key === "Enter") {
        if (
          activeSuggestionIndex >= 0 &&
          activeSuggestionIndex < filteredSpellNames.length
        ) {
          e.preventDefault();
          const selectedSpell = filteredSpellNames[activeSuggestionIndex];
          setInputSpellName(selectedSpell);
          setShowSuggestions(false);
          setActiveSuggestionIndex(-1);

          if (searchBtnRef.current) {
            searchBtnRef.current.fetchSpellData(selectedSpell);
          }
        } else {
          e.preventDefault();
          if (searchBtnRef.current) {
            searchBtnRef.current.fetchSpellData();
          }
        }
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    }
  };

  return (
    <main>
      {token ? (
        <div className="min-h-screen flex flex-row">
          {/* Sidebar */}
          <div className="w-1/4 border-r-2 border-gray-500 bg-slate-900 flex flex-col">
            <div className="bg-slate-950 p-6 border-b-2 border-gray-500">
              <UserCredentials />
            </div>
            <div className="p-6 flex flex-col items-center justify-center relative">
              {/* Spell Search Input */}
              <div className="w-full relative">
                <input
                  type="text"
                  value={inputSpellName}
                  onChange={(e) => setInputSpellName(e.target.value)}
                  placeholder="Enter spell name"
                  className="w-full px-4 py-2 border text-slate-900 rounded-md border-green-900 bg-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ref={inputRef}
                  onKeyDown={handleKeyDown}
                />
                {/* Suggestions Dropdown */}
                {showSuggestions && (
                  <ul
                    ref={suggestionsRef}
                    className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto"
                  >
                    {filteredSpellNames.map((suggestion, index) => (
                      <li
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`px-4 py-2 cursor-pointer text-slate-900 ${
                          index === activeSuggestionIndex
                            ? "bg-blue-500 text-white"
                            : "hover:bg-blue-100"
                        }`}
                      >
                        {suggestion}
                      </li>
                    ))}
                    {filteredSpellNames.length === 0 && (
                      <li className="px-4 py-2 text-gray-500">
                        No results found
                      </li>
                    )}
                  </ul>
                )}
              </div>
              {/* Search Button */}
              <SearchBTN spellName={inputSpellName} ref={searchBtnRef} />
              <h4 className="mt-10 text-white">FILTER</h4>
              <h6 className="text-gray-400">Coming soon</h6>
            </div>
          </div>
          {/* Main Content */}
          <div className="w-3/4 flex flex-col items-center bg-slate-800 border-t-2 border-gray-500 p-4">
            <SpellTable />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center p-10">
          <div>
            <p className="mb-4">No Permission</p>
            <BackButton />
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
