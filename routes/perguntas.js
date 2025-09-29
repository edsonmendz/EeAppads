// routes/perguntas.js
import express from "express";
import { supabase } from "../utils/supabaseClient.js";

const router = express.Router();

// GET /perguntas/:materiaId?limit=10
router.get("/:materiaId", async (req, res) => {
  try {
    const materiaId = Number(req.params.materiaId);
    if (!Number.isInteger(materiaId) || materiaId <= 0) {
      return res.status(400).json({ error: "materiaId inválido" });
    }

    // permite override via query ?qtd=5 (máximo 50)
    const requested = req.query.qtd ? Number(req.query.qtd) : 10;
    const qtd = Number.isNaN(requested) ? 10 : Math.max(1, Math.min(50, requested));

    // Chama a função RPC criada no Postgres
    const { data, error } = await supabase.rpc("get_random_perguntas", {
      materia_id_input: materiaId,
      qtd: qtd,
    });

    if (error) {
      console.error("RPC error:", error);
      return res.status(500).json({ error: error.message || error });
    }

    // data será um array de objetos com as colunas da tabela perguntas
    return res.json({ count: (data || []).length, perguntas: data || [] });
  } catch (err) {
    console.error("Erro ao buscar perguntas:", err);
    return res.status(500).json({ error: "Erro interno" });
  }
});

export default router;