import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Button } from "../../Components/Button";

function MedicoBase() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [mediciDisponibili, setMediciDisponibili] = useState([]);

  useEffect(() => {
    async function fetchMedici() {
      try {
        const response = await fetch("http://localhost:3000/medici");
        const data = await response.json();
        console.log("Medici ricevuti:", data); // Aggiungi questo per vedere la risposta
        setMediciDisponibili(data);
      } catch (error) {
        console.error("Errore durante il recupero dei medici:", error);
      }
    }
    fetchMedici();
  }, []);

  // Funzione per selezionare il medico
  const selezionaMedico = async (medico) => {
    try {
      // Aggiorna il medico per l'utente nel DB
      const response = await fetch(
        `http://localhost:3000/utenti/${user.id}/medico`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ medico: medico.id }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser.user); // Aggiorna l'utente nel contesto
        navigate("/dashboard"); // Vai alla dashboard
      } else {
        console.error("Errore nell'aggiornare il medico");
      }
    } catch (error) {
      console.error("Errore durante la selezione del medico:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl text-center font-bold mb-6 text-[#006450]">
        Seleziona il tuo medico di base
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mediciDisponibili.map((medico) => (
          <div
            key={medico.id}
            className="bg-white rounded-xl shadow-md p-6 flex space-x-4 items-center"
          >
            <img
              src={medico.foto}
              alt="Foto medico"
              className="w-24 h-24 rounded-full border"
            />
            <div className="flex-1 space-y-1">
              <p>
                <strong>
                  {medico.nome} {medico.cognome}
                </strong>
              </p>
              <p>
                <strong>Specializzazione:</strong> {medico.specializzazione}
              </p>
              <p>
                <strong>Email:</strong> {medico.email}
              </p>
              <p>
                <strong>Telefono:</strong> {medico.telefono}
              </p>
              <Button
                label="primary"
                operazione={() => selezionaMedico(medico)}
              >
                Seleziona
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Esportiamo il componente come default
export default MedicoBase;
