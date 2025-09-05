import db from "../db.js";

const registrazione = async (req, res) => {
  const { utente } = req.body;
  try {
    if (utente) {
      const {
        nome,
        cognome,
        codice_fiscale,
        email,
        password,
        data_di_nascita,
        luogo_di_nascita,
        indirizzo,
        cap,
        numero_civico,
        regione,
        citta,
        sesso,
        telefono,
        nazionalita,
      } = utente;

      const userExist = await db.oneOrNone(
        `
    select * from utenti
    where email=$1
    `,
        [email]
      );
      if (!userExist) {
        await db.none(
          `INSERT INTO utenti (nome, cognome, codice_fiscale, email, password, data_di_nascita, luogo_di_nascita, indirizzo, cap, numero_civico, regione, citta, sesso, telefono, nazionalita)
             VALUES
             ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
             `,
          [
            nome,
            cognome,
            codice_fiscale,
            email,
            password,
            data_di_nascita,
            luogo_di_nascita,
            indirizzo,
            cap,
            numero_civico,
            regione,
            citta,
            sesso,
            telefono,
            nazionalita,
          ]
        );
        res.status(201).json({ message: "Registrato con successo" });
      } else {
        res.status(400).json({ message: "Utente gia' registrato" });
      }
    } else {
      res.status(400).json({ message: "Dati mancanti" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const utenti = await db.many(`
        select * from utenti
        `);
    res.json(utenti);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export { registrazione, getAll };
