import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar";


export default function LayoutServizi() {
  return (
    <div className="min-h-screen w-full">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1
          className="text-2xl sm:text-3xl text-[#006450] font-bold mb-5"
        >
          La mia bacheca
        </h1>
    <Navbar/>

        {/* Contenuto */}
        <div
          className="rounded-2xl shadow-sm border"
          style={{
            borderColor: "#F5F5DC",
            backgroundColor: "#FFFFFF",
            color: "#1F2937",
          }}
        >
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
