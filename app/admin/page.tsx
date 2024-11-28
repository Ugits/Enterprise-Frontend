"use client"
import React, { useEffect } from "react";
import UserCredentials from "../_components/UserCredentials";
import DeleteUser from "../_components/DeleteUser";
import { useRouter } from "next/navigation";
import BackButton from "../_components/BackButton";

const page = () => {
  const role = sessionStorage.getItem("role");

  // useEffect(() => {
  //      !role?.match("ADMIN") && router.push("/error/no-permission")
  // }, [])

  return (
    <main>
      {role?.match("ADMIN") ? (
        <div>
          <UserCredentials />
          <DeleteUser />
        </div>
      ) : (
        <div>
          <p>No Permission</p>
          <BackButton />
        </div>
      )}
    </main>
  );
};

export default page;
