import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";

function Registrazione() {
  const { registrazione, message, setMessage } = useAuth();

  const [user, setUser] = useState(() => {
    try {
      const storedData = localStorage.getItem("step");
      return storedData ? JSON.parse(storedData) : {};
    } catch (error) {
      console.error("Errore parsing localStorage:", error);
      return {};
    }
  });

  const [step, setStep] = useState(1);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    localStorage.setItem("step", JSON.stringify(user));
  }, [user]);

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

  const isStep1Complete =
    user.email &&
    isEmailValid(user.email) &&
    user.password &&
    user.nome &&
    user.cognome &&
    user.telefono;

  const isStep2Complete =
    user.codice_fiscale &&
    user.data_di_nascita &&
    user.luogo_di_nascita &&
    user.indirizzo &&
    user.cap &&
    user.numero_civico &&
    user.regione &&
    user.citta &&
    user.sesso &&
    user.nazionalita;

  const handleNextStep = async (email) => {
    try {
      const result = await fetch("http://localhost:3000/checkEmail", {
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = await result.json();
      console.log(data.check);
      if (!data.check) {
        setMessage(data.message);
        return;
      }

      setStep(2);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRegistrazione = async (e) => {
    e.preventDefault();

    if (!isStep2Complete) return;

    registrazione(user);
    setMessage(message);

    localStorage.removeItem("step");
  };

  return (
    <main className="flex-1 flex items-center justify-center p-8 bg-gray-50">
      <form
        onSubmit={handleRegistrazione}
        className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md"
        autoComplete="off"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">
          Registra il tuo account
        </h2>

        {/* STEP 1 */}
        <div className={step === 1 ? "" : "hidden"}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email:
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={user.email || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
            {message && <p className="text-red-500 text-sm mt-1">{message}</p>}
            {user.email && !isEmailValid(user.email) && (
              <p className="text-red-500 text-sm mt-1">Email non valida</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password:
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={user.password || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="nome"
              className="block text-gray-700 font-medium mb-1"
            >
              Nome:
            </label>
            <Input
              id="nome"
              name="nome"
              type="text"
              placeholder="Nome"
              value={user.nome || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cognome"
              className="block text-gray-700 font-medium mb-1"
            >
              Cognome:
            </label>
            <Input
              id="cognome"
              name="cognome"
              type="text"
              placeholder="Cognome"
              value={user.cognome || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="telefono"
              className="block text-gray-700 font-medium mb-1"
            >
              Telefono:
            </label>
            <Input
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="Telefono"
              value={user.telefono || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              label="primary"
              type="button"
              operazione={() => handleNextStep(user.email)}
              disabled={!isStep1Complete}
            >
              Avanti
            </Button>
          </div>
        </div>

        {/* STEP 2 */}
        <div className={step === 2 ? "" : "hidden"}>
          <div className="mb-4">
            <label
              htmlFor="codiceFiscale"
              className="block text-gray-700 font-medium mb-1"
            >
              Codice Fiscale:
            </label>
            <Input
              id="codiceFiscale"
              name="codice_fiscale"
              type="text"
              placeholder="Codice Fiscale"
              value={user.codice_fiscale || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="dataNascita"
              className="block text-gray-700 font-medium mb-1"
            >
              Data di nascita:
            </label>
            <Input
              id="dataNascita"
              name="data_di_nascita"
              type="date"
              value={user.data_di_nascita || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="luogoNascita"
              className="block text-gray-700 font-medium mb-1"
            >
              Luogo di nascita:
            </label>
            <Input
              id="luogoNascita"
              name="luogo_di_nascita"
              type="text"
              placeholder="Luogo di nascita"
              value={user.luogo_di_nascita || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="indirizzo"
              className="block text-gray-700 font-medium mb-1"
            >
              Indirizzo:
            </label>
            <Input
              id="indirizzo"
              name="indirizzo"
              type="text"
              placeholder="Indirizzo"
              value={user.indirizzo || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cap"
              className="block text-gray-700 font-medium mb-1"
            >
              CAP:
            </label>
            <Input
              id="cap"
              name="cap"
              type="text"
              placeholder="CAP"
              value={user.cap || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="numero_civico"
              className="block text-gray-700 font-medium mb-1"
            >
              Numero Civico:
            </label>
            <Input
              id="numero_civico"
              name="numero_civico"
              type="text"
              placeholder="Numero Civico"
              value={user.numero_civico || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="regione"
              className="block text-gray-700 font-medium mb-1"
            >
              Regione:
            </label>
            <Input
              id="regione"
              name="regione"
              type="text"
              placeholder="Regione"
              value={user.regione || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="citta"
              className="block text-gray-700 font-medium mb-1"
            >
              Citta:
            </label>
            <Input
              id="citta"
              name="citta"
              type="text"
              placeholder="Citta'"
              value={user.citta || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nazionalita"
              className="block text-gray-700 font-medium mb-1"
            >
              Nazionalita':
            </label>
            <Input
              id="nazionalita"
              name="nazionalita"
              type="text"
              placeholder="Nazionalita'"
              value={user.nazionalita || ""}
              onChange={handleChange}
              mode="defaultInput"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cap"
              className="block text-gray-700 font-medium mb-1"
            >
              Sesso:
            </label>
            <select onChange={handleChange} name="sesso">
              <option value={"M"}>Maschio</option>
              <option value={"F"}>Femmina</option>
              <option value={"A"}>Altro</option>
            </select>
          </div>

          <div className="flex justify-between items-center gap-2 mt-6">
            <Button
              label="secondary"
              type="button"
              operazione={() => setStep(1)}
            >
              Indietro
            </Button>
            <Button label="primary" type="submit" disabled={!isStep2Complete}>
              Registrati
            </Button>
          </div>

          {message && (
            <p className="text-gray-500 font-bold text-center mt-2">
              {message}
            </p>
          )}
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-400">oppure</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Hai già un account?{" "}
          <Link
            to="/login"
            className="text-[#006450] font-medium hover:underline"
          >
            Effettua il login
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Registrazione;
