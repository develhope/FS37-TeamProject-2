import React from "react";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import ServiziSection from "../Components/ServiziSection";
import DownloadSection from "../Components/DownloadSection";
import FAQSection from "../Components/FAQSection";
import Footer from "../Components/Footer";
import MediciImg from "../assets/Immagini/MediciImg.png";




const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#FFFFF0] font-poppins">
      <Header />
      <HeroSection />
       <div className="w-full flex justify-center my-8 px-4">
        <img
          src={MediciImg}
          alt="Personale medico"
          className="max-w-4xl w-full rounded-xl shadow-md"
        />
      </div>
      <ServiziSection />
      <DownloadSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default LandingPage;