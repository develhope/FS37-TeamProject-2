import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      id: 1,
      domanda: "Come posso prenotare una visita?",
      risposta:
        "Puoi prenotare facilmente attraverso l'app selezionando il medico, la data e l'orario desiderato. Riceverai una conferma immediata.",
    },
    {
      id: 2,
      domanda: "I miei dati sono al sicuro?",
      risposta:
        "Assolutamente sì. Utilizziamo crittografia end-to-end e rispettiamo tutti gli standard GDPR per la protezione dei dati sanitari.",
    },
    {
      id: 3,
      domanda: "Posso utilizzare l'app con il mio medico di base?",
      risposta:
        "Certamente! Puoi invitare il tuo medico di base a unirsi alla piattaforma o utilizzare l'app con i medici già registrati.",
    },
    {
      id: 4,
      domanda: "Quali sono i costi del servizio?",
      risposta:
        "L'app è gratuita da scaricare. I costi delle consulenze variano in base al professionista scelto e sono sempre visibili prima della prenotazione.",
    },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-[#FFFFF0] font-poppins">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#006450] mb-4 [text-shadow:0_1px_2px_rgba(0,100,80,.35)]">
            Domande Frequenti
          </h2>
          <p className="text-xl text-[#1F2937]">
            Trova le risposte alle domande più comuni
          </p>
        </div>
        <div className="space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="border border-[#1F2937] rounded-lg overflow-hidden bg-white"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#F5F5DC] transition"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span className="font-semibold text-[#1F2937]">
                  {faq.domanda}
                </span>
                {openFAQ === faq.id ? (
                  <ChevronUp className="text-[#006450]" />
                ) : (
                  <ChevronDown className="text-[#006450]" />
                )}
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 py-4 bg-[#FFFDD0]">
                  <p className="text-[#1F2937] leading-relaxed">
                    {faq.risposta}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;