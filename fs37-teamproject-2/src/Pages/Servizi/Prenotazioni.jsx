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

export default function Prenotazioni() {
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
  );
}
