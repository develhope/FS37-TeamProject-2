import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import itLocale from "@fullcalendar/core/locales/it";
import { useAuth } from "../../Context/AuthContext";

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function Prenotazioni() {
  const { prenotazioni } = useAuth();

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );
  useEffect(() => {
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setIsMobile(window.innerWidth < 640), 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetDate, setSheetDate] = useState(null);

  const dayEvents = useMemo(() => {
    if (!sheetDate) return [];
    const d0 = new Date(sheetDate);
    return (prenotazioni || []).filter((ev) => {
      const s = new Date(ev.start);
      const e = ev.end ? new Date(ev.end) : s;
      return (
        sameDay(s, d0) ||
        sameDay(e, d0) ||
        (s < new Date(d0.getFullYear(), d0.getMonth(), d0.getDate() + 1) &&
          e >= new Date(d0.getFullYear(), d0.getMonth(), d0.getDate()))
      );
    });
  }, [sheetDate, prenotazioni]);

  const calendarOptions = useMemo(
    () => ({
      plugins: [dayGridPlugin, interactionPlugin],
      locales: [itLocale],
      locale: "it",
      initialView: "dayGridMonth",
      firstDay: 1,
      height: "auto",
      expandRows: true,
      fixedWeekCount: false,
      showNonCurrentDates: true,
      timeZone: "local",
      nowIndicator: true,

      headerToolbar: isMobile
        ? { left: "prev,next", center: "title", right: "today" }
        : { left: "prev,next today", center: "title", right: "" },

      dayHeaderFormat: isMobile ? { weekday: "narrow" } : { weekday: "short" },

      dayCellDidMount: (arg) => {
        arg.el.classList.add("mobile-daycell");
        arg.el.style.color = "#1F2937";
      },
      dayCellContent: (arg) => {
        const num = document.createElement("span");
        num.textContent = String(arg.date.getDate());
        num.className = "absolute top-1 right-1 text-xs sm:text-sm font-medium";
        num.style.color = "#1F2937";
        const wrap = document.createElement("div");
        wrap.className = "relative h-full w-full";
        wrap.appendChild(num);
        return { domNodes: [wrap] };
      },

      // eventi da mobile
      eventContent: (arg) => {
        const title = arg.event.title || "";
        const timeText = arg.timeText ? `${arg.timeText} ` : "";

        if (!isMobile) {
          const el = document.createElement("div");
          el.className = "truncate text-xs sm:text-sm leading-tight";
          el.style.color = "#1F2937";
          el.textContent = `${timeText}${title}`;
          return { domNodes: [el] };
        }

        // prenotazioni nel calendario
        const chip = document.createElement("div");
        chip.className =
          "fc-mobile-chip text-[12px] leading-4 px-1.5 py-0.5 rounded-md border overflow-hidden truncate";
        chip.style.backgroundColor = "#FFFDD0";
        chip.style.borderColor = "#006450";
        chip.style.color = "#1F2937";
        chip.textContent = `${timeText}${title}`;
        return { domNodes: [chip] };
      },

      dayMaxEvents: !isMobile,
      moreLinkClick: "popover",

      selectable: false,
      editable: false,
      eventOverlap: false,

      dateClick: (info) => {
        if (isMobile) {
          setSheetDate(info.date);
          setSheetOpen(true);
        }
      },

      events: prenotazioni,
      eventTimeFormat: { hour: "2-digit", minute: "2-digit", hour12: false },
    }),
    [isMobile, prenotazioni]
  );

  return (
    <div className="w-full max-w-screen-lg mx-auto p-2 sm:p-4 bg-[#FFFFFF]">
      <div className="bg-white rounded-2xl shadow-sm p-1 sm:p-4">
        <FullCalendar {...calendarOptions} />
      </div>

      {isMobile && sheetOpen && (
        <div
          className="fixed inset-0 z-50"
          aria-modal="true"
          role="dialog"
          onClick={() => setSheetOpen(false)}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0, 100, 80, 0.15)" }}
          />

          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl p-4 shadow-2xl"
            style={{ backgroundColor: "#FFFFF0", color: "#1F2937" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="mx-auto h-1.5 w-10 rounded-full mb-3"
              style={{ backgroundColor: "#F5F5DC" }}
            />
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">
                {sheetDate
                  ? sheetDate.toLocaleDateString("it-IT", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                    })
                  : "Dettagli"}
              </h3>
              <button
                onClick={() => setSheetOpen(false)}
                className="px-3 py-1 text-sm rounded-full border"
                style={{ borderColor: "#006450", color: "#006450" }}
              >
                Chiudi
              </button>
            </div>

            {dayEvents.length === 0 ? (
              <p className="text-sm opacity-80">Nessun evento.</p>
            ) : (
              <ul className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                {dayEvents
                  .sort((a, b) => new Date(a.start) - new Date(b.start))
                  .map((ev, idx) => {
                    const start = new Date(ev.start);
                    const end = ev.end ? new Date(ev.end) : null;
                    const time = ev.allDay
                      ? "Tutto il giorno"
                      : `${start.toLocaleTimeString("it-IT", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}${
                          end
                            ? ` – ${end.toLocaleTimeString("it-IT", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}`
                            : ""
                        }`;

                    return (
                      <li
                        key={ev.id || idx}
                        className="rounded-xl border p-3"
                        style={{
                          borderColor: "#F5F5DC",
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        <div className="text-sm font-medium truncate">
                          {ev.title || "Senza titolo"}
                        </div>
                        <div className="text-xs opacity-80">{time}</div>
                        {ev.location && (
                          <div className="text-xs opacity-80 mt-1 truncate">
                            📍 {ev.location}
                          </div>
                        )}
                        {ev.description && (
                          <div className="text-xs opacity-80 mt-1 line-clamp-3">
                            {ev.description}
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Stile mobile */}
      <style>{`
        @media (max-width: 639px) {
          .mobile-daycell { padding: 0 !important; min-height: 56px; background: #FFFFFF; }
          .fc .fc-daygrid-day-frame { padding: 2px 2px 22px 2px; }
          .fc .fc-daygrid-day-top { display: none; }
          .fc .fc-toolbar-title { font-size: 1rem; font-weight: 600; color: #1F2937; }
          .fc .fc-col-header-cell-cushion { padding: 6px 0; font-size: 0.75rem; color: #1F2937; }

          
          .fc .fc-daygrid-day-events {
            position: absolute; left: 4px; right: 4px; bottom: 4px;
            display: flex; flex-direction: column; gap: 4px; overflow: hidden;
            max-height: 28px;
          }

          
          .fc .fc-daygrid-event-harness { margin: 0; }
          .fc .fc-more-link { color: #006450; }
        }
        
        .fc a { color: #006450; }
        .fc .fc-highlight { background: #FFFDD0; }
        .fc .fc-daygrid-day-number { color: #1F2937; }
      `}</style>
    </div>
  );
}
