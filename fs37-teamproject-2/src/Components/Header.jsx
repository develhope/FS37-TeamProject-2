import React, { useState, useEffect } from "react";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { Button } from "./Button";
import Logo from "../assets/Logo/Logo-app.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { href: "#home", label: "Home" },
    { href: "#servizi", label: "Servizi" },
    { href: "#download", label: "Download" },
    { href: "#faq", label: "FAQ" },
    { href: "#contatti", label: "Contatti" },
  ];

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 font-poppins ${
        scrolled ? "bg-[#FFFFF0] shadow-lg" : "bg-[#FFFFF0]/95 backdrop-blur-sm"
      }`}
    >
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo e Nome App */}
          <div className="flex items-center gap-1 min-w-0 max-w-full overflow-hidden">
            <img
              src={Logo}
              alt="Logo MiCurApp"
              className="h-10 w-auto shrink-0"
            />
            <span className="text-xl font-bold text-[#006450] whitespace-nowrap overflow-hidden text-ellipsis">
              MiCurApp
            </span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex flex-grow justify-center">
            <div className="flex items-center gap-6">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[#1F2937] hover:text-[#006450] transition font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Bottoni Login/Registrazione */}
          <div className="hidden md:flex items-center gap-2">
            <Button label="tertiary" className="cursor-pointer">
              <LogIn size={18} />
              <span>Accedi</span>
            </Button>
            <Button label="primary" className="cursor-pointer">
              <UserPlus size={18} />
              <span>Registrati</span>
            </Button>
          </div>

          {/* Menu Mobile Toggle */}
          <button
            className="md:hidden text-[#006450]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFFFF0] border-t border-[#F5F5DC]">
            <div className="flex flex-col items-center py-4 space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-[#1F2937] hover:bg-[#F5F5DC]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-[#F5F5DC] mt-2 pt-2">
                <button className="flex items-center cursor-pointer gap-2 px-4 py-2 text-[#006450] hover:bg-[#F5F5DC] w-full text-left">
                  <LogIn size={18} />
                  <span>Accedi</span>
                </button>
                <button className="flex items-center cursor-pointer gap-2 px-4 py-2 text-[#006450] hover:bg-[#F5F5DC] w-full text-left">
                  <UserPlus size={18} />
                  <span>Registrati</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;