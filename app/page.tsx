"use client";

import { useEffect, useState } from "react";

interface IUserCredentials {
  username: string;
  password: string;
}

export default function Home() {
  const [user, setUser] = useState<IUserCredentials | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    
    if (!token) {
      setError("No access token found. Please log in.");
      return;
    }

    setLoading(true);
    setError("");

    const timeout: number = 10_000;
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => controller.abort(), timeout);


    fetch("http://localhost:8080/user/test", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Add this line if needed
      signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);

        if (!response.ok) {
          return response.json().then((errData) => {
            throw new Error(errData.message || "Failed to fetch user details");
          });
        }
        return response.json();
      })
      .then((data: IUserCredentials) => {
        setUser(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          setError("Request timed out. Please try again.");
        } else {
          setError(
            err.message || "An error occurred while fetching user details"
          );
        }
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <div>
        <p className="font-bold text-xl">User Credentials</p>
        {loading && <p>Loading user details...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {user === null ? (
          <p>Här va det tomt</p>
        ) : (
          <>
            <p>Username: {user.username}</p>
            <p>Password: {user.password}</p>
            {/* Add other user details here */}
          </>
        )}
      </div>
    </main>
  );
}
