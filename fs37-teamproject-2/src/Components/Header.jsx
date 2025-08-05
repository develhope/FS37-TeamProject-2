import React, { useState, useEffect } from "react";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { Button } from "./Button";
import Logo from "../assets/Logo/Logo-app.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

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
    <>
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 font-poppins ${
          scrolled
            ? "bg-[#FFFFF0] shadow-lg"
            : "bg-[#FFFFF0]/95 backdrop-blur-sm"
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
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </nav>
        </div>
      </header>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-[#FFFFF0] z-[100] flex flex-col justify-center items-center">
          {/* Logo e bottone di chiusura */}
          <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4 py-4">
            <div className="flex items-center gap-1">
              <img src={Logo} alt="Logo MiCurApp" className="h-10 w-auto" />
              <span className="text-xl font-bold text-[#006450]">MiCurApp</span>
            </div>
            <button
              className="text-[#006450]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 flex-grow">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-3xl font-semibold text-[#1F2937] hover:text-[#006450] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            {/* Bottoni di login e registrazione */}
            <div className="mt-8 pt-6 w-full flex flex-col items-center gap-4">
              <button className="flex items-center justify-center cursor-pointer gap-2 px-1 py-3 text-[#006450] border-2 border-[#006450] rounded-full w-3/4 max-w-sm hover:bg-[#F5F5DC] transition">
                <LogIn size={25} />
                <span className="text-xl font-semibold">Accedi</span>
              </button>
              <button className="flex items-center justify-center cursor-pointer gap-2 px-20 py-3 text-[#FFFFF0] border-2 bg-[#006450] rounded-full w-3/4 max-w-sm hover:bg-[#004d3e] transition">
                <UserPlus size={25} />
                <span className="text-xl font-semibold">Registrati</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
