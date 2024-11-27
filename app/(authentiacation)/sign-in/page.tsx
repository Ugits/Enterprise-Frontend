"use client";

import { IUser } from "@/app/_types/IUser";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface authResponse {
  token: string;
  role: string;
}

export default function SignIn() {
  const [user, setUser] = useState<IUser>({ username: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  function handleUserChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!user.username || !user.password) {
      setError("Both username and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    // Init
    const timeout: number = 10_000;
    const controller = new AbortController();
    const signal = controller.signal;

    // Set up the timeout
    const timeoutId = setTimeout(() => {
      controller.abort(); // Abort the fetch request
    }, timeout);

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      //credentials: "include",
      signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        setLoading(false);

        if (response.ok) {
          console.log("Login successful");
          return response.json();
        } else {
          return response.json().then((errData) => {
            setError("Invalid username or password.");
            throw new Error(errData.message || "Invalid username or password");
          });
        }
      })
      .then((data: authResponse) => {
        const token = data.token;
        const role = data.role;

        console.log(token);
        console.log(role);

        if (!token) {
          setError("No token recieved from server.");
          return;
        }
        sessionStorage.setItem("accessToken", token);

        switch (role) {
            case "USER":
              router.push("/user");
              break;
            case "ADMIN":
              router.push("/admin");
              break;
            default:
              console.error(`Unexpected role: ${role}`);
              router.push("/");
          }
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          setError("Request timed out. Please try again.");
        } else {
          setError("An error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className="flex flex-col items-center min-h-screen">
      <header className="flex flex-row text-3xl p-10">Sign In</header>
      <form onSubmit={onSubmit} className="w-full max-w-sm">
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
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}
