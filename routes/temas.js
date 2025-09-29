import express from "express";
import { supabase } from "../utils/supabaseClient.js";

const router = express.Router();

// GET - buscar todos os temas
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("temas").select("id, nome");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
