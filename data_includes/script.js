PennController.ResetPrefix(null); 

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
    newText("label_nome", "Por favor, insira seu nome completo:")
        .print()
    ,
    newTextInput("nome_participante", "")
        .css("width", "300px")
        .print()
    ,
    newText("espaco2", "<br><br>").print()
    ,
    newText("instrucao_escala", "Abaixo, selecione a opção que melhor descreve seu nível de inglês para <b>compreensão auditiva (Listening)</b>.<br>" +
                              "<i>Nota: Se você ficar em dúvida entre um nível e outro, selecione o nível mais avançado dos dois que você está em dúvida.</i><br><br>")
        .print()
    ,
    newText("espaco3", "<br>").print()
    ,
    newScale("nivel_ingles",
        "1. Eu só entendo palavras isoladas e frases bem simples sobre mim, minha família e o que está ao meu redor, mas apenas se a pessoa falar bem devagar e de forma muito clara.<br><br>",
        "2. Eu compreendo expressões do dia a dia (como compras, trabalho e informações pessoais básicas). Consigo entender o ponto principal de avisos públicos e mensagens curtas, simples e claras.<br><br>",
        "3. Eu entendo os pontos principais de conversas cotidianas sobre trabalho, escola ou lazer quando as pessoas falam de forma clara e padrão. Consigo compreender a ideia central de programas de rádio ou TV sobre notícias e assuntos do meu interesse se a fala for relativamente pausada.<br><br>",
        "4. Eu consigo acompanhar discursos longos e até palestras com argumentos complexos, desde que o assunto seja familiar. Entendo a maioria dos jornais de TV e quase todos os filmes falados no sotaque padrão do inglês.<br><br>",
        "5. Entendo conversas e discursos longos mesmo que eles não tenham uma estrutura muito clara ou quando as coisas ficam apenas subentendidas. Assisto a filmes e programas de TV sem fazer quase nenhum esforço.<br><br>",
        "6. Não tenho nenhuma dificuldade para entender qualquer tipo de linguagem falada, seja ao vivo ou na TV/internet. Entendo até mesmo nativos falando na velocidade normal deles, precisando apenas de um tempinho para se acostumar com sotaques diferentes.<br><br>"
    )
        .vertical() 
        .labelsPosition("right") 
        .print()
    ,
    newText("espaco4", "<br><br>").print()
    ,
    newButton("proximo", "Iniciar Experimento")
        .center()
        .print()
        .wait(
            getTextInput("nome_participante").test.text(/[a-zA-Z]+/) 
                .and( getScale("nivel_ingles").test.selected() )     
                .failure(
                    newText("erro", "<span style='color:red;'>Por favor, preencha seu nome e selecione uma das opções antes de continuar.</span>")
                        .print()
                )
        )
    ,
    // Cria e define a variável global antes de fechar a tela
    newVar("global_nome")
        .global()
        .set( getTextInput("nome_participante") )
    ,
    newVar("global_nivel")
        .global()
        .set( getScale("nivel_ingles") )
)
// Correção: Puxamos os dados salvos nos 'Var' globais para gerar as colunas no CSV de resultados
.log("nome_participante", getVar("global_nome"))
.log("nivel_ingles", getVar("global_nivel"));


// TELA 2: Agradecimento Final
newTrial("agradecimento",
    newText("texto_final", "Muito obrigado pela sua participação! Seus dados foram registrados.<br><br><br>")
        .css("font-size", "18px")
        .center()
        .print()
    ,
    newButton("finalizar", "Finalizar e Enviar")
        .center()
        .print()
        .wait()
);
