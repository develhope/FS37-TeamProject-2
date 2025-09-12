import { useState, useEffect } from "react";
import { Button } from "../../Components/Button";
import { useAuth } from "../../Context/AuthContext";

function ASLPiuVicina() {
  // Stato per la lista delle ASL e l'ASL selezionata
  const [centri, setCentri] = useState([]);
  const [selectedASL, setSelectedASL] = useState(null);
  const { user } = useAuth();

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

  // Gestisce la selezione di una ASL e la salva in localStorage
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
      const data = await result.json();
      console.log(data);
      setSelectedASL(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        {selectedASL ? (
          <div>
            <p>
              <strong>Nome ASL:</strong> {selectedASL.nome}
            </p>
            <p>
              <strong>Indirizzo:</strong> {selectedASL.indirizzo}
            </p>
            <p>
              <strong>Numero contatto:</strong> {selectedASL.telefono}
            </p>
            <p>
              <strong>Email:</strong> {selectedASL.email}
            </p>
            <Button label="primary">ASL Selezionata</Button>
          </div>
        ) : (
          <div>
            <p>
              <strong>Seleziona la tua ASL:</strong>
            </p>
            <select
              onChange={(e) => handleSelectASL(JSON.parse(e.target.value))}
              defaultValue=""
            >
              <option value="" disabled>
                Seleziona un'ASL
              </option>
              {centri.map((asl) => (
                <option key={asl.id} value={JSON.stringify(asl)}>
                  {asl.nome} - {asl.citta}
                </option>
              ))}
            </select>
            <Button label="primary">Seleziona ASL</Button>
          </div>
        )}
      </div>
    </>
  );
}

export default ASLPiuVicina;
