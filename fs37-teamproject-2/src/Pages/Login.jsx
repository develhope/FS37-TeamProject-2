import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Logo from "../assets/Logo/Logo-app.png";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";

function Login() {
  const navigate = useNavigate();
  const { login, message } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col font-poppins bg-gray-50">
      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
        <div className="flex flex-col mb-10 items-center text-center text-[#006450]">
          <img
            src={Logo}
            alt="MiCurApp Logo"
            className="h-20 w-auto bg-white p-1 rounded shadow-md mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">Benvenuto in MiCurApp</h1>
          <p className="text-sm text-[#006450]/80 max-w-xs">
            Gestisci i tuoi appuntamenti, prescrizioni e referti in modo
            semplice e sicuro.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-600">
            Accedi al tuo account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              mode={"defaultInput"}
              value={email}
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              mode={"defaultInput"}
              value={password}
            />

            {message && (
              <p
                className={
                  message.includes("successo")
                    ? "text-[#006450] text-sm text-center"
                    : "text-red-500 text-sm text-center"
                }
              >
                {message}
              </p>
            )}

            <div className="flex justify-between items-center mt-2 mb-6">
              <Link to="#" className="text-sm text-[#006450] hover:underline">
                Password dimenticata?
              </Link>
              <Button label="primary" type="submit" className="w-fit mx-auto">
                Login
              </Button>
            </div>

            <div className="flex items-center my-6">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-gray-400">oppure</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 flex items-center justify-center border border-gray-300 px-4 py-2 rounded-lg hover:border-[#006450] text-gray-600 transition">
                <FcGoogle size={20} className="mr-2" /> Google
              </button>
              <button className="flex-1 flex items-center justify-center border border-gray-300 px-4 py-2 rounded-lg hover:border-[#006450] text-gray-600 transition">
                <FaFacebookF size={20} color="#006450" className="mr-2" />{" "}
                Facebook
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Non hai un account?{" "}
              <Link
                to="/registrazione"
                className="text-[#006450] font-medium hover:underline"
              >
                Registrati
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
