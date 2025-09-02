const utenti = [];

const registrazione = (req, res) => {
const {utente} = req.body;

if(utente) {
    utenti.push(utente);

    res.status(201).json({message: "Registrato con successo"});
} else {
    res.status(400).json({message: "Errore invio dati"});
}
}

const getAll = (req, res) => {
    res.json(utenti);
}

export { registrazione, getAll }