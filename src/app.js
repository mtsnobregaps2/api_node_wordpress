// App.js contem toda a logica central do servior, sendo elas:
// importar modulos, configurar middleware, definir rotas 

//-------Impotando modulos----------
const express = require("express"); // framework principal para criar rotas e middlewares

const cors = require("cors"); // Middleware que permite que outros dominios façam requisições a API 

const rate_limit = require("express-rate-limit"); // Middleware que controla a taxa de requisições 
const limite = rate_limit({
    windowMs:60000,
    max: 2, //até duas requisições por minuto
    message: { error: "Você excedeu o limite de requisições. Tente novamente mais tarde." }
});

const rota_obter_lead = require("./routes/lead.routes.js");

//-------Criando a aplicação--------
const app = express(); 

// Habilitando os middleware na aplicação
app.use(cors());
app.use(limite);
app.use(express.json()); // Permite que o servidor interprete requisições em JSON.

// Definindo Rotas
app.use("/lead", rota_obter_lead);

//Healthcheck: Verificar se a API está online 
app.get("/", (req, res) => res.json({ mensagem: "A API está funcionando" }));

module.exports = app;