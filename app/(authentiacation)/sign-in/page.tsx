"use client";

import LoginForm from "../../_components/LoginForm"

export default function SignIn() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <header className="flex flex-row text-3xl p-10">Sign In</header>
      <LoginForm />
    </div>
  );
}