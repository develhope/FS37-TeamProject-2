import React from 'react';
import { Menu } from 'lucide-react';
import Logo from '../assets/Logo/Logo-app.png';

// import.meta.glob() è una funzione di Vite che importa in blocco tutti i file che corrispondono a un pattern (glob).'/src/assets/Icons/*.svg': prendi tutti i file .svg in quella cartella.
// eager: true: carica subito (in modo sincrono) i file invece di restituire funzioni async.
// import: 'default': di ogni modulo importa solo l’export di default.


const modules = import.meta.glob('/src/assets/Icons/*.svg', {
  eager: true,
  import: 'default', // ottieni l'URL finale
});

// Quindi modules diventa un oggetto che contiene tutti i percorsi dei file in icons come elementi. Da lì Object.values(modules) per iterare e mostrare le icone con <img src={url} />

const icons = Object.values(modules);

const DesignSystemPage = () => {
  return (
    <div className="p-8 space-y-16 font-poppins bg-gray-50">

      {/* Header Title + Logo */}
      <header className="flex items-center gap-4 mb-12 justify-center">
        <img src={Logo} alt="Logo MiCurApp" className="h-16 w-auto" />
        <h1 className="text-4xl font-bold text-[#006450]">Design system MiCurApp</h1>
      </header>


      {/* Color Palette */}
      <section id="colors">
        <h2 className="text-3xl font-bold mb-4 pb-4 [text-shadow:0_1px_2px_rgba(0,100,80,.35)]">Palette dei colori</h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="h-24 bg-[#FFFFF0] flex flex-col items-center justify-center rounded">
            Avorio<br/>
            <span className="text-sm mt-2">#FFFFF0</span>
          </div>
          <div className="h-24 bg-[#FFFDD0] flex flex-col items-center justify-center rounded">
            Crema Chiaro<br/>
            <span className="text-sm mt-2">#FFFDD0</span>
          </div>
          <div className="h-24 bg-[#F5F5DC] flex flex-col items-center justify-center rounded">
            Beige<br/>
            <span className="text-sm mt-2">#F5F5DC</span>
          </div>
          <div className="h-24 bg-white flex flex-col items-center justify-center rounded border">
            Bianco<br/>
            <span className="text-sm mt-2">#FFFFFF</span>
          </div>
          <div className="h-24 bg-gray-900 flex flex-col items-center justify-center rounded">
            <span className="text-white font-medium">Nero Testo</span>
            <span className="text-sm mt-2 text-white">#1F2937</span>
          </div>
          <div className="h-24 bg-[#006450] flex flex-col items-center justify-center rounded col-span-5 mt-4 text-white">
            Verde Brand<br/>
            <span className="text-sm mt-2">#006450</span>
          </div>
        </div>
      </section>

      {/* Typography */}
      
      <section id="typography">
        <div className='flex flex-col justify-center gap-2'>
      <h2 className="text-3xl font-bold mb-4 pb-2 [text-shadow:0_1px_2px_rgba(0,100,80,.35)]">Tipografia</h2>
      <p className="text-xl font-semibold">FONT: Poppins-Sans Serif</p>
        <h1 className="text-4xl font-bold">Titolo pagina</h1>
        <h2 className="text-3xl font-semibold">Titolo sezione</h2>
        <h3 className="text-2xl font-medium">Titolo sottosezione</h3>
        <p className="text-base leading-relaxed">
          Ciao, sono un paragrafo
        </p>
      </div>
      </section>



      {/* Buttons */}
      <section id="buttons">
        <h2 className="text-3xl font-bold mb-4 pb-4 [text-shadow:0_1px_2px_rgba(0,100,80,.35)]">Bottoni</h2>
        <div className="flex items-center justify-center space-x-4">
          <button className="bg-[#006450] text-white px-4 py-2 rounded hover:bg-green-700">
            Primario
          </button>
          <button className="bg-[#FFFDD0] text-[#006450] px-4 py-2 rounded hover:bg-[#F5F1E6]">
            Secondario
          </button>
          <button className="bg-transparent border border-[#006450] text-[#006450] px-4 py-2 rounded hover:bg-[#E6F5F1]">
            Terziario
          </button>
          <button className="bg-[#006450] text-white px-4 py-2 rounded opacity-50 cursor-not-allowed" disabled>
            Disabilitato
          </button>
        </div>
      </section>

      {/* Inputs */}
      <section id="inputs">
        <h2 className="text-3xl font-bold mb-4 pb-4 [text-shadow:0_1px_2px_rgba(0,100,80,.35)]">Campi input</h2>
        <div className="flex items-center justify-center space-x-4">
          <input
            className="w-full border border-[#1F2937]-300 rounded px-3 py-2 focus:border-[#006450] hover:border-[#006450]"
            placeholder="Normale"
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            placeholder="Disabilitato"
            disabled
          />
          <input
            className="w-full border border-red-500 rounded px-3 py-2 focus:border-[#006450]"
            placeholder="Errore"
          />
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 hover:border-[#006450]"
            placeholder="Hover"
          />
        </div>
      </section>

      {/* Cards */}
      <section id="cards">
        <h2 className="text-3xl font-bold mb-4 pb-4 [text-shadow:0_1px_2px_rgba(0,100,80,.35)]">Cards</h2>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col justify-center bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Titolo Card {item}</h3>
              <p className="text-center w-full max-w-xs mx-auto">
                Qui trovi tutti i tuoi appuntamenti, le prescrizioni e i risultati delle analisi.
              </p>
              <a className="mt-4 text-[#006450] font-medium hover:underline">
                Scopri di più
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Icons */}
      <section id="icons">
        <h2 className="text-3xl font-bold mb-4 pb-4 [text-shadow:0_1px_2px_rgba(0,100,80,.35)]">Icone</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 place-items-center ">
          <Menu size={24} color="#006450" />
          {icons.map((src, i) => (
    <img key={i} src={src} alt="icone" className="w-8 h-8 " />
  ))}
        </div>
      </section>
    </div>
  );
};

export default DesignSystemPage;
