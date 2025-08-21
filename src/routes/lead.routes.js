// lead.routes.js tem o papel de definir os endpoints da API e conectar controllers(lógica) e middlewares(verificação intermediária)

const express = require("express");
const { receberLead } = require("../controllers/lead.controller");
const { validarTokenSeguranca } = require("../middlewares/auth.middleware");

const router = express.Router();

// Definindo rota POST para receber leads
router.post("/", validarTokenSeguranca, receberLead);

module.exports = router;