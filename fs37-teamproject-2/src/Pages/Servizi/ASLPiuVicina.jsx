import { useState, useEffect } from "react";
import { Button } from "../../Components/Button";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function ASLPiuVicina() {
  // Stato per la lista delle ASL e l'ASL selezionata
  const [centri, setCentri] = useState([]);
  const [selectedASL, setSelectedASL] = useState(null);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // Effettua la chiamata API per ottenere i centri al caricamento del componente
  useEffect(() => {
    async function fetchCentri() {
      try {
        const response = await fetch("http://localhost:3000/asl");
        const data = await response.json();
        setCentri(data);
      } catch (error) {
        console.error("Errore nel recupero dei centri", error);
      }
    }
    fetchCentri();
  }, []);

  // Funzione per selezionare la ASL
  const handleSelectASL = async (asl) => {
    try {
      const result = await fetch(
        `http://localhost:3000/utenti/${user.id}/asl`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ asl: asl.id }),
        }
      );

      if (result.ok) {
        const data = await result.json();
        setUser(data.user); // <-- aggiorna contesto
        navigate("/dashboard"); // <-- redirect
      } else {
        console.error("Errore nell'aggiornamento dell' ASL");
      }
    } catch (error) {
      console.error("Errore durante la selezione dell' ASL:", error);
    }
  };

    return (
  <div className="p-8">
    <h2 className="text-3xl text-center font-bold mb-6 text-[#006450]">
      Centri ASL disponibili
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {centri.map((asl) => (
        <div
          key={asl.id}
          className="bg-white rounded-xl shadow-md p-6 flex space-x-4 items-center"
        >
          <div className="flex-1 space-y-1">
            <p>
              <strong>{asl.nome}</strong>
            </p>
            <p>
              <strong>Città:</strong> {asl.citta}
            </p>
            <p>
              <strong>Indirizzo:</strong> {asl.indirizzo}
            </p>
            <p>
              <strong>Email:</strong> {asl.email}
            </p>
            <p>
              <strong>Telefono:</strong> {asl.telefono}
            </p>
            <Button label="primary" operazione={() => handleSelectASL(asl)}>
              Seleziona
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default ASLPiuVicina;
