import React from "react";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import ServiziSection from "../Components/ServiziSection";
import DownloadSection from "../Components/DownloadSection";
import FAQSection from "../Components/FAQSection";
import Footer from "../Components/Footer";



const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#FFFFF0] font-poppins">
      <Header />
      <HeroSection />
      <ServiziSection />
      <DownloadSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default LandingPage;