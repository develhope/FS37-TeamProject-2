import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as OTPAuth from "otpauth";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
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
      if(result.ok){
        setMessage(data.message);
        setUser(data.user);
        
        const secret = new OTPAuth.Secret(); // <-- genera random
        localStorage.setItem("topSecretB32", secret.base32)
        setTimeout(()=>{
           navigate("/conferma-otp?next=/dashboard");
        }, 2000)
      }else{
        setMessage(data.message);
      }
   } catch (error) {
    console.error(error);
   }

    
  };

  // const logout = () => {
  //   localStorage.removeItem("otp_verified_at");
  //   setUser(null);
  // };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
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
