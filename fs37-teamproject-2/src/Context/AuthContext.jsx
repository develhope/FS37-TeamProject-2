// Nel contesto, accedo allo stato di login di un utente da un qualsiasi componente

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
    function naviga(path) {
    navigate(path);
  }

  const login = (email, password) => {
   const userExist = users.find((x) => x.email === email && x.password === password);
    if (userExist) {
      setUser(userExist);
      setMessage(``);
      setTimeout(() => {
      navigate(`/dashboard`)
    }, 2000)
    } else {
      setMessage(`Credenziali errate`);
    }
  }
  const logout = () => setUser(null);

  useEffect (() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user])

  function registrazione(userData) {
    const userExist = users.find((x) => x.email === userData.email);
    if (!userExist) {
      setUsers([...users, userData]);
      setMessage(`Registrazione avvenuta con successo`);
      setTimeout(()=>{ 
        setMessage(``);
        navigate("/login");
      },3000)
    } else {
      setMessage(`Email gia' registrata`);
    }
    /*try {
        const result = await fetch("http://localhost:3000/registrazione", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({utente: user})}) 
        const data = await result.json()
        console.log (data.message)
      }
      catch (error) {
        console.error(error)
      }*/ // quando ci sara' la logica del backend possiamo scommentarlo!
  }
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users)); //aggiornamento collaterale con users
  }, [users]);
  return (
    <AuthContext.Provider
      value={{ user, login, logout, registrazione, message, naviga }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

// hook personalizzato per leggere il context rapidamente
export function useAuth() {
  return useContext(AuthContext);
}
