import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";

export default function LayoutServizi() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-[#006450]">La mia bacheca</h1>

      {/* Navigazione (facoltativa) tra le sotto-pagine */}
      <nav className="mb-4 flex flex-wrap gap-3 text-xl">
        <Link className="underline" to= "/dashboard">Dashboard</Link>
        <NavLink to="asl-piu-vicina" className={({isActive}) => isActive ? "underline text-emerald-700" : "underline"}>
          ASL più vicina
        </NavLink>
        <NavLink to="medico-base" className={({isActive}) => isActive ? "underline text-emerald-700" : "underline"}>
          Cambia medico di base
        </NavLink>
        <NavLink to="documentazione" className={({isActive}) => isActive ? "underline text-emerald-700" : "underline"}>
          Documentazione
        </NavLink>
        <NavLink to="prenotazioni" className={({isActive}) => isActive ? "underline text-emerald-700" : "underline"}>
          Prenotazioni
        </NavLink>
      </nav>

      
      <div className="min-h-[300px]">
        <Outlet />
      </div>
    </div>
  );
}
