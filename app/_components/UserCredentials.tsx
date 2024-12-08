"use client";
import { BASE_URL } from "@/variable.env";
import { useEffect, useState } from "react";

interface IUserCredentials {
  username: string;
  password: string;
  role: string;
}

export default function UserCredentials() {
  const [user, setUser] = useState<IUserCredentials | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState("border-orange-700");



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

    fetch(`${BASE_URL}/user/credentials`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    })
      .then(async (response) => {
        clearTimeout(timeoutId);
    
        const text = await response.text();
        if (!response.ok) {
          let errorMessage = "An error occurred";
          if (text) {
            try {
              const errData = JSON.parse(text);
              errorMessage = errData.message || errorMessage;
            } catch (e) {
              errorMessage = text;
            }
          }
          throw new Error(errorMessage);
        }
    
        if (!text) {
          throw new Error("No data received from server.");
        }
    
        let data: IUserCredentials;
        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error("Failed to parse response from server.");
        }
        return data;
      })
      .then((data: IUserCredentials) => {
        setUser(data);
    
        data.username.match("Robel") && setBorderColor("border-teal-600")
        
        data.role.match("ADMIN") && setBorderColor("border-yellow-300")
        
        data.username.match("Tove") && setBorderColor("border-violet-500")
        data.username.match("Aldina") && setBorderColor("border-rose-400")
        


      })
      .catch((err) => {
        if (err.name === "AbortError") {
          setError("Request timed out. Please try again.");
        } else {
          setError(err.message || "An error occurred while fetching user details");
        }
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      
      {/* Credentials Card */}
      <div className={`bg-slate-900 shadow-xl rounded-lg p-6 w-full max-w-md border-2 ${borderColor} text-shadow-lg`}>
        <p className="font-bold text-2xl mb-4 text-center text-gray-400">
          User Credentials
        </p>

        {/* Loading State */}
        {loading && (
          <p className="text-gray-400 font-medium text-center">
            Loading user details...
          </p>
        )}

        {/* Error State */}
        {error && (
          <p className="text-red-500 font-medium text-center">Error: {error}</p>
        )}

        {/* User Details */}
        {user === null ? (
          <p className="text-gray-400 text-center">null</p>
        ) : (
          <div className="mt-4 space-y-3">
            <div className="flex items-center">
              <span className="font-medium text-gray-400">Role:</span>
              <span className="text-s text-gray-500 truncate max-w-[80%] p-4">
                {user.role}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-400">Username:</span>
              <span className="text-s text-gray-500 p-4">{user.username}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-400">Password:</span>
              <span className="text-s text-gray-500 truncate max-w-[80%] p-4">
                {user.password}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
