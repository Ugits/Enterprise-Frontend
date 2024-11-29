"use client";

import UserCredentials from "../_components/UserCredentials";
import DeleteUser from "../_components/DeleteUser";
import BackButton from "../_components/BackButton";

const page = () => {
  const role = sessionStorage.getItem("role");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {role?.match("ADMIN") ? (
        <div>
          <div className="p-4">
            <UserCredentials />
          </div>
          <div className="p-4">
            <DeleteUser />
          </div>
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
