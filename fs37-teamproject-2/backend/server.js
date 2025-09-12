import express from "express";
import cors from "cors";
import {
  registrazione,
  getAll,
  login,
  updateMedico,
  getMedici,
  modificaDati,
  modificaPrenotazione,
  aggiungiPrenotazione,
  eliminaPrenotazione,
  getPrenotazioni,
  getCentri,
  getMedico,updateAsl
} from "./controllers/authControllers.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", getAll);
app.get("/medici", getMedici);
app.get("/asl", getCentri);
app.get("/utenti/:id/prenotazioni", getPrenotazioni);
app.get("/utenti/:id/medico", getMedico);

app.post("/registrazione", registrazione);
app.post("/login", login);
app.post("/:id/modifica", modificaDati);
app.post("/utenti/:id/servizi", aggiungiPrenotazione);

app.delete("/utenti/:id/servizi/:idServizio", eliminaPrenotazione);

app.put("/utenti/:id/servizi/:idServizio", modificaPrenotazione);
app.put("/utenti/:id/medico", updateMedico);
app.put("/utenti/:id/asl", updateAsl);

app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});
