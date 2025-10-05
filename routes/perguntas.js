import express from "express";
import { supabase } from "../utils/supabaseClient.js"; // Importa seu cliente Supabase

const router = express.Router();

/**
 * GET /api/perguntas/:temaId
 * Busca todas as perguntas de um tema específico utilizando a função RPC
 * get_perguntas_por_tema(_tema_id).
 */
router.get("/:temaId", async (req, res) => {
    const temaId = parseInt(req.params.temaId);

    // 1. Validação
    if (isNaN(temaId) || temaId <= 0) {
        return res.status(400).json({ message: "ID de Tema inválido." });
    }

    console.log(`[API] Requisição de perguntas para tema ID: ${temaId}`);

    // 2. Chamada RPC
    // O objeto passado para .rpc() deve ter o nome do parâmetro exato da função SQL
    const { data, error } = await supabase
        .rpc('get_perguntas_por_tema', { _tema_id: temaId }); 

    if (error) {
        console.error("ERRO na RPC get_perguntas_por_tema:", error);
        return res.status(500).json({ 
            message: "Falha ao carregar as perguntas do tema.", 
            details: error.message 
        });
    }

    // 3. Resposta de Sucesso
    // Retorna a lista de perguntas
    res.json(data);
});

export default router;