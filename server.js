import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Rota de teste
app.get("/", (req, res) => {
  res.send("E Vamos funcionar fácil????? 🚀");
});

// Buscar todos os temas
app.get("/temas", async (req, res) => {
  const { data, error } = await supabase.from("temas").select("id, nome");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Buscar todas as matérias
app.get("/materias", async (req, res) => {
  const { data, error } = await supabase.from("materias").select("id, nome, tema_id");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
