import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import Logo from "../assets/Logo/Logo-app.png";
import { Button } from "../Components/Button";

function Login() {
const navigate = useNavigate();
const { login } = useAuth();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
//   const { userId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    
  };


  return (
    <>
    <div className="min-h-screen flex font-poppins ">
      {/* Sidebar con brand */}
      <aside className="hidden md:flex w-1/2 bg-[#006450] text-white flex-col items-center justify-center p-8">
        <img src={Logo} alt="MiCurApp Logo" className="h-20 w-auto bg-white p-1 rounded shadow-md mb-10" />
        <h1 className="text-4xl font-bold mb-4">Benvenuto in MiCurApp</h1>
        <p className="text-base text-[#FFFFF0]/80 text-center max-w-sm">
          Gestisci i tuoi appuntamenti, prescrizioni e risultati delle analisi in un unico posto,
          in modo semplice e sicuro.
        </p>
      </aside>

      {/* Area login */}
      <main className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-6">Accedi al tuo account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-[#006450] hover:border-[#006450] outline-none"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-[#006450] hover:border-[#006450] outline-none"
            />
          <div className="text-right mt-2 mb-6">
            <a href="#" className="text-sm text-[#006450] hover:underline">
              Password dimenticata?
            </a>
          </div>
          <Button label= "primary" type="submit">Login</Button>
          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400">oppure</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 flex items-center justify-center border border-gray-300 px-4 py-2 rounded-lg hover:border-[#006450] transition">
              <FcGoogle size={20} className="mr-2" /> Google
            </button>
            <button className="flex-1 flex items-center justify-center border border-gray-300 px-4 py-2 rounded-lg hover:border-[#006450] transition">
              <FaFacebookF size={20} color="#006450" className="mr-2" /> Facebook
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Non hai un account?{' '}
            <Link to="/registrazione" className="text-[#006450] font-medium hover:underline">
              Registrati
            </Link>
          </p>
          </form>
        </div>
      </main>
    </div>
       
    </>
    
  );
}

export default Login;


