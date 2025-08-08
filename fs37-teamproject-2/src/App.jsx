import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from "./Context/AuthContext";
import Private from "./Components/Private";


// import di Components e Pages
import MenuNavigazione from './Components/MenuNavigazione';
import LandingPage from './Pages/LandingPage';
import Registrazione from './Pages/Registrazione';
import Login from './Pages/Login';
import ConfermaOTP from './Pages/ConfermaOTP';
import Dashboard from './Pages/Dashboard';

// import di rotte secondarie nella pagina dei servizi
import LayoutServizi from './Pages/Servizi/LayoutServizi';
import Documentazione from './Pages/Servizi/Documentazione';
import ASLPiuVicina from './Pages/Servizi/ASLPiuVicina';
import MedicoBase from './Pages/Servizi/MedicoBase';
import NecessitaSpeciali from './Pages/Servizi/NecessitaSpeciali';
import Prenotazioni from './Pages/Servizi/Prenotazioni';
import Contatti from './Pages/Contatti';


function App() {

  return (
    <>
      <BrowserRouter>
      <AuthProvider>
      {/* Schermata di apertura del menu di navigazione */}
      <MenuNavigazione />

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Registrazione */}
        <Route path="/registrazione" element={<Registrazione />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Conferma OTP */}
        <Route path="/conferma-otp/:userId" element={<ConfermaOTP />} />

        {/* Dashboard - Route privata */}
        <Route
          path="/dashboard"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />

        {/* Servizi - Route nidificate e private */}
        <Route
          path="/servizi"
          element={
            <Private>
              <LayoutServizi />
            </Private>
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
      </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
