import express from "express";
import cors from "cors";
import { registrazione, getAll } from "./controllers/authControllers.js";
import dotenv from "dotenv";
import pgPromise from "pg-promise";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const db = pgPromise({})(process.env.URL);

console.log(db);

app.get("/", getAll);

app.post("/registrazione", registrazione);

app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});
