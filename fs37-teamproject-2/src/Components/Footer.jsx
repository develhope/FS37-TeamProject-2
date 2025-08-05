import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "../assets/Logo/Logo-app.png";

const Footer = () => {
  return (
    <footer
      id="contatti"
      className="bg-[#1F2937] text-white py-12 font-poppins"
    >
      <div className="container mx-auto px-4 ">
        {/* Griglia per mobile (colonna singola di default) e desktop (3 colonne) */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img src={Logo} alt="Logo MiCurApp" className="h-10 w-auto" />
              <span className="text-xl font-bold">MiCurApp</span>
            </div>
            <p className="text-gray-300">
              La tua salute, sempre a portata di tap.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#FFFDD0]">Contatti</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Phone size={16} className="text-[#006450]" />
                <span className="text-gray-300">+39 02 1234567</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail size={16} className="text-[#006450]" />
                <span className="text-gray-300">micurapp@gmail.com</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin size={16} className="text-[#006450]" />
                <span className="text-gray-300">Develhope, Italia</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#FFFDD0]">Link Utili</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-[#FFFDD0] transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFFDD0] transition">
                  Termini di Servizio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFFDD0] transition">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFFDD0] transition">
                  Supporto
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 MiCurApp. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;