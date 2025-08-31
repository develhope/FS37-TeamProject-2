import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const userExist = users.find(
      (x) => x.email === email && x.password === password
    );
    if (userExist) {
      setUser(userExist);
      setMessage(``);
      setTimeout(() => {
        navigate(`/dashboard`);
      }, 2000);
    } else {
      setMessage(`Credenziali errate`);
    }
  };

  const logout = () => setUser(null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  function registrazione(userData) {
    const userExist = users.find((x) => x.email === userData.email);
    if (!userExist) {
      setUsers([...users, userData]);
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
