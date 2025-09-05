import dotenv from "dotenv";
import pgPromise from "pg-promise";

dotenv.config();

const db = pgPromise({})(process.env.URL);

const createTables = async () => {
  try {
    await db.none(`
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
        nazionalita TEXT NOT NULL
      )
    `);

    await db.none(`
      CREATE TABLE IF NOT EXISTS centri (
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

    await db.none(`
      CREATE TABLE IF NOT EXISTS servizi (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        detraibilita BOOLEAN DEFAULT false,
        tipologia TEXT NOT NULL
      )
    `);

    await db.none(`
      CREATE TABLE IF NOT EXISTS centro_servizi (
        id_centro INTEGER NOT NULL,
        id_servizio INTEGER NOT NULL,
        disponibilita INTEGER NOT NULL CHECK (disponibilita >= 0),
        PRIMARY KEY (id_centro, id_servizio),
        FOREIGN KEY (id_centro) REFERENCES centri(id),
        FOREIGN KEY (id_servizio) REFERENCES servizi(id)
      )
    `);

    await db.none(`
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
        disponibilita BOOLEAN NOT NULL
      )
    `);

    await db.none(`
      CREATE TABLE IF NOT EXISTS centro_medici (
        id_centro INTEGER NOT NULL,
        id_medico INTEGER NOT NULL,
        PRIMARY KEY (id_centro, id_medico),
        FOREIGN KEY (id_centro) REFERENCES centri(id),
        FOREIGN KEY (id_medico) REFERENCES medici(id)
      )
    `);
  } catch (error) {
    console.error(error);
  }
};

createTables().catch((e) => console.error(e));

export default db;
