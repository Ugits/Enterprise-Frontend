"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/app/_types/IUser";
import { IAuthResponse } from "../_types/IAuthResponse";
import { BASE_URL } from "@/variable.env";

export default function LoginForm() {
  const [user, setUser] = useState<IUser>({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  function handleUserChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!user.username || !user.password) {
      setError("Both username and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    const timeout: number = 10_000;
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        setLoading(false);

        if (!response.ok) {
          return response.json().then((errData) => {
            setError("Invalid username or password.");
            throw new Error(errData.message);
          });
        }
        
        return response.json();
      })
      .then((data: IAuthResponse) => {
        const { token, role } = data;

        if (!token) {
          setError("No token received from server.");
          return;
        }

        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("role", role);

        role.match("USER") && router.push("/dashboard");
        role.match("ADMIN") && router.push("/admin");

        const event = new Event("authChange");
        window.dispatchEvent(event);
      })
      .catch((error) => {
        console.log(error);
        if (error.name === "AbortError") {
          setError("Request timed out. Please try again. ABORT");
        } else {
          setError(error.message || "An error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm text-shadow-lg">
      <div className="flex flex-col space-y-4">
        {/* Username */}
        <div>
          <label htmlFor="username" className="block mb-2 text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleUserChange}
            placeholder="Enter your username"
            aria-label="Username"
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-sky-950"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-2 text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleUserChange}
            placeholder="Enter your password"
            aria-label="Password"
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-sky-950"
          />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 mt-6">
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-shadow-lg"
              : "bg-blue-500 hover:bg-blue-600 text-white text-shadow-lg"
          }`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </form>
  );
}
