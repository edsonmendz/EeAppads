import express from "express";
import { supabase } from "../utils/supabaseClient.js"; 

const router = express.Router();

/**
 * GET /api/perguntas
 * Busca perguntas de um tema, aplicando filtros de nível e limite de quantidade
 * através de Query Parameters.
 * Exemplo de URL: /api/perguntas?temaId=801&niveis=1,2,5&quantidade=30
 */
router.get("/", async (req, res) => {
    // 1. Receber e validar os parâmetros da Query String (req.query)
    const { temaId, niveis, quantidade } = req.query;

    // Conversão e validações
    const tema_id = parseInt(temaId);
    const quantidade_limite = parseInt(quantidade);
    
    // TRATAMENTO CRUCIAL:
    // 1. Pega a string "1,2,5"
    // 2. Faz o split por vírgula -> ["1", "2", "5"]
    // 3. Converte cada item para INT
    const niveis_array = (niveis && typeof niveis === 'string') 
        ? niveis.split(',').map(n => parseInt(n.trim()))
        : [];
    
    // Filtra IDs que não são números válidos ou menores que 1
    const niveis_validos = niveis_array.filter(n => !isNaN(n) && n >= 1);

    if (isNaN(tema_id) || tema_id <= 0 || niveis_validos.length === 0 || isNaN(quantidade_limite) || quantidade_limite <= 0) {
        return res.status(400).json({ 
            message: "Parâmetros inválidos. É necessário temaId, níveis (ex: 1,2,5) e a quantidade." 
        });
    }

    console.log(`[API] Buscando ${quantidade_limite} perguntas para Tema ID ${tema_id} nos Níveis: [${niveis_validos.join(', ')}]`);

    // 2. Chamada RPC
    const { data, error } = await supabase
        .rpc('get_perguntas_personalizadas', { 
            _tema_id: tema_id,
            _niveis_array: niveis_validos, // Array de números
            _quantidade_limite: quantidade_limite
        }); 

    if (error) {
        console.error("ERRO na RPC get_perguntas_personalizadas:", error);
        return res.status(500).json({ 
            message: "Falha ao carregar as perguntas personalizadas.", 
            details: error.message 
        });
    }

    // 3. Resposta de Sucesso
    res.json(data);
});

export default router;