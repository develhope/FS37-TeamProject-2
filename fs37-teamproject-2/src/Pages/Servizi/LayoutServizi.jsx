import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";

const TABS = [
  { to: "/dashboard", label: "Dashboard", isLink: true },
  { to: "asl-piu-vicina", label: "ASL più vicina" },
  { to: "medico-base", label: "Medico di base" },
  { to: "documentazione", label: "Documenti" },
  { to: "prenotazioni", label: "Prenotazioni" },
];

export default function LayoutServizi() {
  return (
    <div className="min-h-screen w-full">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1
          className="text-2xl sm:text-3xl font-bold mb-5"
          style={{ color: "#006450" }}
        >
          La mia bacheca
        </h1>

        <nav className="mb-6" aria-label="Sottosezioni bacheca">
          <ul className="flex flex-wrap gap-6">
            {TABS.map(({ to, label, isLink }) => {
              const base =
                "whitespace-nowrap text-sm sm:text-base rounded-xl border px-3.5 py-2 transition-colors focus:outline-none";
              const focusRing = { boxShadow: "0 0 0 2px #00645033" };

              if (isLink) {
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      className={base}
                      style={{
                        borderColor: "#F5F5DC",
                        backgroundColor: "#FFFFFF",
                        color: "#1F2937",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.boxShadow = focusRing.boxShadow)
                      }
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#FFFDD0")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#FFFFFF")
                      }
                    >
                      {label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      base + (isActive ? " font-semibold" : "")
                    }
                    style={({ isActive }) => ({
                      borderColor: isActive ? "#006450" : "#F5F5DC",
                      backgroundColor: isActive ? "#FFFDD0" : "#FFFFFF",
                      color: isActive ? "#006450" : "#1F2937",
                    })}
                  >
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

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
