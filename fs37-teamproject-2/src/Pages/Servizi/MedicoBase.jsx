import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Button } from "../../Components/Button";


const mediciDisponibili = [
  {
    nome: "Lin",
    cognome: "Heng",
    codice_fiscale: "HNGLIN85A41H501P",
    email: "lin.heng@aslroma.it",
    indirizzo: "Via delle Magnolie",
    numero_civico: "42B",
    cap: "00192",
    regione: "Lazio",
    citta: "Roma",
    sesso: "F",
    telefono: "06-1234567",
    specializzazione: "Medicina Tradizionale Cinese e Agopuntura",
    foto: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    nome: "Luca",
    cognome: "Verdi",
    codice_fiscale: "VRDLCU79M01H501A",
    email: "luca.verdi@aslroma.it",
    indirizzo: "Viale delle Palme",
    numero_civico: "8",
    cap: "00191",
    regione: "Lazio",
    citta: "Roma",
    sesso: "M",
    telefono: "06-9876543",
    specializzazione: "Medicina Interna",
    foto: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

function MedicoBase() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const selezionaMedico = (medico) => {
    const utenti = JSON.parse(localStorage.getItem("users")) || [];
    const index = utenti.findIndex(u => u.email === user.email);
    if (index !== -1) {
      utenti[index].medico = medico;
      localStorage.setItem("users", JSON.stringify(utenti));
      setUser(utenti[index]);
      navigate("/dashboard");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl text-center font-bold mb-6 text-[#006450]">Seleziona il tuo medico di base</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mediciDisponibili.map((medico, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 flex space-x-4 items-center">
            <img src={medico.foto} alt="Foto medico" className="w-24 h-24 rounded-full border" />
            <div className="flex-1 space-y-1">
              <p><strong>{medico.nome} {medico.cognome}</strong></p>
              <p><strong>Specializzazione:</strong> {medico.specializzazione}</p>
              <p><strong>Email:</strong> {medico.email}</p>
              <p><strong>Telefono:</strong> {medico.telefono}</p>
              <Button label="primary" operazione={() => selezionaMedico(medico)}>
                Seleziona
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicoBase;
