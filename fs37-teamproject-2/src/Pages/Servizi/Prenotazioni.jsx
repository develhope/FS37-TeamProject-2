import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import itLocale from "@fullcalendar/core/locales/it";
import { useAuth } from "../../Context/AuthContext";

export default function Prenotazioni() {
  
  const { user ,prenotazioni} = useAuth();

  // Funzione per caricare le prenotazioni dal DB
  

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // Aggiungi solo dayGridPlugin e interactionPlugin
        locales={[itLocale]} // Imposta la lingua
        locale="it" // Lingua italiana
        initialView="dayGridMonth" // Imposta la visualizzazione iniziale su mese
        headerToolbar={{
          left: "prev,next today", // Pulsanti per navigare tra i mesi
          center: "title", // Mostra il titolo del mese
          right: "", // Rimuovi la possibilità di selezionare settimana o giorno
        }}
        slotDuration="00:30:00" // Imposta la durata della selezione (non usato in visualizzazione mensile)
        slotMinTime="08:00:00" // Imposta l'orario minimo per la visualizzazione (non usato)
        slotMaxTime="20:00:00" // Imposta l'orario massimo per la visualizzazione (non usato)
        selectable={false} // Disabilita la selezione dei giorni
        editable={false} // Disabilita la modifica degli eventi
        eventOverlap={false} // Impedisce che gli eventi si sovrappongano
        nowIndicator={true} // Mostra l'indicatore dell'ora corrente
        timeZone="local" // Usa il fuso orario locale
        firstDay={1} // Imposta il primo giorno della settimana su lunedì
        height="auto" // Imposta l'altezza automatica
        events={prenotazioni} // Passa gli eventi dal DB
      />
    </div>
  );
}
