"use client";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();

  return (
    <div>
      <button 
      onClick={router.back} 
      className="px-4 py-2 bg-emerald-900 hover:bg-emerald-700 rounded">
        Go Back
      </button>
    </div>
  );
};

export default BackButton;
