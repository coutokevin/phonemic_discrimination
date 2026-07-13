PennController.ResetPrefix(null);

// =============================================================
// SEQUÊNCIA DE EXECUÇÃO
// =============================================================
Sequence(
    "boas_vindas", 
    "instrucoes_teste", 
    randomize("teste_ax"), 
    "instrucoes_experimento", 
    randomize("experimento_ax"), 
    "agradecimento"
);

// =============================================================
// TELA 1: Boas-vindas e Coleta de Dados
// =============================================================
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
                              "<i>Se você ficar em dúvida entre um nível e outro, selecione o nível mais avançado dos dois que você está em dúvida.</i><br><br>")
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
    newButton("proximo", "Iniciar")
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
    newVar("global_nome")
        .global()
        .set( getTextInput("nome_participante") )
    ,
    newVar("global_nivel")
        .global()
        .set( getScale("nivel_ingles") )
)
.log("nome_participante", getVar("global_nome"))
.log("nivel_ingles", getVar("global_nivel"));


// =============================================================
// TELA 2: Instruções da Fase de Teste
// =============================================================
newTrial("instrucoes_teste",
    newText("titulo_treino", "Fase de Teste")
        .css("font-size", "24px")
        .css("font-weight", "bold")
        .center()
        .print()
    ,
    newText("espaco1_teste", "<br><br>").print()
    ,
    newText("instrucoes", 
        "Esta é uma fase de testes para você se familiarizar com o experimento e entender como ele funciona.<br>" +
        "Por favor, <b>coloque seus fones de ouvido</b> e aproveite esta etapa para regular o volume do seu computador.<br><br>" +
        "Em cada tentativa, você verá uma cruz na tela e depois ouvirá duas palavras em sequência.<br><br>" +
        "Sua tarefa é julgar se as duas palavras são iguais ou diferentes:<br>" +
        "<ul>" +
        "<li>Pressione a tecla <b>V</b> se você acha que os estímulos são <b>DIFERENTES</b>.</li>" +
        "<li>Pressione a tecla <b>N</b> se você acha que os estímulos são <b>IGUAIS</b>.</li>" +
        "</ul>" +
        "Posicione seus dedos nas teclas V e N. Responda o mais rápido que puder!"
    )
        .center()
        .print()
    ,
    newText("espaco2_teste", "<br><br>").print()
    ,
    newButton("iniciar", "Iniciar Teste")
        .center()
        .print()
        .wait()
);

// =============================================================
// TELA 3: Teste (Itens 28, 37, 51)
// =============================================================
Template(
    GetTable("trials.csv")
        .filter( row => row.item == "28" || row.item == "37" || row.item == "51" ),
    row => newTrial("teste_ax",
        // Usamos uma variável global simples para armazenar o valor
        newFunction("reset_rt", () => { window.rt_final = "Timeout"; return null; }).call(),
        
        newText("cruz", "+")
            .css("font-size", "60px")
            .css("display", "flex")
            .css("justify-content", "center")
            .css("align-items", "center")
            .css("height", "40vh")
            .center()
            .print()
        ,
        newTimer("cruz_timer", 1000).start().wait(),
        getText("cruz").remove(),
        
        newImage("icone1", row.img_modelo)
            .size(60, 60)
            .css("display", "block")
            .css("margin", "15vh auto")
            .center()
            .print()
        ,
        newAudio("audio_modelo_teste", row.audio_modelo).play().wait(),
        getImage("icone1").remove(),
        
        newTimer("isi_teste", 200).start().wait(),
        
        newImage("icone2", row.img_modelo)
            .size(60, 60)
            .css("display", "block")
            .css("margin", "15vh auto")
            .center()
            .print()
        ,
        newAudio("audio_alvo_teste", row.audio_alvo).play().wait(),
        getImage("icone2").remove(),
        
        newFunction("marcar_inicio", () => { 
            window.tempo_inicio_teste = performance.now(); 
        }).call(),
        
        newKey("resposta_teste", "VN")
            .log("all")
            .callback( 
                // Atualiza a variável global JS diretamente
                newFunction("calcular_rt", () => {
                    window.rt_final = Math.round(performance.now() - window.tempo_inicio_teste);
                    console.log(`[DEBUG] RT calculado: ${window.rt_final}ms`);
                    return null;
                }).call(),
                getTimer("timeout_teste").stop()
            )
        ,
        newTimer("timeout_teste", 5000).start().wait(),
        getKey("resposta_teste").disable(),
        newTimer("buffer", 50).start().wait()
    )
    .log("nome_participante", getVar("nome_participante"))
    .log("item", row.item)
    .log("condicao", row.condicao)
    // AQUI A MUDANÇA: Usamos a função de log nativa do PCIBEX que lê o window.rt_final no encerramento
    .log("RT_Exato_ms", () => window.rt_final)
);

newTrial("instrucoes_experimento",
    newText("titulo_exp", "Fase Experimental")
        .css("font-size", "24px")
        .css("font-weight", "bold")
        .center()
        .print()
    ,
    newText("espaco1_exp", "<br><br>").print()
    ,
    newText("instrucoes_exp",
        "O treinamento acabou. Agora começaremos a <b>fase experimental</b>.<br><br>" +
        "Lembre-se da sua tarefa:<br>" +
        "<ul>" +
        "<li>Pressione a tecla <b>V</b> se você acha que os estímulos são <b>DIFERENTES</b>.</li>" +
        "<li>Pressione a tecla <b>N</b> se você acha que os estímulos são <b>IGUAIS</b>.</li>" +
        "</ul>" +
        "Concentre-se, mantenha seus dedos nas teclas V e N e responda o mais rápido que puder!"
    )
        .center()
        .print()
    ,
    newText("espaco2_exp", "<br><br>").print()
    ,
    newButton("iniciar_exp", "Iniciar Experimento")
        .center()
        .print()
        .wait()
);

// =============================================================
// TELA 5: Experimento Principal
// =============================================================
Template(
    GetTable("trials.csv"),
    row => newTrial("experimento_ax",
        // Inicializa a variável global JS para evitar conflitos
        newFunction("reset_rt_exp", () => { window.rt_final_exp = "Timeout"; return null; }).call(),
        
        newText("cruz_exp", "+")
            .css("font-size", "60px")
            .css("display", "flex")
            .css("justify-content", "center")
            .css("align-items", "center")
            .css("height", "40vh")
            .center()
            .print()
        ,
        newTimer("cruz_timer_exp", 1000).start().wait()
        ,
        getText("cruz_exp").remove()
        ,
        newImage("icone1_exp", row.img_modelo)
            .size(60, 60)
            .css("display", "block")
            .css("margin", "15vh auto")
            .center()
            .print()
        ,
        newAudio("audio_modelo_exp", row.audio_modelo)
            .play()
            .wait()
        ,
        getImage("icone1_exp").remove()
        ,
        newTimer("isi_exp", 200).start().wait()
        ,
        newImage("icone2_exp", row.img_alvo)
            .size(60, 60)
            .css("display", "block")
            .css("margin", "15vh auto")
            .center()
            .print()
        ,
        newAudio("audio_alvo_exp", row.audio_alvo)
            .play()
            .wait()
        ,
        // MARCO ZERO: Captura o momento em que o áudio terminou
        newFunction("marca_tempo_exp", () => window.tempo_fim_audio_exp = performance.now() ).call()
        ,
        getImage("icone2_exp").remove()
        ,
        newTimer("timeout_exp", 5000).start()
        ,
        newKey("resposta_exp", "VN")
            .log("all")
            .callback( 
                // CÁLCULO: Atualiza a variável global e loga no console para conferência
                newFunction("calcular_rt_exp", () => {
                    window.rt_final_exp = Math.round(performance.now() - window.tempo_fim_audio_exp);
                    console.log(`[DEBUG] RT Experimental (${row.item}): ${window.rt_final_exp}ms`);
                    return null;
                }).call(),
                getTimer("timeout_exp").stop() 
            )
        ,
        getTimer("timeout_exp").wait()
        ,
        getKey("resposta_exp").disable()
    )
    .log("item", row.item)
    .log("tipo", row.tipo)
    .log("condicao", row.condicao)
    .log("resposta_correta", row.resposta_correta)
    .log("audio_modelo", row.audio_modelo)
    .log("audio_alvo", row.audio_alvo)
    // APLICAÇÃO DA NOVA LÓGICA: Captura o valor final da janela global no encerramento do trial
    .log("RT_Exato_ms", () => window.rt_final_exp)
);

// =============================================================
// TELA 6: Agradecimento
// =============================================================
newTrial("agradecimento",
    newText("final", "Muito obrigado! Seus dados foram registrados.").center().print(),
    newButton("fim", "Finalizar").center().print().wait()
);
