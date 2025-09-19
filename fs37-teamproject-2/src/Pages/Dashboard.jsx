import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, setUser, logout, elenco } = useAuth();
  const [profile, setProfile] = useState(user);
  const [medico, setMedico] = useState(null);
  const [asl, setAsl] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const result = await fetch(`http://localhost:3000/${user.id}/modifica`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ utente: profile }),
      });
      const data = await result.json();
      if (result.ok) {
        console.log(data.message);
        setEditing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Medico
  useEffect(() => {
    const fetchMedico = async () => {
      if (!user.medico) {
        setMedico(null);
        return;
      }
      try {
        const result = await fetch(
          `http://localhost:3000/utenti/${user.medico}/medico`
        );
        const data = await result.json();
        setMedico(data);
      } catch (err) {
        console.error("Errore nel recupero del medico di base:", err);
        setMedico(null);
      }
    };
    fetchMedico();
  }, [user.medico]);

  // ASL
  useEffect(() => {
    const fetchAsl = async () => {
      if (!user.asl) {
        setAsl(null);
        return;
      }
      try {
        const result = await fetch(
          `http://localhost:3000/utenti/${user.id}/asl`
        );
        const data = await result.json();
        setAsl(data);
      } catch (err) {
        console.error("Errore nel recupero dell'ASL:", err);
        setAsl(null);
      }
    };
    fetchAsl();
  }, [user]);

  return (
    <main className="min-h-screen bg-[#FFFFFF] p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#006450]">Dashboard</h1>
        <Button
          className="w-36 h-10"
          label="secondary"
          operazione={handleLogout}
        >
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Box dati profilo */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Dati Profilo</h2>

          {editing ? (
            <div className="space-y-3">
              <input
                type="text"
                name="nome"
                autoComplete="off"
                value={profile.nome || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Nome"
              />
              <input
                type="text"
                name="cognome"
                autoComplete="off"
                value={profile.cognome || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Cognome"
              />
              <input
                type="email"
                name="email"
                autoComplete="off"
                value={profile.email || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Email"
              />
              <input
                type="tel"
                name="telefono"
                autoComplete="off"
                value={profile.telefono || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Telefono"
              />
              <div className="flex justify-end mt-3">
                <Button
                  label="primary"
                  className="w-36 h-10"
                  operazione={handleSave}
                >
                  Salva
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p>
                <strong>Nome:</strong> {profile.nome}
              </p>
              <p>
                <strong>Cognome:</strong> {profile.cognome}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Telefono:</strong> {profile.telefono}
              </p>
              <div className="flex mt-3">
                <Button
                  label="primary"
                  className="w-36 h-10"
                  operazione={() => setEditing(true)}
                >
                  Modifica
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Box Servizi prenotati */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Servizi Prenotati</h2>

          {elenco.length > 0 ? (
            <div className="space-y-4">
              {(showAll ? elenco : elenco.slice(0, 3)).map((prenotazione, i) => (
                <div
                  key={i}
                  className="flex space-x-4 items-center bg-gray-50 p-4 rounded-xl border"
                >
                  <div className="flex-grow space-y-1">
                    <p>
                      <strong>Nome:</strong> {prenotazione.nome_servizio}
                    </p>
                    <p>
                      <strong>Tipologia:</strong>{" "}
                      {prenotazione.tipologia_servizio}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      label="primary"
                      className="w-36 h-10"
                      operazione={() => navigate("/servizi/prenotazioni")}
                    >
                      Vedi
                    </Button>
                  </div>
                </div>
              ))}
              {elenco.length > 3 && (
                <div className="flex mt-4">
                  <Button
                    label="primary"
                    className="w-36 h-10"
                    operazione={() => setShowAll((prev) => !prev)}
                  >
                    {showAll ? "Mostra meno" : "Vedi di più"}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-start space-y-4">
              <p>Non hai ancora prenotato alcun servizio.</p>
              <Button
                label="primary"
                className="w-36 h-10"
                operazione={() => navigate("/servizi/prenotazioni")}
              >
                Prenota
              </Button>
            </div>
          )}
        </div>

        {/* Box La mia ASL */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">La mia ASL</h2>

          {asl ? (
            <div className="flex space-x-4">
              <div className="flex-grow space-y-1">
                <p>
                  <strong>Nome:</strong> {asl.nome} {asl.codice_identificativo}
                </p>
                <p>
                  <strong>Email:</strong> {asl.email}
                </p>
                <p>
                  <strong>Telefono:</strong> {asl.telefono}
                </p>
                <p>
                  <strong>CAP:</strong> {asl.cap}
                </p>
                <p>
                  <strong>Indirizzo:</strong> {asl.indirizzo},{" "}
                  {asl.numero_civico}
                </p>
                <p>
                  <strong>Città:</strong> {asl.cap} - {asl.citta} ({asl.regione}
                  )
                </p>
                <Button
                  label="primary"
                  className="w-36 h-10"
                  operazione={() => navigate("/servizi/asl-piu-vicina")}
                >
                  Cambia ASL
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start space-y-4">
              <p>Seleziona la tua ASL</p>

              <Button
                className="w-36 h-10"
                label="primary"
                operazione={() => navigate("/servizi/asl-piu-vicina")}
              >
                Seleziona
              </Button>
            </div>
          )}
        </div>

        {/* Box Il mio medico di base */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Il mio medico di base</h2>

          {medico ? (
            <div className="flex space-x-4">
              {/* Testo a sinistra */}
              <div className="flex-grow space-y-1 text-justify">
                <p>
                  <strong>Nome:</strong> {medico.nome} {medico.cognome}
                </p>
                <p>
                  <strong>Email:</strong> {medico.email}
                </p>
                <p>
                  <strong>Telefono:</strong> {medico.telefono}
                </p>
                <p>
                  <strong>Specializzazione:</strong> {medico.specializzazione}
                </p>
                <p>
                  <strong>Indirizzo:</strong> {medico.indirizzo},{" "}
                  {medico.numero_civico}
                </p>
                <p>
                  <strong>Città:</strong> {medico.cap} - {medico.citta} (
                  {medico.regione})
                </p>
                <Button
                  label="primary"
                  className="w-36 h-10"
                  operazione={() => navigate("/servizi/medico-base")}
                >
                  Cambia Medico
                </Button>
              </div>

              {/* Immagine a destra */}
              <div className="flex-shrink-0">
                <img
                  src={medico.foto || "https://via.placeholder.com/100"}
                  alt={`Foto di ${medico.nome}`}
                  className="w-24 h-24 rounded-full object-cover border"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start space-y-4">
              <p>Scegli il tuo medico di base</p>
              <Button
                className="w-36 h-10"
                label="primary"
                operazione={() => navigate("/servizi/medico-base")}
              >
                Seleziona
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
