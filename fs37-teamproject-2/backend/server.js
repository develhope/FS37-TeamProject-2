import express from "express";
import cors from "cors";
import { registrazione, getAll } from "./controllers/authControllers";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", getAll)

app.post("/registrazione", registrazione) 

app.listen(PORT, () => {
    console.log(`Sever attivo su http://localhost:${PORT}`);
})
