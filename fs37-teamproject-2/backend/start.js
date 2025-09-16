import db from "./db.js";

async function start() {
  try {
    await db.tx(async (t) => {
      await t.none(" DROP TABLE IF EXISTS prenotazioni CASCADE");
      await t.none(" DROP TABLE IF EXISTS asl_medici CASCADE");
      await t.none(" DROP TABLE IF EXISTS asl_servizi CASCADE");
      await t.none(" DROP TABLE IF EXISTS medici");
      await t.none(" DROP TABLE IF EXISTS asl");
      await t.none(" DROP TABLE IF EXISTS servizi");
      await t.none(" DROP TABLE IF EXISTS utenti");

      await t.none(`
                    CREATE TABLE IF NOT EXISTS utenti (
                        id SERIAL PRIMARY KEY,
                        nome VARCHAR(100) NOT NULL,
                        cognome VARCHAR(100) NOT NULL,
                        codice_fiscale CHAR(16) NOT NULL UNIQUE,
                        email TEXT NOT NULL UNIQUE,
                        password TEXT NOT NULL,
                        data_di_nascita DATE,
                        data_di_registrazione TIMESTAMP DEFAULT NOW(),
                        luogo_di_nascita TEXT NOT NULL,
                        indirizzo TEXT NOT NULL,
                        cap VARCHAR(5) NOT NULL CHECK (cap ~ '^[0-9]{5}$'),
                        numero_civico TEXT NOT NULL,
                        regione TEXT NOT NULL,
                        citta TEXT NOT NULL,
                        sesso CHAR(1),
                        telefono VARCHAR(15),
                        nazionalita TEXT NOT NULL,
                        medico int,
                        asl_id INT REFERENCES asl(id)
                    )
    `);

      await t.none(`
      CREATE TABLE IF NOT EXISTS asl (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        codice_identificativo VARCHAR(30) NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        indirizzo TEXT NOT NULL,
        cap VARCHAR(5) NOT NULL CHECK (cap ~ '^[0-9]{5}$'),
        numero_civico TEXT NOT NULL,
        regione TEXT NOT NULL,
        citta TEXT NOT NULL,
        telefono VARCHAR(15) NOT NULL
      )
    `);

      await t.none(`
      CREATE TABLE IF NOT EXISTS medici (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        cognome VARCHAR(100) NOT NULL,
        codice_fiscale CHAR(16) NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        indirizzo TEXT NOT NULL,
        cap VARCHAR(5) NOT NULL CHECK (cap ~ '^[0-9]{5}$'),
        numero_civico TEXT NOT NULL,
        regione TEXT NOT NULL,
        citta TEXT NOT NULL,
        sesso CHAR(1),
        telefono VARCHAR(15) NOT NULL,
        specializzazione TEXT NOT NULL,
        disponibilita BOOLEAN NOT NULL,
        foto TEXT
      )
    `);

      await t.none(`
      CREATE TABLE IF NOT EXISTS servizi (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        detraibilita BOOLEAN DEFAULT false,
        tipologia TEXT NOT NULL
      )
    `);

      // Una sola tabella prenotazioni
      await t.none(`
      CREATE TABLE IF NOT EXISTS prenotazioni (
        id SERIAL PRIMARY KEY,
        id_utente INTEGER NOT NULL,
        id_servizio INTEGER NOT NULL,
        id_medico INTEGER NOT NULL,
        data_prenotazione TIMESTAMP DEFAULT NOW(),
        

        FOREIGN KEY (id_utente) REFERENCES utenti(id) ON DELETE CASCADE,
        FOREIGN KEY (id_servizio) REFERENCES servizi(id) ON DELETE CASCADE,
        FOREIGN KEY (id_medico) REFERENCES medici(id) ON DELETE CASCADE
      )
    `);

      await t.none(`
      CREATE TABLE IF NOT EXISTS asl_servizi (
        id_asl INTEGER NOT NULL,
        id_servizio INTEGER NOT NULL,
        disponibilita INTEGER NOT NULL CHECK (disponibilita >= 0),
        PRIMARY KEY (id_asl, id_servizio),
        FOREIGN KEY (id_asl) REFERENCES asl(id),
        FOREIGN KEY (id_servizio) REFERENCES servizi(id)
      )
    `);

      await t.none(`
      CREATE TABLE IF NOT EXISTS asl_medici (
        id_asl INTEGER NOT NULL,
        id_medico INTEGER NOT NULL,
        PRIMARY KEY (id_asl, id_medico),
        FOREIGN KEY (id_asl) REFERENCES asl(id),
        FOREIGN KEY (id_medico) REFERENCES medici(id)
      )
    
      `);

      await t.none(`
        INSERT INTO utenti 
  (nome, cognome, codice_fiscale, email, password, data_di_nascita, luogo_di_nascita, indirizzo, cap, numero_civico, regione, citta, sesso, telefono, nazionalita) 
VALUES
('Luca', 'Rossi', 'RSSLCU90A01H501U', 'luca.rossi@example.com', 'password123', '1990-01-01', 'Palermo', 'Via Roma', '90100', '10', 'Sicilia', 'Palermo', 'M', '3331112222', 'Italiana'),
('Maria', 'Bianchi', 'BNCMRA85C41F205Z', 'maria.bianchi@example.com', 'securePass', '1985-03-01', 'Roma', 'Via Milano', '00100', '25', 'Lazio', 'Roma', 'F', '3332223333', 'Italiana'),
('Giuseppe', 'Verdi', 'VRDGPP78D15C351A', 'giuseppe.verdi@example.com', 'giusPass', '1978-04-15', 'Napoli', 'Corso Garibaldi', '80100', '45', 'Campania', 'Napoli', 'M', '3333334444', 'Italiana'),
('Anna', 'Russo', 'RSSNNA92E20H224F', 'anna.russo@example.com', 'annaPass', '1992-05-20', 'Firenze', 'Via della LibertÃ ', '50100', '12', 'Toscana', 'Firenze', 'F', '3334445555', 'Italiana'),
('Francesco', 'Esposito', 'SPSFNC88F10H703G', 'francesco.esposito@example.com', 'franPass', '1988-06-10', 'Bari', 'Via Dante', '70100', '30', 'Puglia', 'Bari', 'M', '3335556666', 'Italiana'),
('Chiara', 'Romano', 'RMNCHR95G25H501X', 'chiara.romano@example.com', 'chiaraPass', '1995-07-25', 'Catania', 'Via Etnea', '95100', '77', 'Sicilia', 'Catania', 'F', '3336667777', 'Italiana'),
('Davide', 'Ferrari', 'FRRDVD82H14F205T', 'davide.ferrari@example.com', 'davidePass', '1982-08-14', 'Torino', 'Via Po', '10100', '5', 'Piemonte', 'Torino', 'M', '3337778888', 'Italiana'),
('Elisa', 'Conti', 'CNTELS99I30H501M', 'elisa.conti@example.com', 'elisaPass', '1999-09-30', 'Genova', 'Via XX Settembre', '16100', '88', 'Liguria', 'Genova', 'F', '3338889999', 'Italiana'),
('Stefano', 'Gallo', 'GLLSTF75L05H224H', 'stefano.gallo@example.com', 'stefanoPass', '1975-12-05', 'Milano', 'Via Manzoni', '20100', '100', 'Lombardia', 'Milano', 'M', '3339990000', 'Italiana'),
('Sara', 'Fontana', 'FNTSRA91M22H703Y', 'sara.fontana@example.com', 'saraPass', '1991-11-22', 'Verona', 'Piazza Bra', '37100', '3', 'Veneto', 'Verona', 'F', '3330001111', 'Italiana');`);

      // 2. Popola medici (devono essere inseriti prima di centro_medici e prenotazioni)
      await t.none(`
        INSERT INTO medici (nome, cognome, codice_fiscale, email, indirizzo, cap, numero_civico, regione, citta, sesso, telefono, specializzazione, disponibilita, foto)
        VALUES
          ('Marco', 'Verdi', 'VRDMRC70A01C352X', 'marco.verdi@medici.it', 'Via Medici', '20100', '7', 'Lombardia', 'Milano', 'M', '0312345678', 'Cardiologia', true, 'https://randomuser.me/api/portraits/men/20.jpg'),
          ('Giulia', 'Neri', 'NERGLI92B22D612Y', 'giulia.neri@medici.it', 'Via Sanità', '10100', '3', 'Piemonte', 'Torino', 'F', '0321987654', 'Dermatologia', true, 'https://randomuser.me/api/portraits/women/66.jpg');
      `);

      // 3. Popola asl
      await t.none(`
        INSERT INTO asl (nome, codice_identificativo, email, indirizzo, cap, numero_civico, regione, citta, telefono)
        VALUES
          ('Centro Salute Milano', 'CSM001', 'info@csm.it', 'Via Milano', '20100', '5', 'Lombardia', 'Milano', '0222334455'),
          ('Centro Medico Torino', 'CMT002', 'contatti@cmt.it', 'Via Torino', '10100', '12', 'Piemonte', 'Torino', '011223344');
      `);

      // 4. Popola servizi (devono essere inseriti prima di centro_servizi)
      await t.none(`
        INSERT INTO servizi (nome, detraibilita, tipologia)
        VALUES
          ('Visita Generica', true, 'Ambulatoriale'),
          ('Analisi del Sangue', false, 'Diagnostica');
      `);

      // 5. Popola centro_servizi (associati via foreign key, id_centro e id_servizio devono esistere)
      await t.none(`
        INSERT INTO asl_servizi (id_asl, id_servizio, disponibilita)
        VALUES
          (1, 1, 10),
          (1, 2, 5),
          (2, 1, 8);
      `);

      // 6. Popola centro_medici (associa medici ai centri, id_centro e id_medico devono esistere)
      await t.none(`
        INSERT INTO asl_medici (id_asl, id_medico)
        VALUES
          (1, 1),
          (2, 2);
      `);

      // 7. Popola prenotazioni (ora che i medici e i servizi sono popolati)
      await t.none(`
        INSERT INTO prenotazioni (id_medico, id_servizio, data_prenotazione, id_utente) VALUES 
          (1, 1, '2025-10-10 10:00:00',1),
          (2, 2, '2025-10-11 14:30:00',1),
          (1, 1, '2025-10-12 11:00:00',1);
      `);
    });
    console.log("Operazione completata");
  } catch (err) {
    console.log(err);
  }
}

start().catch((error) => console.error(error));
