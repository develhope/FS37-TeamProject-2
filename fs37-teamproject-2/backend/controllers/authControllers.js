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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await db.oneOrNone(
      `
      SELECT * FROM utenti WHERE email = $1 AND password = $2
      `,
      [email, password]
    );
    if (userExist) {
      res
        .status(200)
        .json({ message: "Login effettuato con successo", user: userExist });
    } else {
      res.status(404).json({ message: "Credenziali errate" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const prenotazioni = async (req, res) => {
  try {
    const result = await db.many(`
      SELECT p.id, s.nome AS servizio, m.nome AS medico, p.data_prenotazione, p.nome_cliente, p.telefono_cliente
      FROM prenotazioni p
      JOIN servizi s ON p.id_servizio = s.id
      JOIN medici m ON p.id_medico = m.id
    `);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getMedici = async (req, res) => {
  try {
    const medici = await db.many("SELECT * FROM medici");
    res.json(medici); // Restituisci i medici come JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore nel recupero dei medici" });
  }
};

const updateMedico = async (req, res) => {
  const { id } = req.params; // L'ID dell'utente da aggiornare
  const { medico } = req.body; // Medico che l'utente ha selezionato

  try {
    // Aggiorna l'utente con il medico scelto
    const result = await db.oneOrNone(
      `
      UPDATE utenti
      SET medico = $1  
      WHERE id = $2
      RETURNING *;
    `,
      [medico, id]
    );

    if (result) {
      res
        .status(200)
        .json({ message: "Medico aggiornato con successo", user: result });
    } else {
      res.status(404).json({ message: "Utente non trovato" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore durante l'aggiornamento del medico" });
  }
};

export { registrazione, getAll, login, prenotazioni, getMedici, updateMedico };
