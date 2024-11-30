"use client";

import { useState } from "react";

export default function DeleteUser() {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = () => {
    if (!username) {
      setError("Please enter a username.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const token = sessionStorage.getItem("accessToken");

    if (!token) {
      setError("You are not authorized. Please log in.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/admin/delete-user?username=${encodeURIComponent(username)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw new Error(errData.message);
          });
        }
        setSuccess(`User '${username}' was successfully deleted.`);
        setUsername("");
      })
      .catch((err) => {
        setError(err.message || "An error occurred while deleting the user.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="bg-slate-900 shadow-xl rounded-lg p-6 w-full max-w-md border-2 border-yellow-300 text-shadow-lg">
        <p className="font-bold text-2xl mb-4 text-center text-gray-400">
          Delete User
        </p>

        {/* Input Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-gray-400">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username to delete"
            className="w-full px-3 py-2 text-gray-900 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Feedback */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={loading}
          className={`w-full px-4 py-2 mt-4 text-white rounded ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-400"
          }`}
        >
          {loading ? "Deleting..." : "Delete User"}
        </button>
      </div>
    </div>
  );
}
