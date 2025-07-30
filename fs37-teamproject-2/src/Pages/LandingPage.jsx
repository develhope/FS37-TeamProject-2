import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Menu, X, Phone, Mail, MapPin, Download, Shield, Clock, Users, Heart, LogIn, UserPlus } from 'lucide-react';
import Logo from '../assets/Logo/Logo-app.png';

// Componente principale Landing Page
const LandingPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Gestione scroll per navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dati servizi - facilmente estendibili
  const servizi = [
    {
      id: 1,
      icona: <Heart className="w-12 h-12 text-[#006450]" />,
      titolo: "Consulti Online",
      descrizione: "Parla con medici qualificati direttamente dal tuo smartphone"
    },
    {
      id: 2,
      icona: <Clock className="w-12 h-12 text-[#006450]" />,
      titolo: "Prenotazioni 24/7",
      descrizione: "Prenota visite ed esami in qualsiasi momento della giornata"
    },
    {
      id: 3,
      icona: <Shield className="w-12 h-12 text-[#006450]" />,
      titolo: "Cartella Clinica",
      descrizione: "Tutti i tuoi documenti medici sempre a portata di mano"
    },
    {
      id: 4,
      icona: <Users className="w-12 h-12 text-[#006450]" />,
      titolo: "Rete di Specialisti",
      descrizione: "Accedi a una vasta rete di professionisti sanitari verificati"
    }
  ];

  // Dati FAQ - facilmente modificabili
  const faqData = [
    {
      id: 1,
      domanda: "Come posso prenotare una visita?",
      risposta: "Puoi prenotare facilmente attraverso l'app selezionando il medico, la data e l'orario desiderato. Riceverai una conferma immediata."
    },
    {
      id: 2,
      domanda: "I miei dati sono al sicuro?",
      risposta: "Assolutamente sì. Utilizziamo crittografia end-to-end e rispettiamo tutti gli standard GDPR per la protezione dei dati sanitari."
    },
    {
      id: 3,
      domanda: "Posso utilizzare l'app con il mio medico di base?",
      risposta: "Certamente! Puoi invitare il tuo medico di base a unirsi alla piattaforma o utilizzare l'app con i medici già registrati."
    },
    {
      id: 4,
      domanda: "Quali sono i costi del servizio?",
      risposta: "L'app è gratuita da scaricare. I costi delle consulenze variano in base al professionista scelto e sono sempre visibili prima della prenotazione."
    }
  ];

  // Handler per FAQ
  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  // Componente Header/Navbar
  const Header = () => (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 font-poppins ${
      scrolled ? 'bg-[#FFFFF0] shadow-lg' : 'bg-[#FFFFF0]/95 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          {/* Logo e Nome App */}
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="Logo MiCurApp" className="h-10 w-auto" />
            <span className="text-xl font-bold text-[#006450]">MiCurApp</span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-[#1F2937] hover:text-[#006450] transition font-medium">Home</a>
            <a href="#servizi" className="text-[#1F2937] hover:text-[#006450] transition font-medium">Servizi</a>
            <a href="#download" className="text-[#1F2937] hover:text-[#006450] transition font-medium">Download</a>
            <a href="#faq" className="text-[#1F2937] hover:text-[#006450] transition font-medium">FAQ</a>
            <a href="#contatti" className="text-[#1F2937] hover:text-[#006450] transition font-medium">Contatti</a>
            
            {/* Bottoni Login/Registrazione */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#006450] text-[#006450] rounded hover:bg-[#E6F5F1] transition">
                <LogIn size={18} />
                <span>Accedi</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#006450] text-white rounded hover:bg-green-700 transition">
                <UserPlus size={18} />
                <span>Registrati</span>
              </button>
            </div>
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
            <div className="flex flex-col py-4 space-y-3">
              <a href="#home" className="px-4 py-2 text-[#1F2937] hover:bg-[#F5F5DC]">Home</a>
              <a href="#servizi" className="px-4 py-2 text-[#1F2937] hover:bg-[#F5F5DC]">Servizi</a>
              <a href="#download" className="px-4 py-2 text-[#1F2937] hover:bg-[#F5F5DC]">Download</a>
              <a href="#faq" className="px-4 py-2 text-[#1F2937] hover:bg-[#F5F5DC]">FAQ</a>
              <a href="#contatti" className="px-4 py-2 text-[#1F2937] hover:bg-[#F5F5DC]">Contatti</a>
              <div className="border-t border-[#F5F5DC] mt-2 pt-2">
                <button className="flex items-center gap-2 px-4 py-2 text-[#006450] hover:bg-[#F5F5DC] w-full text-left">
                  <LogIn size={18} />
                  <span>Accedi</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-[#006450] hover:bg-[#F5F5DC] w-full text-left">
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

  // Componente Hero Section
const HeroSection = () => (
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
        MiCurApp nasce con l'obiettivo di semplificare l'accesso ai servizi sanitari pubblici, mettendo al centro il cittadino.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-[#006450] text-white px-8 py-4 rounded hover:bg-green-700 transition transform hover:scale-105 flex items-center justify-center gap-2 font-semibold">
          <UserPlus size={20} />
          Registrati Ora
        </button>
        <button className="bg-transparent border border-[#006450] text-[#006450] px-8 py-4 rounded hover:bg-[#E6F5F1] transition flex items-center justify-center gap-2 font-semibold">
          <LogIn size={20} />
          Accedi
        </button>
      </div>
    </div>
  </section>
);



  // Componente Servizi
  const ServiziSection = () => (
    <section id="servizi" className="py-20 bg-[#F5F5DC] font-poppins">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#006450] mb-4 [text-shadow:0_1px_2px_rgba(0,100,80,.35)]">I Nostri Servizi</h2>
          <p className="text-lg text-[#1F2937] max-w-4xl mx-auto leading-relaxed">
            Vogliamo offrire un'applicazione mobile intuitiva, sicura e trasparente che consenta a ogni persona di gestire in autonomia prenotazioni, documenti medici e informazioni sanitarie, ovunque e in qualsiasi momento.
            Crediamo in una sanità digitale più vicina, efficiente e inclusiva, che riduce le distanze e migliora la qualità della vita attraverso la tecnologia.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servizi.map((servizio) => (
            <div 
              key={servizio.id} 
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform"
            >
              <div className="mb-4">{servizio.icona}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#1F2937]">{servizio.titolo}</h3>
              <p className="text-[#1F2937] text-center">
                {servizio.descrizione}
              </p>
              <a className="mt-4 text-[#006450] font-medium hover:underline inline-block">
                Scopri di più
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Componente Download
  const DownloadSection = () => (
    <section id="download" className="py-20 bg-gradient-to-r from-[#006450] to-green-700 font-poppins">
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
              * Questa è un'app in fase di sviluppo. 
              Non siamo affiliati o finanziati da Apple Inc. o Google LLC. 
              I loghi App Store e Google Play sono marchi registrati dei rispettivi proprietari 
              e sono utilizzati solo a scopo dimostrativo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  // Componente FAQ
  const FAQSection = () => (
    <section id="faq" className="py-20 bg-[#FFFFF0] font-poppins">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#006450] mb-4 [text-shadow:0_1px_2px_rgba(0,100,80,.35)]">Domande Frequenti</h2>
          <p className="text-xl text-[#1F2937]">Trova le risposte alle domande più comuni</p>
        </div>
        <div className="space-y-4">
          {faqData.map((faq) => (
            <div key={faq.id} className="border border-[#1F2937] rounded-lg overflow-hidden bg-white">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#F5F5DC] transition"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span className="font-semibold text-[#1F2937]">{faq.domanda}</span>
                {openFAQ === faq.id ? 
                  <ChevronUp className="text-[#006450]" /> : 
                  <ChevronDown className="text-[#006450]" />
                }
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 py-4 bg-[#FFFDD0]">
                  <p className="text-[#1F2937] leading-relaxed">{faq.risposta}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Componente Footer
  const Footer = () => (
    <footer id="contatti" className="bg-[#1F2937] text-white py-12 font-poppins">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
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
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-[#006450]" />
                <span className="text-gray-300">+39 02 1234567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#006450]" />
                <span className="text-gray-300">micurapp@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#006450]" />
                <span className="text-gray-300">Develhope, Italia</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-[#FFFDD0]">Link Utili</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-[#FFFDD0] transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FFFDD0] transition">Termini di Servizio</a></li>
              <li><a href="#" className="hover:text-[#FFFDD0] transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-[#FFFDD0] transition">Supporto</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 MiCurApp. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );

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