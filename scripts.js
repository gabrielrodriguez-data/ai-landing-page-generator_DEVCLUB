/* LÓGICA DE PROGRAMAÇÃO
Algoritmo - Passo a passo da aplicação:

[x] Saber quando o botão foi clicado
[x] Pegar o texto do TextArea
[x] Enviar para a IA (servidor)
[x] Pegar a resposta da IA
[x] Colocar na tela
    [x] Código
    [x] Resultado do Código 
[ ] Refinar nosso resultado 
*/

// Endpoint da API da Groq para processamento de linguagem
const endereco = "https://api.groq.com/openai/v1/chat/completions";

// Configuração da personalidade e regras de resposta da IA
const promptConfiguracao = `Você é um designer web premiado e Programador. Crie uma landing page COMPLETA e VISUALMENTE IMPRESSIONANTE para o negócio descrito.

Regras de resposta:
- Responda SOMENTE com HTML e CSS puros
- Não use crases, markdown ou explicações
- Não use tags <img>

Identidade visual:
- Invente uma paleta de cores única que combine com a essência do negócio
- Escolha uma Google Font marcante via @import
- Use emojis grandes no lugar de imagens
- Use CSS moderno: gradientes, sombras, animações sutis, layout generoso, tipografia forte

Estrutura da página:
- Header com nome do negócio e menu
- Hero impactante com título, subtítulo e botão CTA
- Seção de diferenciais com emojis
- Depoimento de cliente
- Footer com contato

Todo o conteúdo em português, criativo e específico para o negócio.`;

// AVISO: Mantenha sua chave de API em um arquivo .env ou em um local seguro
const apiKey = "SUA_CHAVE_AQUI"; 

/**
 * Função assíncrona disparada pelo clique no botão
 * Realiza a chamada à API e atualiza a interface com o resultado
 */
async function gerarCodigo() {
    // Captura o texto inserido pelo usuário no campo textarea
    const textarea = document.querySelector(".texto-pagina").value;

    // Requisição HTTP para a API da IA
    const resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {
                    "role": "user", // Prompt enviado pelo usuário
                    "content": textarea
                },
                {
                    "role": "system", // Definição de como a IA deve se comportar
                    "content": promptConfiguracao
                }
            ],
        })
    });

    // Processa a resposta recebida
    const dados = await resposta.json();
    const resultado = dados.choices[0].message.content;

    // Seleciona os elementos da tela onde o resultado será exibido
    const espacoCodigo = document.querySelector(".bloco-codigo");
    const espacoSite = document.querySelector(".bloco-site");

    // Exibe o código puro na área de texto
    espacoCodigo.textContent = resultado;
    
    // Renderiza o código como HTML dentro do iframe
    espacoSite.srcdoc = resultado;
}