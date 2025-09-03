import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import Private from "./Components/Private";

// import di Components e Pages
import MenuNavigazione from "./Components/MenuNavigazione";
import LandingPage from "./Pages/LandingPage";
import Registrazione from "./Pages/Registrazione";
import Login from "./Pages/Login";
import ConfermaOTP from "./Pages/ConfermaOTP";
import Dashboard from "./Pages/Dashboard";

// import di rotte secondarie nella pagina dei servizi
import LayoutServizi from "./Pages/Servizi/LayoutServizi";
import Documentazione from "./Pages/Servizi/Documentazione";
import ASLPiuVicina from "./Pages/Servizi/ASLPiuVicina";
import MedicoBase from "./Pages/Servizi/MedicoBase";
import Prenotazioni from "./Pages/Servizi/Prenotazioni";
import Contatti from "./Pages/Contatti";

function RequireOtp({ children }) {
  const ts = localStorage.getItem("otp_verified_at");
  const valid = Boolean(ts); // niente scadenza
  const location = useLocation();
  if (!valid) {
    return (
      <Navigate
        to={`/conferma-otp?next=${encodeURIComponent(
          location.pathname + location.search
        )}`}
        replace
      />
    );
  }
  return children;
}

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
            <Route path="/conferma-otp" element={<ConfermaOTP />} />

            {/* Dashboard - Route privata */}
            <Route
              path="/dashboard"
              element={
                <Private>
                  <RequireOtp>
                    <Dashboard />
                  </RequireOtp>
                </Private>
              }
            />

            {/* Servizi - Route nidificate e private */}
            <Route
              path="/servizi"
              element={
                <Private>
                  <RequireOtp>
                    <LayoutServizi />
                  </RequireOtp>
                </Private>
              }
            >
              <Route path="asl-piu-vicina" element={<ASLPiuVicina />} />
              <Route path="medico-base" element={<MedicoBase />} />
              <Route path="documentazione" element={<Documentazione />} />
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
