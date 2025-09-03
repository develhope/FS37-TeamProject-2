import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Button } from "../../Components/Button";
import React, { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import itLocale from "@fullcalendar/core/locales/it";
import { Input } from "../../Components/Input";
const STORAGE_KEY = "bookings_v1";

function loadEvents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}
function overlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

// Dati fittizi dei servizi disponibili
const serviziDisponibili = [
  {
    id: 1,
    nome: "Analisi del sangue",
    tipologia: "Diagnostica",
    detraibilita: true,
    icona: "/src/assets/Icons/cuida--sample-container-outline.svg"
  },
  {
    id: 2,
    nome: "Visita cardiologica",
    tipologia: "Visita Specialistica",
    detraibilita: false,
    icona: "/src/assets/Icons/cuida--stethoscope-outline.svg"
  },
  {
    id: 3,
    nome: "Ecografia addome completo",
    tipologia: "Diagnostica",
    detraibilita: true,
    icona: "/src/assets/Icons/cuida--clipboard-text-outline.svg"
  }
];

export default function Prenotazioni() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [selezionati, setSelezionati] = useState([]);

  const toggleServizio = (servizio) => {
    const already = selezionati.find(s => s.id === servizio.id);
    if (already) {
      setSelezionati(prev => prev.filter(s => s.id !== servizio.id));
    } else {
      setSelezionati(prev => [...prev, servizio]);
    }
  };

  const confermaPrenotazioni = () => {
    const utenti = JSON.parse(localStorage.getItem("users")) || [];
    const index = utenti.findIndex(u => u.email === user.email);
    if (index !== -1) {
      utenti[index].serviziPrenotati = selezionati;
      localStorage.setItem("users", JSON.stringify(utenti));
      setUser(utenti[index]);
      navigate("/dashboard");
    }
  };
const [events, setEvents] = useState(() => loadEvents());

  const businessHours = useMemo(
    () => ({
      daysOfWeek: [1, 2, 3, 4, 5], // lun-ven
      startTime: "09:00",
      endTime: "19:00",
    }),
    []
  );

  function commit(newEvents) {
    setEvents(newEvents);
    saveEvents(newEvents);
  }

  function hasConflict(start, end, ignoreId = null) {
    return events.some((ev) => {
      if (ignoreId && ev.id === ignoreId) return false;
      return overlap(new Date(ev.start), new Date(ev.end), start, end);
    });
  }

  // Selezione slot → crea prenotazione
  function handleSelect(info) {
    const start = info.start;
    const end = info.end;

    const title = window.prompt("Titolo prenotazione (es. Nome Cliente)?"); //sostituire con un popup: campo input
    if (!title) {
      info.view.calendar.unselect();
      return;
    }

    if (hasConflict(start, end)) {
      alert("Conflitto: c’è già una prenotazione in questo intervallo.");
      info.view.calendar.unselect();
      return;
    }

    const newEvent = {
      id: crypto.randomUUID(),
      title,
      start: start.toISOString(),
      end: end.toISOString(),
    };
    commit([...events, newEvent]);
  }

  // Clic su evento → elimina (o estendi a “Modifica” se vuoi)
  function handleEventClick(info) {
    const ok = window.confirm(
      `Eliminare la prenotazione "${info.event.title}"?`
    );
    if (!ok) return;
    const remaining = events.filter((e) => e.id !== info.event.id);
    commit(remaining);
  }

  // Drag/resize → valida conflitti
  function handleEventChange(info) {
    const start = info.event.start;
    const end = info.event.end;
    if (!start || !end) return;

    if (hasConflict(start, end, info.event.id)) {
      alert("Conflitto: intervallo occupato. Operazione annullata.");
      info.revert();
      return;
    }
    const updated = events.map((e) =>
      e.id === info.event.id
        ? { ...e, start: start.toISOString(), end: end.toISOString() }
        : e
    );
    commit(updated);
  }

  function clearAll() {
    const ok = window.confirm("Cancellare tutte le prenotazioni?");
    if (!ok) return;
    commit([]);
  }
  return (
    <>
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#006450]">Prenota un Servizio</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {serviziDisponibili.map(servizio => {
          const isSelected = selezionati.find(s => s.id === servizio.id);
          return (
            <div
              key={servizio.id}
              className={`p-4 rounded-xl border shadow-md flex flex-col space-y-2 ${
                isSelected ? "bg-green-50 border-green-400" : "bg-white"
              }`}
              onClick={() => toggleServizio(servizio)}
            >
              <p><strong>{servizio.nome}</strong></p>
              <p><strong>Tipologia:</strong> {servizio.tipologia}</p>
              <p><strong>Detraibile:</strong> {servizio.detraibilita ? "Sì" : "No"}</p>
              <p className="text-sm text-gray-500 italic">
                {isSelected ? "Selezionato" : "Clicca per selezionare"}
              </p>
            </div>
          );
        })}
      </div>

      {selezionati.length > 0 && (
        <div className="mt-6">
          <Button label="primary" operazione={confermaPrenotazioni}>
            Conferma prenotazione
          </Button>
        </div>
      )}
    </div>
    <div className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Calendario Prenotazioni</h1>
        <button
          className="px-3 py-2 rounded-lg border hover:bg-gray-100"
          onClick={clearAll}
        >
          Svuota calendario
        </button>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        locales={[itLocale]}
        locale="it"
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        slotDuration="00:30:00"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        selectable
        selectMirror
        editable
        selectOverlap={false}
        eventOverlap={false}
        businessHours={businessHours}
        nowIndicator
        timeZone="local"
        firstDay={1}
        height="auto"
        events={events}
        select={handleSelect}
        eventClick={handleEventClick}
        eventChange={handleEventChange} // drag + resize
      />
    </div>
    </>
  );
}