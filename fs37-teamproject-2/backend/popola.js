import db from "./db.js";

const seedData = async () => {
  try {
    await db.tx(async (t) => {
      // 1. Elimina i dati esistenti (pulizia del DB)
      await t.none('DELETE FROM prenotazioni');
      await t.none('DELETE FROM centro_medici');
      await t.none('DELETE FROM centro_servizi');
      await t.none('DELETE FROM medici');
      await t.none('DELETE FROM centri');
      await t.none('DELETE FROM servizi');
      await t.none('DELETE FROM utenti');

      // 2. Popola medici (devono essere inseriti prima di centro_medici e prenotazioni)
      await t.none(`
        INSERT INTO medici (id, nome, cognome, codice_fiscale, email, indirizzo, cap, numero_civico, regione, citta, sesso, telefono, specializzazione, disponibilita)
        VALUES
          (1, 'Marco', 'Verdi', 'VRDMRC70A01C352X', 'marco.verdi@medici.it', 'Via Medici', '20100', '7', 'Lombardia', 'Milano', 'M', '0312345678', 'Cardiologia', true),
          (2, 'Giulia', 'Neri', 'NERGLI92B22D612Y', 'giulia.neri@medici.it', 'Via Sanità', '10100', '3', 'Piemonte', 'Torino', 'F', '0321987654', 'Dermatologia', true);
      `);

      // 3. Popola centri
      await t.none(`
        INSERT INTO centri (id, nome, codice_identificativo, email, indirizzo, cap, numero_civico, regione, citta, telefono)
        VALUES
          (1, 'Centro Salute Milano', 'CSM001', 'info@csm.it', 'Via Milano', '20100', '5', 'Lombardia', 'Milano', '0222334455'),
          (2, 'Centro Medico Torino', 'CMT002', 'contatti@cmt.it', 'Via Torino', '10100', '12', 'Piemonte', 'Torino', '011223344');
      `);

      // 4. Popola servizi (devono essere inseriti prima di centro_servizi)
      await t.none(`
        INSERT INTO servizi (id, nome, detraibilita, tipologia)
        VALUES
          (1, 'Visita Generica', true, 'Ambulatoriale'),
          (2, 'Analisi del Sangue', false, 'Diagnostica');
      `);

      // 5. Popola centro_servizi (associati via foreign key, id_centro e id_servizio devono esistere)
      await t.none(`
        INSERT INTO centro_servizi (id_centro, id_servizio, disponibilita)
        VALUES
          (1, 1, 10),
          (1, 2, 5),
          (2, 1, 8);
      `);

      // 6. Popola centro_medici (associa medici ai centri, id_centro e id_medico devono esistere)
      await t.none(`
        INSERT INTO centro_medici (id_centro, id_medico)
        VALUES
          (1, 1),
          (2, 2);
      `);

      // 7. Popola prenotazioni (ora che i medici e i servizi sono popolati)
      await t.none(`
        INSERT INTO prenotazioni (id_medico, id_servizio, data_prenotazione, nome_cliente, telefono_cliente)
        VALUES
          (1, 1, '2025-10-10 10:00:00', 'Mario Rossi', '3331234567'),
          (2, 2, '2025-10-11 14:30:00', 'Giulia Neri', '3349876543'),
          (1, 1, '2025-10-12 11:00:00', 'Luca Bianchi', '3359876543');
      `);

      console.log("Popolamento completato!");
    });
  } catch (error) {
    console.error("Errore durante il popolamento:", error);
  }
};

seedData();