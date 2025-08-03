import React from "react";
import { Download } from "lucide-react";

const DownloadSection = () => {
  return (
    <section
      id="download"
      className="py-20 bg-gradient-to-r from-[#006450] to-green-700 font-poppins"
    >
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <Download className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Scarica l'App</h2>
          <p className="text-xl mb-8 opacity-90">
            Disponibile gratuitamente su iOS e Android
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="inline-block">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Scarica dall' App Store"
                className="h-14 hover:opacity-90 transition"
              />
            </a>
            <a href="#" className="inline-block">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Scarica da Google Play"
                className="h-14 hover:opacity-90 transition"
              />
            </a>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 max-w-2xl mx-auto">
            <p className="text-sm opacity-75 italic">
              * Questa è un'app in fase di sviluppo. Non siamo affiliati o
              finanziati da Apple Inc. o Google LLC. I loghi App Store e Google
              Play sono marchi registrati dei rispettivi proprietari e sono
              utilizzati solo a scopo dimostrativo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;