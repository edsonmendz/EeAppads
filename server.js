import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

// Configurações
dotenv.config({ path: ".env" });

import temasRoutes from "./routes/temas.js";
import materiasRoutes from "./routes/materias.js";
import estruturaRouter from './routes/estrutura.js';
import perguntasRouter from './routes/perguntas.js';

const app = express();
app.use(cors());
app.use(express.json());


// ---------------------
// Rate limiting
// ---------------------

// Limitador global (opcional, protege todas as rotas)
const globalLimiter = rateLimit({
  windowMs: 2 * 1000, // 2 segundos
  max: 5, // até 5 consultas por IP por 2 segundos
  message: {
    error: "Você excedeu o número de requisições permitidas. Tente novamente em 2 segundos."
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// Limitador específico para rotas de perguntas
const perguntasLimiter = rateLimit({
  windowMs: 2 * 1000, // 2 segundos
  max: 5, // até 5 consultas por IP por 2 segundos
  message: { error: "Muitas consultas em pouco tempo. Espere 2 segundos." },
});
app.use("/perguntas", perguntasLimiter);

// ---------------------
// Rotas
// ---------------------

// Rota de teste
app.get("/", (req, res) => {
  res.send("Backend com Supabase funcionando 🚀");
});

// Rotas organizadas
app.use('/api/estrutura', estruturaRouter);
app.use('/api/perguntas', perguntasRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
