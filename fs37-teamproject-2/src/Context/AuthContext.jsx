import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as OTPAuth from "otpauth";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [elenco, setElenco] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [message, setMessage] = useState(``);

  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const result = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await result.json();
      if (result.ok) {
        setMessage(data.message);
        setUser(data.user);

        const secret = new OTPAuth.Secret(); // <-- genera random
        localStorage.setItem("topSecretB32", secret.base32);
        setTimeout(() => {
          navigate("/conferma-otp?next=/dashboard");
        }, 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("otp_verified_at");
    setUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));

    async function fetchPrenotazioni() {
      try {
        const response = await fetch(
          `http://localhost:3000/utenti/${user.id}/prenotazioni`
        );
        const data = await response.json();
        const formattaPrenotazioni = data.map((prenotazione, i) => ({
          id: i,
          title: `${prenotazione.nome_servizio} - ${prenotazione.tipologia_servizio}`,
          start: prenotazione.data_prenotazione,
        }));
        setPrenotazioni(formattaPrenotazioni);
        setElenco(data);
      } catch (error) {
        console.error("Errore durante il recupero degli eventi:", error);
      }
    }
    fetchPrenotazioni();
  }, [user]);

  async function registrazione(userData) {
    try {
      const result = await fetch("http://localhost:3000/registrazione", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ utente: userData }),
      });

      const data = result.json();

      setMessage(data.message);
      if (result.ok) {
        setTimeout(() => {
          setMessage(``);
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        registrazione,
        message,
        setMessage,
        login,
        logout,
        prenotazioni,elenco
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}
