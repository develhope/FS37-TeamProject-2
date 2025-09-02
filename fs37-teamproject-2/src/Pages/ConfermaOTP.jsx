import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as OTPAuth from "otpauth";
import { useAuth } from "../Context/AuthContext";

/**
 * ⚠️ Dev vs Prod:
 *   - In DEV puoi mostrare il codice attuale per test (toggle showDemoCode)
 *   - In PROD tienilo nascosto e fai usare un'app TOTP (Google/Microsoft Authenticator, etc.)
 */

const VERIFIED_KEY = "otp_verified_at"; // timestamp ms del momento di verifica
const PERIOD_MS = 60_000; // 60 secondi

function now() {
  return Date.now();
}

function msToNextTick() {
  return PERIOD_MS - (now() % PERIOD_MS);
}

export default function ConfermaOTP() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get("next") || "/"; // pagina di destinazione post-verifica

  // Recupero segreto salvato per l'utente (registrazione/login lo inseriscono nel record utente o in localStorage)
  const secretB32 =
    (user && user.totpSecretB32) || localStorage.getItem("mfa_secret") || "";
  const [totp, setTotp] = useState(() =>
    secretB32
      ? new OTPAuth.TOTP({
          secret: OTPAuth.Secret.fromBase32(secretB32),
          digits: 6,
          period: 60,
          algorithm: "SHA1",
        })
      : null
  );

  const [timeLeft, setTimeLeft] = useState(msToNextTick());
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [showDemoCode, setShowDemoCode] = useState(false); // di default nascosto

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(msToNextTick()), 250);
    return () => clearInterval(id);
  }, []);

  const secondsLeft = useMemo(() => Math.ceil(timeLeft / 1000), [timeLeft]);
  const progressPct = useMemo(
    () => 100 - Math.min(100, (timeLeft / PERIOD_MS) * 100),
    [timeLeft]
  );

  if (!totp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-2xl shadow-lg bg-white p-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            OTP non configurato
          </h1>
          <p className="text-sm text-gray-600">
            Nessun segreto TOTP trovato. Completa la registrazione o riesegui il
            login.
          </p>
        </div>
      </div>
    );
  }

  function handleVerify(e) {
    e.preventDefault();
    setError("");
    setOk("");
    const delta = totp.validate({ token: input.trim(), window: 1 }); // 0 = corrente, ±1 = margine
    if (delta === 0 || delta === -1 || delta === 1) {
      localStorage.setItem(VERIFIED_KEY, String(now()));
      setOk("OTP valido! Reindirizzo…");
      navigate(next);
    } else {
      setError("Codice errato o scaduto");
    }
  }

  const currentCode = showDemoCode ? totp.generate() : "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md  rounded-2xl shadow-lg bg-white p-6">
        <h1 className="text-2xl text-center font-semibold text-gray-900 mb-1">
          Verifica OTP
        </h1>
        <p className="text-sm text-center text-gray-600 mb-6">
          Inserisci il codice a 6 cifre generato dall'app di
          autenticazione.
        </p>

        {/* DEMO: Mostra codice corrente (solo dev) */}
        {showDemoCode && (
          <div className="mb-4 p-3 rounded-xl bg-gray-100 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">
                Codice (demo)
              </div>
              <div className="font-mono text-xl font-bold text-gray-900">
                {currentCode}
              </div>
            </div>
            <button
              onClick={() => navigator.clipboard?.writeText(currentCode)}
              className="px-3 py-1 rounded-lg border border-gray-300 text-sm hover:bg-gray-200"
            >
              Copia
            </button>
          </div>
        )}
        {!showDemoCode && (
          <button
            onClick={() => setShowDemoCode(true)}
            className="mb-4 px-3 py-1 rounded-lg border border-gray-300 text-sm hover:bg-gray-100"
          >
            Mostra codice DEV
          </button>
        )}

        {/* Countdown + progress */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">Nuovo codice tra</span>
            <span className="font-mono text-sm font-semibold">
              {secondsLeft}s
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full"
              style={{
                backgroundColor: "#006450",
                width: `${progressPct}%`,
                transition: "width 0.2s linear",
              }}
            />
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Codice OTP
            </label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              minLength={6}
              maxLength={6}
              autoFocus
              value={input}
              onChange={(e) =>
                setInput(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))
              }
              placeholder="Inserisci 6 cifre"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#006450] focus:border-[#006450]"
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {ok && <div className="text-sm text-emerald-700">{ok}</div>}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl text-white font-medium hover:opacity-95 active:scale-[0.99]"
              style={{ backgroundColor: "#006450" }}
            >
              Verifica
            </button>
          </div>
        </form>

        
      </div>
    </div>
  );
}
