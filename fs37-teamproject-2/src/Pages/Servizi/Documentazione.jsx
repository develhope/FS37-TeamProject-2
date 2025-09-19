import React from "react";
import { Button } from "../../Components/Button";
import Legenda from "../../Components/Legenda";

/** Icone inline */
const EyeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden="true">
    <path
      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const DownloadIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden="true">
    <path
      d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const FileIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden="true">
    <path
      d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const CalendarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden="true">
    <rect
      x="3"
      y="4"
      width="18"
      height="17"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 2v4M16 2v4M3 10h18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
); 


  export const EditIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden="true">
    <path
      d="M2 6.857A4.857 4.857 0 0 1 6.857 2H12a1 1 0 1 1 0 2H6.857A2.857 2.857 0 0 0 4 6.857v10.286A2.857 2.857 0 0 0 6.857 20h10.286A2.857 2.857 0 0 0 20 17.143V12a1 1 0 1 1 2 0v5.143A4.857 4.857 0 0 1 17.143 22H6.857A4.857 4.857 0 0 1 2 17.143z"
      fill="currentColor"
    />
    <path
      d="m15.137 13.219-2.205 1.33-1.033-1.713 2.205-1.33.003-.002a1.2 1.2 0 0 0 .232-.182l5.01-5.036a3 3 0 0 0 .145-.157c.331-.386.821-1.15.228-1.746-.501-.504-1.219-.028-1.684.381a6 6 0 0 0-.36.345l-.034.034-4.94 4.965a1.2 1.2 0 0 0-.27.41l-.824 2.073a.2.2 0 0 0 .29.245l1.032 1.713c-1.805 1.088-3.96-.74-3.18-2.698l.825-2.072a3.2 3.2 0 0 1 .71-1.081l4.939-4.966.029-.029c.147-.15.641-.656 1.24-1.02.327-.197.849-.458 1.494-.508.74-.059 1.53.174 2.15.797a2.9 2.9 0 0 1 .845 1.75 3.15 3.15 0 0 1-.23 1.517c-.29.717-.774 1.244-.987 1.457l-5.01 5.036q-.28.281-.62.487"
      fill="currentColor"
    />
  </svg>
);


/** Mappa colori stato */
const statusClasses = {
  Completato: {
    badge: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    label: "Verde = Completato",
  },
  Confermato: {
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
    label: "Blu = Confermato",
  },
  "In attesa": {
    badge: "bg-yellow-100 text-yellow-700",
    dot: "bg-yellow-500",
    label: "Giallo = In attesa",
  },
  Annullato: {
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
    label: "Rosso = Annullato",
  },
  default: {
    badge: "bg-gray-100 text-gray-700",
    dot: "bg-gray-400",
    label: "Grigio = Sconosciuto",
  },
};

function Documentazione() {
  const documenti = [
    {
      id: 1,
      numero: "PRN1001",
      data: "2025-09-01",
      stato: "Completato",
      tipoServizio: "Visita",
    },
    {
      id: 2,
      numero: "PRN1002",
      data: "2025-09-02",
      stato: "In attesa",
      tipoServizio: "Analisi",
    },
    {
      id: 3,
      numero: "PRN1003",
      data: "2025-09-03",
      stato: "Confermato",
      tipoServizio: "Controllo",
    },
    {
      id: 4,
      numero: "PRN1004",
      data: "2025-09-04",
      stato: "Completato",
      tipoServizio: "Visita",
    },
    {
      id: 5,
      numero: "PRN1005",
      data: "2025-09-05",
      stato: "Annullato",
      tipoServizio: "Farmaci",
    },
  ];

  const getStatus = (stato) => statusClasses[stato] || statusClasses.default;
  const fmtIT = (iso) =>
    new Date(iso).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

  return (
    <div className="w-full">
      {/* conteggio */}
      <p className="mb-3 text-sm text-gray-700">
        Numero documenti:{" "}
        <span className="font-medium">{documenti.length}</span>
      </p>

      {/* ===== DESKTOP: tabella ===== */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nr. Prenotazione</th>
              <th className="py-3 px-6 text-left">Tipologia</th>
              <th className="py-3 px-6 text-left">Data</th>
              <th className="py-3 px-6 text-left">Stato</th>
              <th className="py-3 px-6 text-center">Azioni</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {documenti.map((x) => {
              const s = getStatus(x.stato);
              return (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-50"
                  key={x.id}
                >
                  <td className="py-3 px-6 text-left">{x.numero}</td>
                  <td className="py-3 px-6 text-left">{x.tipoServizio}</td>
                  <td className="py-3 px-6 text-left">{fmtIT(x.data)}</td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${s.badge}`}
                    >
                      {x.stato}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-3 justify-center">
                      <Button label="primary">Visualizza</Button>
                      <Button label="primary">Scarica</Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE: LISTA con icone + testo sempre visibile ===== */}
      <div className="md:hidden">
        <ul className="flex flex-col gap-2">
          {documenti.map((x) => {
            const s = getStatus(x.stato);
            return (
              <li
                key={x.id}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3"
              >
                {/* sinistra: chip Numero + chip Data + dot Stato */}
                <div className="flex items-center gap-2 min-w-0">
                  {/* Numero */}
                  <span className="inline-flex items-center gap-2 max-w-[45vw] sm:max-w-[55vw] px-2 py-1 rounded-lg border border-[#F5F5DC] bg-[#FFFDD0]">
                    <FileIcon className="h-4 w-4 text-[#1F2937]" />
                    <span className="text-xs font-medium text-[#1F2937] truncate">
                      {x.numero}
                    </span>
                  </span>
                  {/* Data */}
                  <span className="inline-flex items-center gap-2 px-2 py-1 rounded-lg border border-[#F5F5DC] bg-white">
                    <CalendarIcon className="h-4 w-4 text-[#1F2937]" />
                    <span className="text-xs font-medium text-[#1F2937]">
                      {fmtIT(x.data)}
                    </span>
                  </span>
                  {/* Stato dot */}
                  <span
                    className={`inline-flex h-3 w-3 rounded-full ${s.dot}`}
                    aria-label={`Stato ${x.stato}`}
                  />
                </div>

                {/* destra: azioni */}
                <div className="flex items-center gap-2 pl-2 shrink-0">
                  <button
                    type="button"
                    className="p-1.5 rounded-md border border-gray-200"
                    aria-label={`Visualizza ${x.numero}`}
                  >
                    <EyeIcon className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-md border border-gray-200"
                    aria-label={`Scarica ${x.numero}`}
                  >
                    <DownloadIcon className="h-5 w-5 text-gray-700" />
                  </button>
                  
                </div>
              </li>
            );
          })}
        </ul>

        {/* Legenda (mobile) */}
        <Legenda label="Legenda Stati">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" /> Verde =
              Completato
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Blu =
              Confermato
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" /> Giallo
              = In attesa
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Rosso =
              Annullato
            </span>
          </div>
        </Legenda>
      </div>
    </div>
  );
}

export default Documentazione;
