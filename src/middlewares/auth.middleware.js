// O auth.middleware.js consiste em centralizar a lógica de autenticação
// Um middleware do Express é uma função que intercepta a requisição antes que ela chegue ao controller.
// Nesse caso a ideia é verificar o token de segurança 

require('dotenv').config(); // Acessar os dados no arquivo .env
const token_seguranca = process.env.SECURE_TOKEN;

// req - dados da requisiçao(headers, body), res - envido da resposta, next - chama o proximo middleware
function validarTokenSeguranca(req, res, next){
    const authHeader = req.headers["authorization"]; // coleta do valor do cabeçalho autorization, por padrão "Bearer TOKEN" => [0, 1]
    const token = authHeader && authHeader.split(" ")[1]; // Valida se o coneudo existe se sim, divide a string em um array coletando o segundo elemento[1]

    if(!token){
        return res.status(401).json({ error: "Token de segurança não fornecido." });
    }
    if(token !== token_seguranca){
        return res.status(403).json({ error: "Token de segurança inválido." });
    }

    next();
 }
 
module.exports = { validarTokenSeguranca };