import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Configurações
dotenv.config({ path: ".env" });

import temasRoutes from "./routes/temas.js";
import materiasRoutes from "./routes/materias.js";
import perguntasRoutes from "./routes/perguntas.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("Backend com Supabase funcionando 🚀");
});

// Rotas organizadas
app.use("/temas", temasRoutes);
app.use("/materias", materiasRoutes);
app.use("/perguntas", perguntasRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
