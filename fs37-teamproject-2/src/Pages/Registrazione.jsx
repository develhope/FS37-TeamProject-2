import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "../Components/Button";

const style =
  "w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-[#006450] hover:border-[#006450] outline-none";
function Registrazione() {
  const { registrazione } = useAuth();
  const [user, setUser] = useState({});
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleRegistrazione(e) {
    e.preventDefault();
    registrazione(user);
  }
  return (
    <>
      <main className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <form
          className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md"
          onSubmit={handleRegistrazione}
        >
          <h2 className="text-3xl font-semibold text-center mb-6">
            Accedi al tuo account
          </h2>
          <div className="space-y-4">
            <input
              onChange={handleChange}
              type="email"
              name="email"
              required
              placeholder="Email"
              className={style}
            />
            <input
              onChange={handleChange}
              type="password"
              name="password"
              required
              placeholder="Password"
              className={style}
            />
            <input
              onChange={handleChange}
              type="text"
              name="nome"
              required
              placeholder="Nome"
              className={style}
            />
            <input
              onChange={handleChange}
              type="text"
              name="cognome"
              required
              placeholder="Cognome"
              className={style}
            />
          </div>

          <Button label="primary" type="submit">
            Registrati
          </Button>

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
    </>
  );
}

export default Registrazione;
