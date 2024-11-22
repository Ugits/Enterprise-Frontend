"use client";

import { useEffect, useState } from "react";

interface IFullUser {
  username: string;
  password: string;
}

export default function Home() {
  const [user, setUser] = useState<IFullUser | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {

        const response = await fetch("http://localhost:8080/user/test", {
          headers: {
            Authorization: 'Bearer token-goes-here',
          },
          credentials: 'include', // Add this line if needed
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data: IFullUser = await response.json();
        setUser(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <main>
      <div>
        <p>Credentials</p>
        {error && <p>Error: {error}</p>}
        {user === null ? (
          <p>Här va det tomt</p>
        ) : (
          <>
            <p>Username: {user.username}</p>
            <p>Password: {user.password}</p>
            {/* Display other user details as needed */}
          </>
        )}
      </div>
    </main>
  );
}
