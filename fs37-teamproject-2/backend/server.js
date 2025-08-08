import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
const utenti = [];

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json(utenti);
})

app.post("/registrazione", (req, res) => {
const {utente} = req.body;
if(utente) {
    utenti.push(utente);

    res.status(201).json({message: "Registrato con successo"});
} else {
    res.status(400).json({message: "Errore invio dati"});
}
})










app.listen(PORT, () => {
    console.log(`Sever attivo su http://localhost:${PORT}`);
})
