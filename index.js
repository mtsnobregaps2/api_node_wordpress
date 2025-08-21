// Em Node.js, o arquivo index serve para iniciar o servidor.
// Nesse caso basta configurar o index para iniciar no servidor.

const app = require("./src/app.js"); //require é uma função para importar modulos, nesse caso tudo que esta na pasta app

// Definindo a porta do servidor, de acordo com a variavel de ambiente.
const PORT = process.env.PORT || 3000;

// Inicializndo o servidor para aceitar requisisções
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
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


