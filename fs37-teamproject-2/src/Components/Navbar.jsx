// src/Components/Navbar.jsx
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Button } from "./Button";

const TABS = [
  { to: "/dashboard", label: "Dashboard", isLink: true },
  { to: "/servizi/asl-piu-vicina", label: "ASL più vicina" },
  { to: "/servizi/medico-base", label: "Medico di base" },
  { to: "/servizi/documentazione", label: "Documenti" },
  { to: "/servizi/prenotazioni", label: "Prenotazioni" },
];

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <nav className="flex-grow" aria-label="Sottosezioni bacheca">
        <ul className="grid grid-cols-2 gap-4">
          {TABS.map(({ to, label, isLink }) => {
            const base =
              "w-full flex justify-center whitespace-nowrap text-sm sm:text-base rounded-xl border px-3.5 py-2 transition-colors focus:outline-none";
            const focusRing = { boxShadow: "0 0 0 2px #00645033" };


            return (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    base + (isActive ? " font-semibold" : "")
                  }
                  style={({ isActive }) => ({
                    borderColor: isActive ? "#006450" : "#F5F5DC",
                    color: isActive ? "#006450" : "#1F2937",
                  })}
                >
                  {label}
                </NavLink>
              </li>
            );
          })}
          <li>
    <Button className="w-32 h-10" label="navbarButton" operazione={handleLogout}>
        Logout
      </Button>
          </li>
        </ul>
    
      </nav>

   
    </div>
  );
}
