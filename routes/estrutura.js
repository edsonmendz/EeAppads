import express from "express";
import { supabase } from "../utils/supabaseClient.js"; // Importa seu cliente Supabase

const router = express.Router();

/**
 * GET /api/estrutura
 * Busca a hierarquia completa do menu (Categoria -> Provas -> Matérias -> Temas) 
 * utilizando uma função RPC do PostgreSQL (get_estrutura_menu).
 */
router.get("/", async (req, res) => {
    console.log("[API] Requisição de estrutura completa recebida.");
    
    // O método .rpc() chama uma função de banco de dados
    const { data, error } = await supabase
        .rpc('get_estrutura_menu'); // Nome da função SQL que criamos

    if (error) {
        console.error("ERRO na RPC get_estrutura_menu:", error);
        // Retorna um erro 500 para falhas no servidor
        return res.status(500).json({ 
            message: "Falha ao carregar a estrutura do menu.", 
            details: error.message 
        });
    }

    // A função get_estrutura_menu retorna um array de objetos JSON (SETOF JSON),
    // onde cada objeto é uma Categoria completa.
    // O Node.js/Express envia isso diretamente como a resposta JSON.
    res.json(data);
});

export default router;