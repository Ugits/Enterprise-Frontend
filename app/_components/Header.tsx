"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
   
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    const handleAuthChange = () => {
      const token = sessionStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleTitleOnClick = () => {
    router.push("/")
  }

  const handleLogin = () => {
    router.push("/sign-in");
  };

  return (
    <header className="bg-slate-900 text-gray-100 shadow-2xl">
      <div className="container mx-auto flex items-center py-4 px-6">
        {/* Left Spacer */}
        <div className="w-1/3"></div>

        {/* Title Centered */}
        <div className="w-1/3 flex justify-center">
          <h1 
          className="text-4xl font-bold m-4 cursor-pointer hover:text-slate-600 text-shadow-lg"
          onClick={handleTitleOnClick}
          
          >
            5eSpells
            </h1>
        </div>

        {/* Buttons on the Right */}
        <div className="w-1/3 flex justify-end space-x-4">
          {isLoggedIn ? (
            <div>
                <LogoutButton />
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-shadow-lg"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
