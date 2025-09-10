import express from "express";
import cors from "cors";
import {
  registrazione,
  getAll,
  login,
  prenotazioni,
  updateMedico,
  getMedici,
  modificaDati,
  modificaPrenotazione,
  aggiungiPrenotazione,
  eliminaPrenotazione,
  getPrenotazioni,
  getCentri,
} from "./controllers/authControllers.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", getAll);
app.get("/prenotazioni", prenotazioni);
app.get("/medici", getMedici);
app.get("/centri", getCentri);

app.post("/registrazione", registrazione);
app.post("/login", login);
app.post("/:id/modifica", modificaDati);
app.get("/utenti/:id/servizi", getPrenotazioni);
app.post("/utenti/:id/servizi", aggiungiPrenotazione);
app.put("/utenti/:id/servizi/:idServizio", modificaPrenotazione);
app.delete("/utenti/:id/servizi/:idServizio", eliminaPrenotazione);

app.put("/utenti/:id/medico", updateMedico);
app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});
