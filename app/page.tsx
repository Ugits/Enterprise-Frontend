"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const redirectLogin = () => {
    router.push("/sign-in");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-4xl font-bold mb-6">Welcome to the Home Page</h1>
    <p className="text-lg text-gray-700 mb-4">Please log in to access your account details.</p>
    <button
      onClick={redirectLogin}
      className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Go to Login
    </button>
  </main>
  );
}
