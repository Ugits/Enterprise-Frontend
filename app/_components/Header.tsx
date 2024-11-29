"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initial check
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    // Event listener for 'authChange' event
    const handleAuthChange = () => {
      const token = sessionStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("authChange", handleAuthChange);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogin = () => {
    router.push("/sign-in"); // Redirect to login page
  };

  return (
    <header className="bg-slate-900 text-gray-100 shadow-md">
      <div className="container mx-auto flex items-center py-4 px-6">
        {/* Left Spacer */}
        <div className="w-1/3"></div>

        {/* Title Centered */}
        <div className="w-1/3 flex justify-center">
          <h1 className="text-2xl font-bold">5eSpells</h1>
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
