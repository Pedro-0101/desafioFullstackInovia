import "dotenv/config";
import express from "express";
import { conectarMongo } from "./db";
import { PacienteService } from "./services/paciente.service";

const app = express();
app.use(express.json());

app.get("/api/saude", (_req, res) => res.json({ ok: true }));

const PORT = Number(process.env.PORT) || 4000;
const URI = process.env.MONGO_URI!;
if (!URI) throw new Error("MONGO_URI ausente no .env");

conectarMongo(URI)
  .then(() =>
    app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`))
  )
  .catch((e) => {
    console.error("❌ Erro ao conectar no MongoDB:", e);
    process.exit(1);
  });