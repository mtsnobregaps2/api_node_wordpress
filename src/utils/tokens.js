// token.js é encarregado de gerenciar os tokens da campanha e origem
// A ideia é organizar é validar de qual plubicação os dados estão vindo

require('dotenv').config();

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

function validarTokenCampanha(token) {
  return TOKENS_VALIDOS[token] || null;
}

module.exports = { validarTokenCampanha };