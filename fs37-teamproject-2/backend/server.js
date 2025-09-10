import express from "express";
import cors from "cors";
import {
  registrazione,
  getAll,
  login,
  prenotazioni,
  updateMedico,
  getMedici,
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

app.post("/registrazione", registrazione);
app.post("/login", login);

app.put("/utenti/:id/medico", updateMedico); // Aggiungi la rotta PUT per l'aggiornamento del medico

app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});
