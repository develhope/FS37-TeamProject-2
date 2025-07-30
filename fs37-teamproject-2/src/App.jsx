import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// import di Components e Pages
import MenuNavigazione from './components/MenuNavigazione';
import LandingPage from './pages/LandingPage';
import Registrazione from './pages/Registrazione';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ConfermaOTP from './pages/ConfermaOTP';
import Dashboard from './pages/Dashboard';

// import di rotte secondarie nella pagina dei servizi
import LayoutServizi from './pages/Servizi/LayoutServizi';
import Documentazione from './pages/Servizi/Documentazione';
import ASLPiuVicina from './pages/Servizi/ASLPiuVicina';
import MedicoBase from './pages/Servizi/MedicoBase';
import NecessitaSpeciali from './pages/Servizi/NecessitaSpeciali';
import Prenotazioni from './pages/Servizi/Prenotazioni';

import Contatti from './pages/Contatti';

// Hook per autenticazione
import { useAuth } from './hooks/useAuth';

// Wrapper per route private
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      {/* Schermata di apertura del menu di navigazione */}
      <MenuNavigazione />

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Registrazione */}
        <Route path="/registrazione" element={<Registrazione />} />

        {/* Login e Logout con ID dinamico */}
        <Route path="/login/:userId" element={<Login />} />
        <Route path="/logout/:userId" element={<Logout />} />

        {/* Conferma OTP */}
        <Route path="/conferma-otp/:userId" element={<ConfermaOTP />} />

        {/* Dashboard - Route privata */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Servizi - Route nidificate e private */}
        <Route
          path="/servizi"
          element={
            <PrivateRoute>
              <LayoutServizi />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="documentazione" replace />} />
          <Route path="documentazione" element={<Documentazione />} />
          <Route path="asl-piu-vicina" element={<ASLPiuVicina />} />
          <Route path="medico-base" element={<MedicoBase />} />
          <Route path="necessita-speciali" element={<NecessitaSpeciali />} />
          <Route path="prenotazioni" element={<Prenotazioni />} />
        </Route>

        {/* Contatti */}
        <Route path="/contatti" element={<Contatti />} />

        {/* Rotta di fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
