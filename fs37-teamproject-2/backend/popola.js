import db from "./db.js";

const seedData = async () => {
  try {
    await db.tx(async (t) => {
      // 1. Popola utenti
      await t.none(
        `INSERT INTO utenti (nome, cognome, codice_fiscale, email, password, data_di_nascita, luogo_di_nascita, indirizzo, cap, numero_civico, regione, citta, sesso, telefono, nazionalita)
         VALUES
         ('Luca', 'Rossi', 'RSSLCU85M01H501U', 'luca.rossi@example.com', 'pass123', '1985-05-01', 'Milano', 'Via Roma', '20100', '10', 'Lombardia', 'Milano', 'M', '1234567890', 'Italiana'),
         ('Anna', 'Bianchi', 'BNCHAN90A41F205X', 'anna.bianchi@example.com', 'pass456', '1990-10-15', 'Torino', 'Via Torino', '10100', '20', 'Piemonte', 'Torino', 'F', '0987654321', 'Italiana')`
      );

      // 2. Popola centri
      await t.none(
        `INSERT INTO centri (nome, codice_identificativo, email, indirizzo, cap, numero_civico, regione, citta, telefono)
         VALUES
         ('Centro Salute Milano', 'CSM001', 'info@csm.it', 'Via Milano', '20100', '5', 'Lombardia', 'Milano', '0222334455'),
         ('Centro Medico Torino', 'CMT002', 'contatti@cmt.it', 'Via Torino', '10100', '12', 'Piemonte', 'Torino', '011223344')`
      );

      // 3. Popola servizi
      await t.none(
        `INSERT INTO servizi (nome, detraibilita, tipologia)
         VALUES
         ('Visita Generica', true, 'Ambulatoriale'),
         ('Analisi del Sangue', false, 'Diagnostica')`
      );

      // 4. Popola centro_servizi (associati via foreign key)
      await t.none(
        `INSERT INTO centro_servizi (id_centro, id_servizio, disponibilita)
         VALUES
         (1, 1, 10),
         (1, 2, 5),
         (2, 1, 8)`
      );

      // 5. Popola medici
      await t.none(
        `INSERT INTO medici (nome, cognome, codice_fiscale, email, indirizzo, cap, numero_civico, regione, citta, sesso, telefono, specializzazione, disponibilita)
         VALUES
         ('Marco', 'Verdi', 'VRDMRC70A01C352X', 'marco.verdi@medici.it', 'Via Medici', '20100', '7', 'Lombardia', 'Milano', 'M', '0312345678', 'Cardiologia', true),
         ('Giulia', 'Neri', 'NERGLI92B22D612Y', 'giulia.neri@medici.it', 'Via Sanità', '10100', '3', 'Piemonte', 'Torino', 'F', '0321987654', 'Dermatologia', true)`
      );

      // 6. Popola centro_medici
      await t.none(
        `INSERT INTO centro_medici (id_centro, id_medico)
         VALUES
         (1, 1),
         (2, 2)`
      );
    });

    console.log("Popolamento completato!");
  } catch (error) {
    console.error("Errore durante il popolamento:", error);
  }
};

seedData();
