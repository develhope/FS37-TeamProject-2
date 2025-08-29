import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";


function Registrazione() {
  const { registrazione, message } = useAuth();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("step")) || {});
  const[step, setStep]= useState(1);
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

useEffect(() => localStorage.setItem("step", JSON.stringify(user)), [user])

  function handleRegistrazione(e) {
    e.preventDefault();
    registrazione(user);
    localStorage.removeItem("step");
  }
  
  return (
    <>
      <main className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <form onSubmit={handleRegistrazione}
          className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md"
          
        >
          <h2 className="text-3xl font-semibold text-center mb-6">
            Accedi al tuo account
          </h2>
         {step === 1 ? 
          <><div className="space-y-4">
            <Input
              onChange={handleChange}
              type="email"
              name="email"
              required={true}
              placeholder="Email"
              mode="defaultInput"
            />
            <Input
              onChange={handleChange}
              type="password"
              name="password"
              required={true}
              placeholder="Password"
              mode="defaultInput"
            />
            <Input
              onChange={handleChange}
              type="text"
              name="nome"
              required={true}
              placeholder="Nome"
              mode="defaultInput"
            />
            <Input
              onChange={handleChange}
              type="text"
              name="cognome"
              required={true}
              placeholder="Cognome"
              mode="defaultInput"
            />
            <Input
            onChange={handleChange}
              type="tel"
              name="telefono"
              required={true}
              placeholder="Numero di telefono"
              mode="defaultInput"
            />
          </div>

          <Button label="primary" operazione={()=>setStep(2)}>
            Avanti
          </Button>
          </>
          :
          <><div className="space-y-4">
            <Input
              onChange={handleChange}
              type="text"
              name="codiceFiscale"
              required={true}
              placeholder="Codice Fiscale"
              mode="defaultInput"
            />
            <Input
              onChange={handleChange}
              type="date"
              name="dataNascita"
              required={true}
              placeholder="Data di Nascita"
              mode="defaultInput"
            />
            <Input
              onChange={handleChange}
              type="text"
              name="luogoNascita"
              required={true}
              placeholder="Città di Nascita"
              mode="defaultInput"
            />
            <Input
              onChange={handleChange}
              type="text"
              name="indirizzo"
              required={true}
              placeholder="indirizzo"
              mode="defaultInput"
            />
            <Input
            onChange={handleChange}
              type="text"
              name="cap"
              required={true}
              placeholder="Cap"
              mode="defaultInput"
            />
            
          </div>
          <Button label="secondary" operazione={()=> setStep(1)} >
          Indietro
          </Button>
          <Button label="primary" type="submit">
            Registrati
          </Button>
          </> }

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
          {message && <p className="text-grey-600">{message}</p>}
        </form>
      </main>
    </>
  );
}

export default Registrazione;
