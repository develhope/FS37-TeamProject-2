import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as OTPAuth from "otpauth";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [message, setMessage] = useState(``);

  const navigate = useNavigate();

  const login = (email, password) => {
    const idx = users.findIndex(
      (x) => x.email === email && x.password === password
    );
    if (idx > -1) {
      const found = { ...users[idx] };

      // Se l'utente non ha ancora un segreto TOTP, creane uno ora (DEV)
      if (!found.totpSecretB32) {
        const secret = new OTPAuth.Secret(); // <-- genera random
        found.totpSecretB32 = secret.base32;
        const updated = [...users];
        updated[idx] = found;
        setUsers(updated);
      }

      setUser(found);
      setMessage(``);

      // Salviamo anche un fallback DEV in localStorage (la pagina OTP lo userà se serve)
      localStorage.setItem("mfa_secret", found.totpSecretB32);

      // Vai alla pagina OTP, e dopo la verifica rientri dove vuoi tu
      navigate("/conferma-otp?next=/dashboard");
    } else {
      setMessage(`Credenziali errate`);
    }
  };

  const logout = () => {
    localStorage.removeItem("otp_verified_at");
    setUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  function registrazione(userData) {
    const userExist = users.find((x) => x.email === userData.email);
    if (!userExist) {
     const secret = new OTPAuth.Secret();           // <-- genera random
     const newUser = { ...userData, totpSecretB32: secret.base32 };
      setUsers([...users, newUser]);
      setMessage(`Registrazione avvenuta con successo`);
      setTimeout(() => {
        setMessage(``);
        navigate("/login");
      }, 3000);
    } else {
      setMessage(`Email gia' registrata`);
    }
  }

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, registrazione, message }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}
