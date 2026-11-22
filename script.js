
/* =========================================
   TECHBLOG — JAVASCRIPT
========================================= */


/* =========================================
   1. MODO CLARO E ESCURO
========================================= */

const botaoTema = document.querySelector("#botao-tema");

const temaSalvo = localStorage.getItem("tema-techblog");

if (temaSalvo === "escuro") {
    document.body.classList.add("modo-escuro");
    botaoTema.textContent = "☀️";
} else {
    botaoTema.textContent = "🌙";
}

botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("modo-escuro");

    const modoEscuroAtivo = document.body.classList.contains("modo-escuro");

    botaoTema.textContent = modoEscuroAtivo ? "☀️" : "🌙";

    localStorage.setItem(
        "tema-techblog",
        modoEscuroAtivo ? "escuro" : "claro"
    );

});


/* =========================================
   2. CURTIDAS DOS ARTIGOS
========================================= */

const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach((botao, indice) => {

    const chave = `curtida-techblog-${indice}`;

    const contador = botao.querySelector("span");

    const curtidoSalvo = localStorage.getItem(chave) === "true";

    if (curtidoSalvo) {
        contador.textContent = "1";
        botao.classList.add("curtido");
    }

    botao.addEventListener("click", () => {

        const estaCurtido = botao.classList.toggle("curtido");

        contador.textContent = estaCurtido ? "1" : "0";

        localStorage.setItem(chave, estaCurtido);

    });

});


/* =========================================
   3. PESQUISA DE ARTIGOS
========================================= */

const formularioBusca = document.querySelector("#form-busca");
const campoBusca = document.querySelector("#campo-busca");
const mensagemBusca = document.querySelector("#mensagem-busca");

formularioBusca.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const pesquisa = campoBusca.value.trim().toLowerCase();

    const artigos = document.querySelectorAll(".card-artigo");

    let encontrados = 0;

    artigos.forEach((artigo) => {

        const conteudo = artigo.textContent.toLowerCase();

        const corresponde = conteudo.includes(pesquisa);

        artigo.style.display = corresponde ? "flex" : "none";

        if (corresponde) {
            encontrados++;
        }

    });

    if (pesquisa === "") {

        mensagemBusca.textContent = "Digite algo para pesquisar.";

    } else if (encontrados === 0) {

        mensagemBusca.textContent = "Nenhum artigo encontrado. Tente outro termo.";

    } else {

        mensagemBusca.textContent =
            `${encontrados} artigo(s) encontrado(s).`;

    }

    document.querySelector("#artigos").scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================================
   4. FILTRO POR CATEGORIA
========================================= */

const filtroCategoria = document.querySelector("#filtro-categoria");

filtroCategoria.addEventListener("change", () => {

    const categoriaSelecionada = filtroCategoria.value;

    const artigos = document.querySelectorAll(".card-artigo");

    let encontrados = 0;

    artigos.forEach((artigo) => {

        const categoria = artigo.dataset.categoria;

        const corresponde =
            categoriaSelecionada === "todos" ||
            categoria === categoriaSelecionada;

        artigo.style.display = corresponde ? "flex" : "none";

        if (corresponde) {
            encontrados++;
        }

    });

    mensagemBusca.textContent =
        encontrados === 0
            ? "Nenhum artigo encontrado nessa categoria."
            : `${encontrados} artigo(s) nessa categoria.`;

    campoBusca.value = "";

});


/* =========================================
   5. CURIOSIDADES ALEATÓRIAS
========================================= */

const curiosidades = [

    "A primeira página da World Wide Web foi criada por Tim Berners-Lee em 1991.",

    "O primeiro domínio registrado na internet foi symbolics.com, em 1985.",

    "O termo Wi-Fi não é uma abreviação oficial de Wireless Fidelity.",

    "O primeiro mouse de computador foi desenvolvido na década de 1960.",

    "A linguagem JavaScript foi criada em 1995.",

    "O primeiro e-mail foi enviado na década de 1970.",

    "A internet e a World Wide Web não são exatamente a mesma coisa.",

    "O código QR foi criado no Japão em 1994.",

    "O primeiro smartphone com tela sensível ao toque foi lançado muito antes dos modelos atuais.",

    "A inteligência artificial é uma área de estudo que existe há várias décadas."

];

const textoCuriosidade = document.querySelector("#texto-curiosidade");
const botaoSurpresa = document.querySelector("#botao-surpresa");

botaoSurpresa.addEventListener("click", () => {

    const indiceAleatorio = Math.floor(
        Math.random() * curiosidades.length
    );

    textoCuriosidade.textContent = curiosidades[indiceAleatorio];

});


/* =========================================
   6. PUBLICAÇÃO DE ARTIGOS
========================================= */

const formularioPublicacao = document.querySelector("#form-publicacao");

const mensagemPublicacao = document.querySelector("#mensagem-publicacao");

const listaPostagens = document.querySelector(".lista-postagens");

const chaveArtigos = "artigos-techblog";

let artigosSalvos = JSON.parse(
    localStorage.getItem(chaveArtigos)
) || [];


function criarArtigo(artigo, publicadoAgora = false) {

    const novoArtigo = document.createElement("article");

    novoArtigo.classList.add("card-artigo");

    novoArtigo.dataset.categoria = "outros";

    const imagem = document.createElement("img");

    imagem.alt = "Imagem do artigo";

    if (artigo.imagem) {

        imagem.src = artigo.imagem;

    } else {

        imagem.src = "imagens/tecnologia-futuro.jpg";

    }

    const conteudo = document.createElement("div");

    conteudo.classList.add("conteudo");

    const categoria = document.createElement("span");

    categoria.classList.add("categoria");

    categoria.textContent = artigo.categoria.toUpperCase();

    const titulo = document.createElement("h3");

    titulo.textContent = artigo.titulo;

    const autor = document.createElement("p");

    autor.classList.add("artigo-autor");

    autor.textContent = `Por: ${artigo.autor}`;

    const texto = document.createElement("p");

    texto.textContent = artigo.texto;

    const aviso = document.createElement("p");

    aviso.classList.add("artigo-fonte");

    aviso.textContent = publicadoAgora
        ? "Publicação demonstrativa • Salva neste navegador"
        : "Publicação demonstrativa";

    const acoes = document.createElement("div");

    acoes.classList.add("acoes-artigo");

    const botaoCurtir = document.createElement("button");

    botaoCurtir.classList.add("curtir");

    botaoCurtir.setAttribute("aria-label", "Curtir artigo");

    botaoCurtir.innerHTML = '❤️ <span>0</span>';

    botaoCurtir.addEventListener("click", () => {

        const contador = botaoCurtir.querySelector("span");

        const curtido = botaoCurtir.classList.toggle("curtido");

        contador.textContent = curtido ? "1" : "0";

    });

    const linkComentar = document.createElement("a");

    linkComentar.href = "#comentarios";

    linkComentar.textContent = "Comentar";

    acoes.append(botaoCurtir, linkComentar);

    conteudo.append(
        categoria,
        titulo,
        autor,
        texto,
        aviso,
        acoes
    );

    novoArtigo.append(imagem, conteudo);

    listaPostagens.prepend(novoArtigo);

}


artigosSalvos.forEach((artigo) => {

    criarArtigo(artigo);

});


formularioPublicacao.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const autor = document.querySelector("#nome-autor").value.trim();

    const titulo = document.querySelector("#titulo-artigo").value.trim();

    const categoria = document.querySelector("#categoria-artigo").value;

    const imagem = document.querySelector("#imagem-artigo").value.trim();

    const texto = document.querySelector("#texto-artigo").value.trim();

    if (!autor || !titulo || !categoria || !texto) {

        mensagemPublicacao.textContent =
            "Preencha todos os campos obrigatórios.";

        return;

    }

    const novoArtigo = {
        autor,
        titulo,
        categoria,
        imagem,
        texto
    };

    artigosSalvos.unshift(novoArtigo);

    try {

        localStorage.setItem(
            chaveArtigos,
            JSON.stringify(artigosSalvos)
        );

    } catch (erro) {

        artigosSalvos.shift();

        mensagemPublicacao.textContent =
            "Não foi possível salvar o artigo. Verifique o espaço disponível no navegador.";

        return;

    }

    criarArtigo(novoArtigo, true);

    mensagemPublicacao.textContent =
        "Seu artigo foi adicionado ao TechBlog neste navegador!";

    formularioPublicacao.reset();

    document.querySelector("#artigos").scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================================
   7. COMENTÁRIOS
========================================= */

const formularioComentario = document.querySelector("#form-comentario");

const listaComentarios = document.querySelector("#lista-comentarios");

const chaveComentarios = "comentarios-techblog";

let comentariosSalvos = JSON.parse(
    localStorage.getItem(chaveComentarios)
) || [];


function mostrarComentario(comentario) {

    const card = document.createElement("article");

    card.classList.add("comentario");

    const nome = document.createElement("h4");

    nome.textContent = comentario.nome;

    const texto = document.createElement("p");

    texto.textContent = comentario.texto;

    const data = document.createElement("small");

    data.textContent = comentario.data;

    card.append(nome, texto, data);

    listaComentarios.prepend(card);

}


if (comentariosSalvos.length > 0) {

    listaComentarios.innerHTML = "";

    comentariosSalvos.forEach((comentario) => {

        mostrarComentario(comentario);

    });

}


formularioComentario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const nome = document.querySelector("#nome-comentario").value.trim();

    const texto = document.querySelector("#texto-comentario").value.trim();

    if (!nome || !texto) {
        return;
    }

    const novoComentario = {

        nome,
        texto,

        data: new Date().toLocaleDateString("pt-BR")

    };

    comentariosSalvos.push(novoComentario);

    try {

        localStorage.setItem(
            chaveComentarios,
            JSON.stringify(comentariosSalvos)
        );

    } catch (erro) {

        comentariosSalvos.pop();

        alert("Não foi possível salvar o comentário neste navegador.");

        return;

    }

    listaComentarios.querySelector(".comentario-vazio")?.remove();

    mostrarComentario(novoComentario);

    formularioComentario.reset();

});


/* =========================================
   8. QUIZ
========================================= */

const perguntasQuiz = [

    {
        pergunta: "Qual linguagem é utilizada para estruturar páginas da web?",
        opcoes: ["Python", "HTML", "CSS", "SQL"],
        correta: 1
    },

    {
        pergunta: "Qual linguagem é utilizada para estilizar páginas?",
        opcoes: ["HTML", "Java", "CSS", "PHP"],
        correta: 2
    },

    {
        pergunta: "Qual destas opções é um navegador de internet?",
        opcoes: ["Google Chrome", "Photoshop", "Excel", "Windows"],
        correta: 0
    },

    {
        pergunta: "O que significa a sigla IA?",
        opcoes: [
            "Internet Automática",
            "Inteligência Artificial",
            "Informação Avançada",
            "Interface Adaptativa"
        ],
        correta: 1
    },

    {
        pergunta: "Qual tecnologia permite armazenar arquivos pela internet?",
        opcoes: [
            "Computação em nuvem",
            "Bluetooth",
            "Teclado",
            "Monitor"
        ],
        correta: 0
    }

];

let perguntaAtual = 0;
let pontuacao = 0;

const perguntaQuiz = document.querySelector("#pergunta-quiz");

const opcoesQuiz = document.querySelector(".opcoes-quiz");

const resultadoQuiz = document.querySelector("#resultado-quiz");


function mostrarPergunta() {

    const pergunta = perguntasQuiz[perguntaAtual];

    perguntaQuiz.textContent = pergunta.pergunta;

    opcoesQuiz.innerHTML = "";

    pergunta.opcoes.forEach((opcao, indice) => {

        const botao = document.createElement("button");

        botao.classList.add("opcao-quiz");

        botao.textContent = opcao;

        botao.addEventListener("click", () => {

            verificarResposta(indice);

        });

        opcoesQuiz.appendChild(botao);

    });

}


function verificarResposta(resposta) {

    const pergunta = perguntasQuiz[perguntaAtual];

    const botoes = opcoesQuiz.querySelectorAll("button");

    botoes.forEach((botao) => {

        botao.disabled = true;

    });

    if (resposta === pergunta.correta) {

        pontuacao++;

        resultadoQuiz.textContent = "🎉 Resposta correta! Muito bem!";

    } else {

        resultadoQuiz.textContent =
            `Quase! A resposta correta era ${pergunta.opcoes[pergunta.correta]}.`;

    }

    const botaoProximo = document.createElement("button");

    botaoProximo.textContent =
        perguntaAtual === perguntasQuiz.length - 1
            ? "Ver resultado"
            : "Próxima pergunta →";

    botaoProximo.classList.add("opcao-quiz");

    botaoProximo.style.marginTop = "15px";

    botaoProximo.addEventListener("click", proximaPergunta);

    opcoesQuiz.appendChild(botaoProximo);

}


function proximaPergunta() {

    perguntaAtual++;

    if (perguntaAtual < perguntasQuiz.length) {

        mostrarPergunta();

        resultadoQuiz.textContent = "";

    } else {

        finalizarQuiz();

    }

}


function finalizarQuiz() {

    perguntaQuiz.textContent = "Quiz concluído!";

    opcoesQuiz.innerHTML = "";

    resultadoQuiz.textContent =
        `Você acertou ${pontuacao} de ${perguntasQuiz.length} perguntas!`;

    const reiniciar = document.createElement("button");

    reiniciar.textContent = "Jogar novamente";

    reiniciar.classList.add("opcao-quiz");

    reiniciar.addEventListener("click", reiniciarQuiz);

    opcoesQuiz.appendChild(reiniciar);

}


function reiniciarQuiz() {

    perguntaAtual = 0;

    pontuacao = 0;

    resultadoQuiz.textContent = "";

    mostrarPergunta();

}


mostrarPergunta();


/* =========================================
   9. NEWSLETTER
========================================= */

const formularioNewsletter = document.querySelector("#form-newsletter");

const mensagemNewsletter = document.querySelector("#mensagem-newsletter");

formularioNewsletter.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const email = document.querySelector("#email-newsletter").value.trim();

    if (!email) {
        return;
    }

    const emailsSalvos = JSON.parse(
        localStorage.getItem("newsletter-techblog")
    ) || [];

    if (emailsSalvos.includes(email)) {

        mensagemNewsletter.textContent =
            "Este e-mail já está cadastrado neste navegador.";

        return;

    }

    emailsSalvos.push(email);

    try {

        localStorage.setItem(
            "newsletter-techblog",
            JSON.stringify(emailsSalvos)
        );

    } catch (erro) {

        mensagemNewsletter.textContent =
            "Não foi possível registrar seu e-mail neste navegador.";

        return;

    }

    mensagemNewsletter.textContent =
        "Cadastro demonstrativo realizado com sucesso!";

    formularioNewsletter.reset();

});


/* =========================================
   10. NAVEGAÇÃO E EXPERIÊNCIA
========================================= */

const linksMenu = document.querySelectorAll(".menu-principal a");

linksMenu.forEach((link) => {

    link.addEventListener("click", () => {

        linksMenu.forEach((outroLink) => {

            outroLink.classList.remove("ativo");

        });

        link.classList.add("ativo");

    });

});

