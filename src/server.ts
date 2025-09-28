import express from 'express';
import { createClient } from '@supabase/supabase-js';

// --- 🚨 1. CONFIGURAÇÃO DO SUPABASE (Substitua pelos seus valores reais) 🚨 ---
// Use a chave 'anon public' para operações de leitura
const SUPABASE_URL = 'https://hxbfemxrwmkeuqjsmvkj.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4YmZlbXhyd21rZXVxanNtdmtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2Nzk5NjAsImV4cCI6MjA3MzI1NTk2MH0.I4is_aYYTsOvTP4AoXDZrnjRl2CvTe39xmstCpRlcqk'; 

// Inicializa o cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const app = express();
const PORT = 8080;

app.use(express.json()); // Habilita o Express a ler o corpo das requisições como JSON

// --- Rota de Teste (Hello World) ---
app.get('/', (req, res) => {
    res.send('Hello World! Servidor Node.js rodando.');
});


// --- 2. Rota para Consultar a Tabela 'temas' ---
app.get('/temas', async (req, res) => {
    try {
        // A SDK abstrai a complexidade do PostgREST. É um comando simples!
        const { data: temas, error } = await supabase
            .from('temas') // Nome da sua tabela
            .select('id, nome'); // Colunas que queremos buscar

        if (error) {
            console.error('Erro ao buscar temas do Supabase:', error);
            // Retorna um erro 500 se o Supabase retornar um erro
            return res.status(500).json({ 
                message: 'Erro ao consultar o banco de dados.', 
                details: error.message 
            });
        }
        
        // Retorna a lista de temas (será automaticamente serializada para JSON)
        return res.json(temas);

    } catch (e: any) {
        console.error('Erro interno do servidor:', e);
        res.status(500).json({ 
            message: 'Erro interno no servidor.', 
            details: e.message 
        });
    }
});


// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express rodando em http://localhost:${PORT}`);
});