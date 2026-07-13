PennController.ResetPrefix(null); 

// Define a sequência exata de execução: Boas-vindas -> Treino -> Instruções Experimento -> Experimento -> Agradecimento
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
// TELA 3: FASE DE TESTE (Apenas 3 itens específicos)
// =============================================================
Template(
    GetTable("trials.csv")
        .filter( row => row.item == "28" || row.item == "37" || row.item == "51" ),
    row => newTrial("teste_ax",
        // Variável que guardará o Tempo de Reação (padrão é Timeout caso não responda)
        newVar("RT_medida_teste", "Timeout")
        ,
        newText("cruz", "+")
            .css("font-size", "60px")
            .css("display", "flex")
            .css("justify-content", "center")
            .css("align-items", "center")
            .css("height", "40vh")
            .center()
            .print()
        ,
        newTimer("cruz_timer", 1000).start().wait()
        ,
        getText("cruz").remove()
        ,
        newImage("icone1", row.img_modelo)
            .size(60, 60)
            .css("display", "block")
            .css("margin", "15vh auto")
            .center()
            .print()
        ,
        newAudio("audio_modelo_teste", row.audio_modelo)
            .play()
            .wait()
        ,
        getImage("icone1").remove()
        ,
        newTimer("isi_teste", 200).start().wait()
        ,
        newImage("icone2", row.img_alvo)
            .size(60, 60)
            .css("display", "block")
            .css("margin", "15vh auto")
            .center()
            .print()
        ,
        newAudio("audio_alvo_teste", row.audio_alvo)
            .play()
            .wait() // O SCRIPT ESPERA O ÁUDIO TERMINAR AQUI
        ,
        
        // MARCO ZERO: Registra o milissegundo exato em que o áudio alvo acabou
        newFunction("marca_tempo_teste", () => window.tempo_fim_audio_teste = Date.now() ).call()
        ,
        getImage("icone2").remove()
        ,
        
        newTimer("timeout_teste", 5000).start()
        ,
        newKey("resposta_teste", "VN")
            .log("all")
            .callback( 
                // CAPTURA DE RESPOSTA: Calcula o RT exato da tecla menos o marco zero
                getVar("RT_medida_teste").set( v => Date.now() - window.tempo_fim_audio_teste ),
                getTimer("timeout_teste").stop() 
            )
        ,
        getTimer("timeout_teste").wait()
        ,
        getKey("resposta_teste").disable()
    )
    .log("item", row.item)
    .log("tipo", "teste")
    .log("condicao", row.condicao)
    .log("resposta_correta", row.resposta_correta)
    // Cria a coluna no CSV com a medida isolada do Tempo de Reação em milissegundos
    .log("RT_Exato_ms", getVar("RT_medida_teste"))
);


// =============================================================
// TELA 4: Instruções da Fase Experimental
// =============================================================
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
// TELA 5: FASE EXPERIMENTAL PRINCIPAL (Todos os itens randomizados)
// =============================================================
Template(
    GetTable("trials.csv"),
    row => newTrial("experimento_ax",
        // Variável que guardará o Tempo de Reação (padrão é Timeout caso não responda)
        newVar("RT_medida_exp", "Timeout")
        ,
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
            .wait() // O SCRIPT ESPERA O ÁUDIO TERMINAR AQUI
        ,
        
        // MARCO ZERO: Registra o milissegundo exato em que o áudio alvo acabou
        newFunction("marca_tempo_exp", () => window.tempo_fim_audio_exp = Date.now() ).call()
        ,
        getImage("icone2_exp").remove()
        ,
        
        newTimer("timeout_exp", 5000).start()
        ,
        newKey("resposta_exp", "VN")
            .log("all")
            .callback( 
                // CAPTURA DE RESPOSTA: Calcula o RT exato da tecla menos o marco zero
                getVar("RT_medida_exp").set( v => Date.now() - window.tempo_fim_audio_exp ),
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
    // Cria a coluna no CSV com a medida isolada do Tempo de Reação em milissegundos
    .log("RT_Exato_ms", getVar("RT_medida_exp"))
);


// =============================================================
// TELA 6: Agradecimento Final
// =============================================================
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
