import express from "express";
import { supabase } from "../utils/supabaseClient.js";

const router = express.Router();

// GET - buscar todas as matérias
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("materias").select("id, nome, tema_id");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
