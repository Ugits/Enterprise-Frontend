"use client";

import { useState } from "react";
import SignupForm from "./_components/SignupForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showSignupForm, setShowSignupForm] = useState<boolean>(false);
  const router = useRouter();

  const handleToggleSignupForm = () => {
    setShowSignupForm((prev) => !prev);
  };

  const handleSignupSuccess = () => {
    setShowSignupForm(false);
  };

  return (
    <main className="flex flex-col items-center justify-center pt-20 ">
      <div className="text-center text-shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to 5eSpells</h1>
        <p className="text-base text-gray-700 mb-4">
          Please log in to access your account details.
        </p>
        </div>
        <div className="p-5">

        {/* Create New Account Button */}
        <button
          onClick={handleToggleSignupForm}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded text-shadow-lg"
          >
          {showSignupForm ? "Hide Signup Form" : "Create New Account"}
        </button>
          
      </div>
      <div>
        {/* Signup Form */}
        {showSignupForm && (
          <div className="mt-6 w-full max-w-md">
            <SignupForm onSignupSuccess={handleSignupSuccess} />
          </div>
        )}
      </div>
    </main>
  );
}
