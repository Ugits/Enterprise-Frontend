"use client";

import React from "react";
import UserCredentials from "../../_components/UserCredentials";
import SpellTable from "../../_components/SpellTable";

const Dashboard = () => {
  return (
    <main className="min-h-screen flex flex-row">
      <div className="w-1/4 h-[20%] border-r-2 min-h-screen bg-black">
        <div className="p-6 border-b-2">
          <UserCredentials />
        </div>
        <div className="p-6 min-h-full flex flex-col items-center justify-center">
          <h5>SEARCH AND FILTER</h5>
        </div>
      </div>
      <div className="w-3/4 flex flex-col items-center bg-slate-800">
        <SpellTable />
      </div>
    </main>
  );
};

export default Dashboard;
