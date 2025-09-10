import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import itLocale from "@fullcalendar/core/locales/it";

export default function Prenotazioni() {
  const [events, setEvents] = useState([]);

  // Funzione per caricare le prenotazioni dal DB
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("http://localhost:3000/prenotazioni");
        const data = await response.json();
        const formattedEvents = data.map(event => ({
          id: event.id,
          title: `${event.nome_cliente} - ${event.servizio}`,
          start: event.data_prenotazione,
          extendedProps: {
            medico: event.medico,
            telefono: event.telefono_cliente,
          },
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Errore durante il recupero degli eventi:", error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#006450]">Prenotazioni Esistenti</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}  // Aggiungi solo dayGridPlugin e interactionPlugin
        locales={[itLocale]}  // Imposta la lingua
        locale="it"  // Lingua italiana
        initialView="dayGridMonth"  // Imposta la visualizzazione iniziale su mese
        headerToolbar={{
          left: "prev,next today",  // Pulsanti per navigare tra i mesi
          center: "title",  // Mostra il titolo del mese
          right: "",  // Rimuovi la possibilità di selezionare settimana o giorno
        }}
        slotDuration="00:30:00"  // Imposta la durata della selezione (non usato in visualizzazione mensile)
        slotMinTime="08:00:00"  // Imposta l'orario minimo per la visualizzazione (non usato)
        slotMaxTime="20:00:00"  // Imposta l'orario massimo per la visualizzazione (non usato)
        selectable={false}  // Disabilita la selezione dei giorni
        editable={false}  // Disabilita la modifica degli eventi
        eventOverlap={false}  // Impedisce che gli eventi si sovrappongano
        nowIndicator={true}  // Mostra l'indicatore dell'ora corrente
        timeZone="local"  // Usa il fuso orario locale
        firstDay={1}  // Imposta il primo giorno della settimana su lunedì
        height="auto"  // Imposta l'altezza automatica
        events={events}  // Passa gli eventi dal DB
        eventClick={info => {
          alert(`Dettagli prenotazione:\nMedico: ${info.event.extendedProps.medico}\nTelefono: ${info.event.extendedProps.telefono}`);
        }}
      />
    </div>
  );
}