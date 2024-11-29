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
        className="text-sm px-4 py-2 bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        Logout
      </button>
    </div>
  );
};
export default LogoutButton