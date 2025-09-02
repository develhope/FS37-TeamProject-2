import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Button } from "../../Components/Button";

// Dati fittizi dei servizi disponibili
const serviziDisponibili = [
  {
    id: 1,
    nome: "Analisi del sangue",
    tipologia: "Diagnostica",
    detraibilita: true,
    icona: "/src/assets/Icons/cuida--sample-container-outline.svg"
  },
  {
    id: 2,
    nome: "Visita cardiologica",
    tipologia: "Visita Specialistica",
    detraibilita: false,
    icona: "/src/assets/Icons/cuida--stethoscope-outline.svg"
  },
  {
    id: 3,
    nome: "Ecografia addome completo",
    tipologia: "Diagnostica",
    detraibilita: true,
    icona: "/src/assets/Icons/cuida--clipboard-text-outline.svg"
  }
];

function Prenotazioni() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [selezionati, setSelezionati] = useState([]);

  const toggleServizio = (servizio) => {
    const already = selezionati.find(s => s.id === servizio.id);
    if (already) {
      setSelezionati(prev => prev.filter(s => s.id !== servizio.id));
    } else {
      setSelezionati(prev => [...prev, servizio]);
    }
  };

  const confermaPrenotazioni = () => {
    const utenti = JSON.parse(localStorage.getItem("users")) || [];
    const index = utenti.findIndex(u => u.email === user.email);
    if (index !== -1) {
      utenti[index].serviziPrenotati = selezionati;
      localStorage.setItem("users", JSON.stringify(utenti));
      setUser(utenti[index]);
      navigate("/dashboard");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#006450]">Prenota un Servizio</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {serviziDisponibili.map(servizio => {
          const isSelected = selezionati.find(s => s.id === servizio.id);
          return (
            <div
              key={servizio.id}
              className={`p-4 rounded-xl border shadow-md flex flex-col space-y-2 ${
                isSelected ? "bg-green-50 border-green-400" : "bg-white"
              }`}
              onClick={() => toggleServizio(servizio)}
            >
              <p><strong>{servizio.nome}</strong></p>
              <p><strong>Tipologia:</strong> {servizio.tipologia}</p>
              <p><strong>Detraibile:</strong> {servizio.detraibilita ? "Sì" : "No"}</p>
              <p className="text-sm text-gray-500 italic">
                {isSelected ? "Selezionato" : "Clicca per selezionare"}
              </p>
            </div>
          );
        })}
      </div>

      {selezionati.length > 0 && (
        <div className="mt-6">
          <Button label="primary" operazione={confermaPrenotazioni}>
            Conferma prenotazione
          </Button>
        </div>
      )}
    </div>
  );
}

export default Prenotazioni;
