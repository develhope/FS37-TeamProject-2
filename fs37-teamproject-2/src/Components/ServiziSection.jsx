import React from "react";
import { Heart, Clock, Shield, Users } from "lucide-react";
import Card from "./Card";

const ServiziSection = () => {
  const servizi = [
    {
      id: 1,
      icona: <Heart className="w-12 h-12 text-[#006450]" />,
      titolo: "Consulti Online",
      descrizione:
        "Parla con medici qualificati direttamente dal tuo smartphone",
    },
    {
      id: 2,
      icona: <Clock className="w-12 h-12 text-[#006450]" />,
      titolo: "Prenotazioni 24/7",
      descrizione:
        "Prenota visite ed esami in qualsiasi momento della giornata",
    },
    {
      id: 3,
      icona: <Shield className="w-12 h-12 text-[#006450]" />,
      titolo: "Cartella Clinica",
      descrizione: "Tutti i tuoi documenti medici sempre a portata di mano",
    },
    {
      id: 4,
      icona: <Users className="w-12 h-12 text-[#006450]" />,
      titolo: "Rete di Specialisti",
      descrizione:
        "Accedi a una vasta rete di professionisti sanitari verificati",
    },
  ];

  return (
    <section id="servizi" className="py-20 bg-[#F5F5DC] font-poppins">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#006450] mb-4 [text-shadow:0_1px_2px_rgba(0,100,80,.35)]">
            I Nostri Servizi
          </h2>
          <p className="text-lg text-[#1F2937] max-w-4xl mx-auto leading-relaxed">
            Vogliamo offrire un'applicazione mobile intuitiva, sicura e
            trasparente che consenta a ogni persona di gestire in autonomia
            prenotazioni, documenti medici e informazioni sanitarie, ovunque e
            in qualsiasi momento. Crediamo in una sanità digitale più vicina,
            efficiente e inclusiva, che riduce le distanze e migliora la qualità
            della vita attraverso la tecnologia.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servizi.map((servizio) => (
            <div
              key={servizio.id}
              className="hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform"
            >
              <Card 
                title={
                  <>
                    <div className="mb-4 flex justify-center">{servizio.icona}</div>
                    {servizio.titolo}
                  </>
                }
                linkText="Scopri di più"
              >
                {servizio.descrizione}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiziSection;