// Em Node.js, node_modules é uma pasta que armazena todas as dependências de um projeto

//----------------- IMPORTANDO MODULOS
//Modulo express(framework) para lidar com rotas e middlewares
const express = require('express');

//Modulo cors para que o servidor aceite requisições de outro dominio(wordpress)
const cors = require('cors')

//Modulo express-rate-limite, basicamente serve para limitar a taxa de requisição
const rate_limit = require('express-rate-limit')

//Modulo para fazer requisições HTTP (como enviar dados para a API do Agendor).
//const fetch = require('node-fetch');

//Modulo que carrega variáveis de ambiente do arquivo .env (ex: senhas, tokens) para process.env.
require('dotenv').config();


//----------------Configuração da Aplicação
//Criando a apicação e definindo a porta que o servidor vai usar
const app = express();
//Define a porta do servidor, usando a variável de ambiente PORT ou a 3000 como padrão
const PORT = process.env.PORT || 3000;
//Pega o token de autenticação da Agendor do arquivo .env
//const AGENDOR_TOKEN = process.env.AGENDOR_TOKEN;


//----------------Middlewares globais
app.use(cors()); //Habilitando requisições de outras origens
app.use(express.json()); //Fazer o servidor interpretar json


//---------------Limite de requisições
//limitando requisições por IP
const limite = rate_limit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 10 // até 10 requisições por IP por minuto
});
app.use(limite);

const TOKENS_VALIDOS = {
  [process.env.TOKEN_1]: {
    origem: process.env.TOKEN_1_ORIGEM,
    campanha: process.env.TOKEN_1_CAMPANHA
  },
  [process.env.TOKEN_2]: {
    origem: process.env.TOKEN_2_ORIGEM,
    campanha: process.env.TOKEN_2_CAMPANHA
  }
};


// ------------Rotas da API
// Rota de teste simples para verificar se o servidor está online
app.get("/", (req, res) => {
    return res.json({ mensagem: "Nossa API está funcionando" });
});

// Rota principal que recebe os dados do formulário
// Usa o middleware de validação de token antes de processar a requisição
app.post('/lead', async (req, res) => {
  const { nome, email, telefone, empresa, cargo, token } = req.body;

  if (!nome || !email || !telefone || !empresa || !cargo || !token) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const tokenInfo = TOKENS_VALIDOS[token];
  if (!tokenInfo) {
    return res.status(401).json({ error: 'Token inválido.' });
  }



  console.log('--- Novo Lead recebido ---');
  console.log(`Origem: ${req.origem}`);
  console.log(`Campanha: ${req.campanha}`);
  console.log('Dados recebidos:', req.body);
  console.log('-------------------------');
  console.log('Lead recebido:', req.body); 
  return res.status(200).json({ message: 'Lead recebido com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});


/*
// ---- Funções de API
// Função assíncrona para enviar os dados do lead para a API do Agendor
async function enviarParaAgendor(leadData) {
    const agendorApiUrl = "https://api.agendor.com.br/v1/leads"; // Exemplo de URL
    
    // Mapeamento dos dados do formulário para o formato da API do Agendor
    // Você precisará ajustar os nomes dos campos para o formato que a Agendor espera
    const agendorPayload = {
        name: leadData.nome,
        company: leadData.empresa,
        contact_person: {
            name: leadData.nome,
            email: leadData.email,
            phone_number: leadData.telefone
        },
        source: leadData.origem, // Usamos a origem validada pelo middleware
        custom_fields: { // Campos personalizados da Agendor, se existirem
            'Campanha': leadData.campanha,
            'Cargo': leadData.cargo
        }
    };
    
    // Tenta fazer a requisição para a API do Agendor
    try {
        const response = await fetch(agendorApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${AGENDOR_TOKEN}` // Token de autenticação
            },
            body: JSON.stringify(agendorPayload)
        });
        
        // Verifica se a resposta da Agendor foi bem-sucedida
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro na API do Agendor: ${response.status} - ${errorText}`);
        }
        
        const result = await response.json();
        console.log("Lead enviado para Agendor com sucesso:", result);
        return { success: true, agendorResponse: result };

    } catch (error) {
        console.error("Erro ao enviar lead para o Agendor:", error);
        return { success: false, error: error.message };
    }
}
*/

























/*


// Tokens válidos (substitua isso por banco de dados ou JSON externo se quiser)


// Rota principal de recebimento
app.post('/lead', async (req, res) => {
  const { nome, email, telefone, empresa, cargo, token } = req.body;

  if (!nome || !email || !telefone || !empresa || !cargo || !token) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const origem = TOKENS_VALIDOS[token];
  if (!origem) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }

  // Enviar para Agendor
  try {
    const agendorResponse = await fetch('https://api.agendor.com.br/v3/people', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.AGENDOR_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nome,
        email: email,
        phones: [telefone],
        organization: empresa,
        tags: [origem.campanha],
        customFields: {
          cargo: cargo
        }
      })
    });

    if (!agendorResponse.ok) {
      const agendorError = await agendorResponse.text();
      return res.status(500).json({ error: 'Erro ao enviar para Agendor.', details: agendorError });
    }

    return res.status(200).json({ message: 'Lead enviado com sucesso.' });

  } catch (error) {
    return res.status(500).json({ error: 'Erro no servidor.', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});



*/


