PennController.ResetPrefix(null); // Permite usar os comandos sem o prefixo "PennController."

// Define a ordem das telas no experimento
Sequence("boas_vindas", "agradecimento");

// TELA 1: Boas-vindas e Coleta de Dados
newTrial("boas_vindas",
    newText("titulo", "Bem-vindo(a) ao Experimento!")
        .css("font-size", "24px")
        .css("font-weight", "bold")
        .print()
    ,
    newText("espaco1", "<br><br>").print()
    ,
    // Coleta do nome do participante
    newText("label_nome", "Por favor, insira seu nome e um sobrenome:")
        .print()
    ,
    newTextInput("nome_participante", "")
        .css("width", "300px")
        .print()
    ,
    newText("espaco2", "<br><br>").print()
    ,
    // Instrução para a autoavaliação baseada na escala CEFR adaptada
    newText("instrucao_escala", "Abaixo, selecione a opção que melhor descreve seu nível de inglês para <b>compreensão auditiva (Listening)</b>.<br>" +
                              "<i>Nota: Se você ficar em dúvida entre um nível e outro, selecione o nível mais avançado dos dois que você está em dúvida.</i>")
        .print()
    ,
    newText("espaco3", "<br>").print()
    ,
    // Criação dos botões de rádio (Scale) com as 6 opções solicitadas
    newScale("nivel_ingles",
        "1. Eu só entendo palavras isoladas e frases bem simples sobre mim, minha família e o que está ao meu redor, mas apenas se a pessoa falar bem devagar e de forma muito clara.",
        "2. Eu compreendo expressões do dia a dia (como compras, trabalho e informações pessoais básicas). Consigo entender o ponto principal de avisos públicos e mensagens curtas, simples e claras.[cite: 1]",
        "3. Eu entendo os pontos principais de conversas cotidianas sobre trabalho, escola ou lazer quando as pessoas falam de forma clara e padrão. Consigo compreender a ideia central de programas de rádio ou TV sobre notícias e assuntos do meu interesse se a fala for relativamente pausada.[cite: 1]",
        "4. Eu consigo acompanhar discursos longos e até palestras com argumentos complexos, desde que o assunto seja familiar. Entendo a maioria dos jornais de TV e quase todos os filmes falados no sotaque padrão do inglês.[cite: 1]",
        "5. Entendo conversas e discursos longos mesmo que eles não tenham uma estrutura muito clara ou quando as coisas ficam apenas subentendidas. Assisto a filmes e programas de TV sem fazer quase nenhum esforço.[cite: 1]",
        "6. Não tenho nenhuma dificuldade para entender qualquer tipo de linguagem falada, seja ao vivo ou na TV/internet. Entendo até mesmo nativos falando na velocidade normal deles, precisando apenas de um tempinho para se acostumar com sotaques diferentes.[cite: 1]"
    )
        .vertical() // Organiza as opções uma abaixo da outra
        .labelsPosition("right") // Texto à direita do botão de seleção
        .print()
    ,
    newText("espaco4", "<br><br>").print()
    ,
    // Botão para avançar
    newButton("proximo", "Iniciar Experimento")
        .center()
        .print()
        .wait(
            // Validações antes de prosseguir
            getTextInput("nome_participante").test.text(/[a-zA-Z]+/) // Garante que o nome não está vazio
                .and( getScale("nivel_ingles").test.selected() )     // Garante que uma opção foi marcada
                .failure(
                    newText("erro", "<span style='color:red;'>Por favor, preencha seu nome e selecione uma das opções antes de continuar.</span>")
                        .print()
                )
        )
    ,
    // Armazena o nome globalmente para usar na próxima tela
    newVar("global_nome")
        .global()
        .set( getTextInput("nome_participante") )
)
// Salva as variáveis diretamente nas colunas finais do arquivo de resultados (.csv)
.log("nome_participante", getTextInput("nome_participante"))
.log("nivel_ingles", getScale("nivel_ingles"));


// TELA 2: Agradecimento Final
newTrial("agradecimento",
    // Cria um elemento de texto inserindo diretamente o valor da variável global
    newText("texto_final", "Muito obrigado pela sua participação, ")
        .css("font-size", "18px")
        .center()
        .print()
    ,
    // Adiciona o nome guardado logo após o texto inicial
    newText("nome_na_tela", "")
        .css("font-size", "18px")
        .css("font-weight", "bold")
        .text( getVar("global_nome") ) // Forma correta de ler o Var no PCIbex
        .after( getText("texto_final") )
        .print()
    ,
    // Adiciona o ponto final da frase
    newText("ponto_final", "! Seus dados foram registrados.")
        .css("font-size", "18px")
        .after( getText("nome_na_tela") )
        .print()
    ,
    newText("espaco5", "<br><br>").print()
    ,
    // Botão finalizador
    newButton("finalizar", "Finalizar e Enviar")
        .center()
        .print()
        .wait()
);
