// lead.controller.js é reponsável por processar a requisição, validar os campos, checar o token e decidir o que retornar.

// Instanciando o objeto que sera usado para utilizar a função de validar tokens 
const validar_token = require("../utils/tokens");


async function receberLead(req, res) {
  const { nome, email, telefone, empresa, cargo, token } = req.body;

  // Validação de campos obrigatórios
  if (!nome || !email || !telefone || !empresa || !cargo || !token) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  // Validação do token da campanha/origem
  const tokenInfo = validar_token.validarTokenCampanha(token);
  if (!tokenInfo) return res.status(401).json({ error: "Token de origem inválido." });

  // Processamento do lead (por enquanto só log)
  console.log("--- Novo Lead recebido ---");
  console.log(`Origem: ${tokenInfo.origem}`);
  console.log(`Campanha: ${tokenInfo.campanha}`);
  console.log("Dados recebidos:", req.body);
  console.log("-------------------------");

  // 4️⃣ Resposta para o cliente
  return res.status(200).json({ message: "Lead recebido com sucesso!" });
}

module.exports = { receberLead };