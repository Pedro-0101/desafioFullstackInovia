import "dotenv/config";
import express from "express";
import { conectarMongo, limparBanco } from "./db";
// rotas
import pacienteRoutes from './routes/paciente.route'


const app = express();
app.use(express.json());

app.get("/api/saude", (_req, res) => res.json({ ok: true }));

// Rotas principais
app.use("/api/pacientes", pacienteRoutes);

const PORT = Number(process.env.PORT) || 4000;
const URI = process.env.MONGO_URI!;
if (!URI) throw new Error("MONGO_URI ausente no .env");

conectarMongo(URI)
  .then(async () => {
    await limparBanco();
    app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
  })
  .catch((e) => {
    console.error("❌ Erro ao conectar no MongoDB:", e);
    process.exit(1);
  });