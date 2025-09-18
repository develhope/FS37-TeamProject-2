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
        `select * from utenti where email=$1`,
        [email]
      );
      if (!userExist) {
        await db.none(
          `INSERT INTO utenti (nome, cognome, codice_fiscale, email, password, data_di_nascita, luogo_di_nascita, indirizzo, cap, numero_civico, regione, citta, sesso, telefono, nazionalita)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
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
    const utenti = await db.many(`select * from utenti`);
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
      `SELECT * FROM utenti WHERE email = $1 AND password = $2`,
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

const getMedici = async (req, res) => {
  try {
    const medici = await db.many("SELECT * FROM medici");
    res.json(medici); // Restituisci i medici come JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore nel recupero dei medici" });
  }
};
const getServizi = async (req, res) => {
  try {
    const servizi = await db.many("SELECT * FROM servizi");
    res.json(servizi); // Restituisci i servizi come JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore nel recupero dei servizi" });
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

const updateAsl = async (req, res) => {
  const { id } = req.params; // L'ID dell'utente da aggiornare
  const { asl } = req.body; // Medico che l'utente ha selezionato

  try {
    // Aggiorna l'utente con l'asl scelto
    const result = await db.oneOrNone(
      `
      UPDATE utenti
      SET asl = $1  
      WHERE id = $2
      RETURNING *;
    `,
      [asl, id]
    );

    if (result) {
      res
        .status(200)
        .json({ message: "ASL aggiornato con successo", user: result });
    } else {
      res.status(404).json({ message: "Utente non trovato" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore durante l'aggiornamento dell'ASL" });
  }
};

const modificaDati = async (req, res) => {
  try {
    const { id } = req.params;
    const { utente } = req.body;
    await db.none(
      `UPDATE utenti SET nome=$1, cognome=$2, email=$3, telefono=$4 WHERE id=$5`,
      [utente.nome, utente.cognome, utente.email, utente.telefono, id]
    );
    res.status(200).json({ message: "Dati profilo aggiornati correttamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getPrenotazioni = async (req, res) => {
  const { id } = req.params;

  try {
    const prenotazioni = await db.any(
      `select
utenti.nome as nome_cliente,
utenti.cognome as cognome_cliente,
servizi.nome as nome_servizio,
servizi.tipologia as tipologia_servizio,
prenotazioni.data_prenotazione as data_prenotazione
from prenotazioni
join utenti on prenotazioni.id_utente = utenti.id
join servizi on prenotazioni.id_servizio = servizi.id
where id_utente=$1`,
      [id]
    );

    res.json(prenotazioni);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Errore nel recupero delle prenotazioni." });
  }
};

const aggiungiPrenotazione = async (req, res) => {
  const { id } = req.params; // id utente
  const { id_servizio, note } = req.body;

  try {
    await db.none(
      `INSERT INTO prenotazioni (id_utente, id_servizio, note)
       VALUES ($1, $2, $3)`,
      [id, id_servizio, note || null]
    );

    res.json({ message: "Prenotazione aggiunta con successo." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Errore nell'aggiunta della prenotazione." });
  }
};

const modificaPrenotazione = async (req, res) => {
  const { id, idServizio } = req.params;
  const { note } = req.body;

  try {
    await db.none(
      `UPDATE prenotazioni
       SET note = $1
       WHERE id_utente = $2 AND id_servizio = $3`,
      [note, id, idServizio]
    );

    res.json({ message: "Prenotazione aggiornata." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Errore nella modifica della prenotazione." });
  }
};

const eliminaPrenotazione = async (req, res) => {
  const { id, idServizio } = req.params;

  try {
    await db.none(
      `DELETE FROM prenotazioni
       WHERE id_utente = $1 AND id_servizio = $2`,
      [id, idServizio]
    );

    res.json({ message: "Prenotazione eliminata." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Errore nella cancellazione della prenotazione." });
  }
};

const getCentri = async (req, res) => {
  try {
    const centri = await db.many("SELECT * FROM asl");
    res.json(centri);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore nel recupero dell' ASL" });
  }
};

const getMedico = async (req, res) => {
  const { id } = req.params;

  try {
    const medico = await db.oneOrNone(
      `select * from medici
      where id=$1`,
      [id]
    );

    res.json(medico);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Nessun medico trovato." });
  }
};

const checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await db.oneOrNone(`Select * from utenti where email=$1`, [
      email,
    ]);
    if (result) {
      res.json({ message: "Email già registrata", check: false });
    } else {
      res.json({ message: "Email valida", check: true });
    }
  } catch (error) {
    console.error(error);
  }
};

const getAslUtente = async (req, res) => {
  const { id } = req.params;

  try {
    const utente = await db.oneOrNone(
      `SELECT asl.*, utenti.id as utente_id
       FROM utenti
       JOIN asl ON utenti.asl = asl.id
       WHERE utenti.id = $1`,
      [id]
    );

    if (!utente) {
      return res.status(404).json({ message: "ASL non trovata per l'utente" });
    }

    res.json(utente);
  } catch (error) {
    console.error("Errore nel recupero dell'ASL:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
};

export {
  registrazione,
  getAll,
  login,
  modificaDati,
  aggiungiPrenotazione,
  modificaPrenotazione,
  eliminaPrenotazione,
  getPrenotazioni,
  getMedici,
  updateMedico,
  getCentri,
  getMedico,
  updateAsl,
  checkEmail,
  getAslUtente,
  getServizi,
};
