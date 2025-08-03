import React from "react";
import { UserPlus, LogIn } from "lucide-react";
import { Button } from "./Button";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFFF0] to-[#FFFDD0] font-poppins"
    >
      <div className="w-full max-w-3xl px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-6">
          Sanità digitale,
          <span className="text-[#006450]"> cura reale.</span>
        </h1>
        <p className="text-xl text-[#1F2937] mb-8 leading-relaxed">
          MiCurApp nasce con l'obiettivo di semplificare l'accesso ai servizi
          sanitari pubblici, mettendo al centro il cittadino.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            label="primary" 
            className="cursor-pointer px-8 py-4 transform hover:scale-105 font-semibold"
          >
            <UserPlus size={20} />
            Registrati Ora
          </Button>
          <Button 
            label="tertiary" 
            className="cursor-pointer px-8 py-4 hover:scale-105 font-semibold"
          >
            <LogIn size={20} />
            Accedi
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;