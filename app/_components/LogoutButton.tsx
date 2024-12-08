import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();

    const event = new Event("authChange");
    window.dispatchEvent(event);

    router.push("/");
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-orange-700 rounded hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-600 text-shadow-lg"
      >
        Logout
      </button>
    </div>
  );
};
export default LogoutButton