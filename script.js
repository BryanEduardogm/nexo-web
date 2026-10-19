/* ==========================================================================
   NEXO WEB — script.js
   JavaScript compartilhado por index.html e modelos.html.
   Cada recurso só é ativado se os elementos dele existirem na página,
   então o mesmo arquivo funciona nas duas páginas sem erros.
   ========================================================================== */

/* ---------------------------------------------------------------------------
   CONFIGURAÇÃO — TROQUE AQUI O NÚMERO DO WHATSAPP
   Formato: código do país + DDD + número, só dígitos.
   Exemplo: 55 (Brasil) + 11 (DDD) + 912345678  →  "5511912345678"
--------------------------------------------------------------------------- */
const WHATSAPP_NUMERO = "5511919172627";

/* Monta o link do WhatsApp com uma mensagem pronta */
function linkWhatsApp(mensagem) {
  const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : "";
  return `https://wa.me/${WHATSAPP_NUMERO}${texto}`;
}

/* Abre o WhatsApp em nova aba (usado pelo formulário e pelos cards gerados via JS) */
function abrirWhatsApp(mensagem) {
  window.open(linkWhatsApp(mensagem), "_blank", "noopener");
}

/* Formata número como preço em reais: 1997 → "R$ 1.997" */
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: Number.isInteger(valor) ? 0 : 2
  });
}

/* Escapa texto antes de inserir em HTML (proteção contra injeção de código) */
function escaparHTML(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

/* ---------------------------------------------------------------------------
   1. LINKS DE WHATSAPP
   Qualquer elemento com o atributo data-whats recebe o link certo.
   Ex.: <a data-whats="Olá! Quero o plano Básico">...</a>
--------------------------------------------------------------------------- */
function iniciarLinksWhatsApp() {
  document.querySelectorAll("[data-whats]").forEach((el) => {
    el.href = linkWhatsApp(el.dataset.whats);
    el.target = "_blank";
    el.rel = "noopener";
  });
}

/* ---------------------------------------------------------------------------
   2. MENU (fundo ao rolar + hambúrguer no celular)
--------------------------------------------------------------------------- */
function iniciarMenu() {
  const cabecalho = document.querySelector(".cabecalho");
  const botao = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");
  if (!cabecalho || !botao || !menu) return;

  // Fundo do menu aparece depois de rolar um pouco
  const aoRolar = () => cabecalho.classList.toggle("rolou", window.scrollY > 20);
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });

  const alternar = (abrir) => {
    botao.setAttribute("aria-expanded", String(abrir));
    botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("aberto", abrir);
    cabecalho.classList.toggle("menu-aberto", abrir);
  };

  botao.addEventListener("click", () => {
    alternar(botao.getAttribute("aria-expanded") !== "true");
  });

  // Fecha ao clicar em um link do menu
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => alternar(false)));

  // Fecha com a tecla Esc e devolve o foco ao botão
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("aberto")) {
      alternar(false);
      botao.focus();
    }
  });
}

/* ---------------------------------------------------------------------------
   3. ANIMAÇÃO AO ROLAR (reveal) e CONTADORES dos números de destaque
--------------------------------------------------------------------------- */
function iniciarReveal() {
  const elementos = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("visivel"));
    return;
  }
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  elementos.forEach((el) => observador.observe(el));
}

function iniciarContadores() {
  const contadores = document.querySelectorAll("[data-contar]");
  if (!contadores.length) return;
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animar = (el) => {
    const alvo = Number(el.dataset.contar);
    const prefixo = el.dataset.prefixo || "";
    const sufixo = el.dataset.sufixo || "";
    if (reduzirMovimento) { el.textContent = prefixo + alvo + sufixo; return; }

    const duracao = 1600;
    const inicio = performance.now();
    const passo = (agora) => {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      const suavizado = 1 - Math.pow(1 - progresso, 3); // desacelera no final
      el.textContent = prefixo + Math.round(alvo * suavizado) + sufixo;
      if (progresso < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        animar(entrada.target);
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.5 });
  contadores.forEach((el) => observador.observe(el));
}

/* ---------------------------------------------------------------------------
   4. FILTRO DO PORTFÓLIO (index.html)
--------------------------------------------------------------------------- */
function iniciarFiltroPortfolio() {
  const filtros = document.querySelectorAll("#filtros-portfolio .filtro");
  const projetos = document.querySelectorAll(".projeto");
  if (!filtros.length) return;
  const gradePortfolio = document.querySelector(".grade-portfolio");
  if (gradePortfolio) iniciarPrevias(gradePortfolio);

  filtros.forEach((botao) => {
    botao.addEventListener("click", () => {
      const categoria = botao.dataset.filtro;
      filtros.forEach((b) => b.setAttribute("aria-pressed", String(b === botao)));
      projetos.forEach((projeto) => {
        projeto.hidden = categoria !== "todos" && projeto.dataset.categoria !== categoria;
      });
    });
  });
}

/* ---------------------------------------------------------------------------
   5. FAQ EM ACORDEÃO (um item aberto por vez)
--------------------------------------------------------------------------- */
function iniciarFAQ() {
  const perguntas = document.querySelectorAll(".faq__pergunta");
  perguntas.forEach((botao) => {
    botao.addEventListener("click", () => {
      const abrir = botao.getAttribute("aria-expanded") !== "true";
      // Fecha todos
      perguntas.forEach((outro) => {
        outro.setAttribute("aria-expanded", "false");
        outro.closest(".faq__item").classList.remove("aberto");
      });
      // Abre o clicado (se estava fechado)
      if (abrir) {
        botao.setAttribute("aria-expanded", "true");
        botao.closest(".faq__item").classList.add("aberto");
      }
    });
  });
}

/* ---------------------------------------------------------------------------
   6. FORMULÁRIO DE ORÇAMENTO (validação + envio para o WhatsApp)
--------------------------------------------------------------------------- */
function iniciarFormulario() {
  const form = document.getElementById("form-orcamento");
  if (!form) return;

  const campoWhats = form.elements.whatsapp;

  // Máscara simples: (11) 91234-5678
  campoWhats.addEventListener("input", () => {
    const d = campoWhats.value.replace(/\D/g, "").slice(0, 11);
    let f = d;
    if (d.length > 2) f = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length > 7) f = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
    campoWhats.value = f;
  });

  // Regras de validação de cada campo: retornam a mensagem de erro ou ""
  const regras = {
    nome: (v) => v.trim().length < 3 ? "Informe seu nome (mínimo 3 letras)." : "",
    whatsapp: (v) => {
      const n = v.replace(/\D/g, "").length;
      return n < 10 || n > 11 ? "Informe um WhatsApp válido com DDD." : "";
    },
    negocio: (v) => v.trim().length < 2 ? "Conte qual é o seu tipo de negócio." : "",
    plano: (v) => !v ? "Escolha um plano de interesse." : "",
    mensagem: (v) => v.trim().length < 10 ? "Escreva uma mensagem com pelo menos 10 caracteres." : ""
  };

  const validarCampo = (nome) => {
    const campo = form.elements[nome];
    const erro = regras[nome](campo.value);
    const saida = document.getElementById(`erro-${nome}`);
    campo.setAttribute("aria-invalid", erro ? "true" : "false");
    if (saida) saida.textContent = erro;
    return !erro;
  };

  // Valida ao sair do campo e limpa o erro enquanto digita
  Object.keys(regras).forEach((nome) => {
    const campo = form.elements[nome];
    campo.addEventListener("blur", () => validarCampo(nome));
    campo.addEventListener("input", () => {
      if (campo.getAttribute("aria-invalid") === "true") validarCampo(nome);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const resultados = Object.keys(regras).map(validarCampo);
    if (resultados.includes(false)) {
      // Leva o foco ao primeiro campo com erro
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    const d = Object.fromEntries(new FormData(form));
    const mensagem =
      `Olá, Nexo Web! Quero um orçamento.\n\n` +
      `*Nome:* ${d.nome.trim()}\n` +
      `*WhatsApp:* ${d.whatsapp}\n` +
      `*Tipo de negócio:* ${d.negocio.trim()}\n` +
      `*Plano de interesse:* ${d.plano}\n\n` +
      `*Mensagem:* ${d.mensagem.trim()}`;

    abrirWhatsApp(mensagem);
    form.reset();
    form.querySelectorAll("[aria-invalid]").forEach((c) => c.removeAttribute("aria-invalid"));
  });
}

/* ---------------------------------------------------------------------------
   7. PÁGINA DE MODELOS (modelos.html)
   Lê o array MODELOS do arquivo dados.js e monta cards, filtros, busca e modal.
--------------------------------------------------------------------------- */
function iniciarModelos() {
  const grade = document.getElementById("grade-modelos");
  if (!grade || typeof MODELOS === "undefined") return;

  const containerFiltros = document.getElementById("filtros-modelos");
  const busca = document.getElementById("busca-modelos");
  const info = document.getElementById("resultado-info");
  const modal = document.getElementById("modal-modelo");

  let categoriaAtual = "Todos";

  // Gera os botões de filtro a partir das categorias existentes em dados.js
  const categorias = ["Todos", ...new Set(MODELOS.map((m) => m.categoria))];
  containerFiltros.innerHTML = categorias.map((cat) =>
    `<button type="button" class="filtro" data-filtro="${escaparHTML(cat)}" aria-pressed="${cat === "Todos"}">${escaparHTML(cat)}</button>`
  ).join("");

  // Remove acentos para a busca funcionar com "clinica" ou "clínica"
  const normalizar = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  const mensagemCompra = (m) => `Olá, Nexo Web! Tenho interesse em comprar o modelo "${m.nome}" (${m.categoria}) por ${formatarPreco(m.preco)}. Pode me passar mais informações?`;

  /* --- Prévia animada do site (o "vídeo" que aparece no card) ---------------
     Monta uma versão pequena do site a partir de m.demo (dados.js).
     As "fotos" da miniatura reaproveitam a imagem do modelo em posições
     diferentes, então não há download extra de imagens. */
  const POSICOES_FOTO = ["10% 30%", "80% 20%", "30% 80%", "70% 70%", "50% 10%", "90% 90%"];

  function montarBloco(b, m) {
    const e = escaparHTML;
    const foto = (i) => `<span class="mini__foto" style="background-image:url('${e(m.imagem)}');background-position:${POSICOES_FOTO[i % 6]}"></span>`;
    const titulo = b.titulo ? `<h3>${e(b.titulo)}</h3>` : "";
    switch (b.tipo) {
      case "lista":
        return `<section class="mini__secao">${titulo}<ul class="mini__lista">${b.itens.map(([nome, preco]) =>
          `<li><span>${e(nome)}</span><b>${e(preco)}</b></li>`).join("")}</ul></section>`;
      case "grade":
        return `<section class="mini__secao">${titulo}<div class="mini__grade">${b.itens.map(([nome, preco], i) =>
          `<div class="mini__item">${foto(i)}<span>${e(nome)}${preco ? `<b>${e(preco)}</b>` : ""}</span></div>`).join("")}</div></section>`;
      case "horarios":
        return `<section class="mini__secao">${titulo}<div class="mini__chips">${b.itens.map((h, i) =>
          `<span class="mini__chip${i === 1 ? " ativo" : ""}">${e(h)}</span>`).join("")}</div></section>`;
      case "chips":
        return `<section class="mini__secao">${titulo}<div class="mini__chips">${b.itens.map((c) =>
          `<span class="mini__chip">${e(c)}</span>`).join("")}</div></section>`;
      case "galeria":
        return `<section class="mini__secao">${titulo}<div class="mini__galeria">${[0, 1, 2, 3, 4, 5].map(foto).join("")}</div></section>`;
      case "busca":
        return `<section class="mini__secao"><div class="mini__busca">${e(b.texto)}</div><div class="mini__chips">${b.itens.map((c, i) =>
          `<span class="mini__chip${i === 0 ? " ativo" : ""}">${e(c)}</span>`).join("")}</div></section>`;
      case "info":
        return `<p class="mini__info">${e(b.texto)}</p>`;
      case "cta":
        return `<p class="mini__cta">${e(b.texto)}</p>`;
      default:
        return "";
    }
  }

  function montarPrevia(m) {
    const d = m.demo;
    if (!d) return "";
    const e = escaparHTML;
    const cores = `--mini-cor:${e(d.cor)};--mini-fundo:${e(d.fundo)};--mini-texto:${e(d.texto)};--mini-sobre:${e(d.sobreCor || "#fff")}`;
    return `
      <div class="previa" aria-hidden="true">
          <div class="mini previa__rolagem" style="${cores}">
            <div class="mini__nav"><b>${e(m.nome)}</b><i></i></div>
            <div class="mini__hero" style="background-image:linear-gradient(transparent 20%, rgba(0,0,0,.8)),url('${e(m.imagem)}')">
              <strong>${e(d.titulo)}</strong>
              <span class="mini__botao">${e(d.botao)}</span>
            </div>
            ${d.blocos.filter((b) => b.tipo !== "cta").map((b) => montarBloco(b, m)).join("")}
            <section class="mini__secao">
              <h3>Avaliações</h3>
              <div class="mini__avaliacao"><span>★★★★★</span>"Atendimento excelente, recomendo muito!"<small>Cliente no Google</small></div>
            </section>
            <section class="mini__secao">
              <h3>Onde estamos</h3>
              <div class="mini__mapa"><i></i></div>
            </section>
            ${d.blocos.filter((b) => b.tipo === "cta").map((b) => montarBloco(b, m)).join("")}
            <p class="mini__rodape">© ${e(m.nome)}</p>
          </div>
      </div>`;
  }

  const previas = iniciarPrevias(grade);

  // Desenha os cards de acordo com filtro + busca
  function renderizar() {
    const termo = normalizar(busca.value.trim());
    const lista = MODELOS.filter((m) => {
      const passaCategoria = categoriaAtual === "Todos" || m.categoria === categoriaAtual;
      const texto = normalizar(`${m.nome} ${m.categoria} ${m.resumo} ${m.id}`);
      return passaCategoria && texto.includes(termo);
    });

    if (!lista.length) {
      grade.innerHTML = `<p class="vazio">Nenhum modelo encontrado. Tente outra palavra ou <a class="texto-gradiente" href="index.html#contato">peça um site sob medida</a>.</p>`;
    } else {
      grade.innerHTML = lista.map((m) => `
        <article class="card modelo tem-previa">
          <div class="projeto__imagem">
            <img src="${escaparHTML(m.imagem)}" alt="${escaparHTML(m.alt)}" loading="lazy" width="800" height="600">
            <span class="etiqueta">${escaparHTML(m.categoria)}</span>
            ${montarPrevia(m)}
          </div>
          <div class="modelo__corpo">
            <div class="modelo__topo">
              <h2>${escaparHTML(m.nome)}</h2>
              <span class="modelo__preco texto-gradiente">${formatarPreco(m.preco)}</span>
            </div>
            <p class="modelo__resumo">${escaparHTML(m.resumo)}</p>
            <div class="modelo__botoes">
              <button type="button" class="btn btn--secundario" data-detalhes="${escaparHTML(m.id)}" aria-label="Ver detalhes do modelo ${escaparHTML(m.nome)}">Ver detalhes</button>
              <a class="btn btn--primario" href="${linkWhatsApp(mensagemCompra(m))}" target="_blank" rel="noopener" aria-label="Comprar o modelo ${escaparHTML(m.nome)} pelo WhatsApp">Comprar este modelo</a>
            </div>
          </div>
        </article>`).join("");
    }

    info.textContent = `${lista.length} ${lista.length === 1 ? "modelo encontrado" : "modelos encontrados"}`;
    previas.atualizar();
  }

  // Abre o modal com os detalhes do modelo
  function abrirModal(id) {
    const m = MODELOS.find((x) => x.id === id);
    if (!m) return;
    modal.querySelector(".modal__conteudo").innerHTML = `
      <img class="modal__imagem" src="${escaparHTML(m.imagem)}" alt="${escaparHTML(m.alt)}" width="800" height="400">
      <div class="modal__corpo">
        <span class="modal__categoria">${escaparHTML(m.categoria)}</span>
        <h2 id="modal-titulo">${escaparHTML(m.nome)}</h2>
        <p class="modal__desc">${escaparHTML(m.descricao)}</p>
        <h3>O que vem no modelo</h3>
        <ul class="plano__lista">
          ${m.recursos.map((r) => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>${escaparHTML(r)}</li>`).join("")}
        </ul>
        <div class="modal__meta">
          <div><span>Investimento</span><strong class="texto-gradiente">${formatarPreco(m.preco)}</strong></div>
          <div><span>Prazo de entrega</span><strong>${escaparHTML(m.prazo)}</strong></div>
          <div><span>Personalização</span><strong>Cores, textos e logo</strong></div>
        </div>
        <a class="btn btn--primario btn--bloco" href="${linkWhatsApp(mensagemCompra(m))}" target="_blank" rel="noopener">Comprar este modelo pelo WhatsApp</a>
      </div>`;
    modal.showModal();
  }

  // Eventos: filtro, busca, botões dos cards e fechamento do modal
  containerFiltros.addEventListener("click", (e) => {
    const botao = e.target.closest(".filtro");
    if (!botao) return;
    categoriaAtual = botao.dataset.filtro;
    containerFiltros.querySelectorAll(".filtro").forEach((b) => b.setAttribute("aria-pressed", String(b === botao)));
    renderizar();
  });

  busca.addEventListener("input", renderizar);

  grade.addEventListener("click", (e) => {
    const botao = e.target.closest("[data-detalhes]");
    if (botao) abrirModal(botao.dataset.detalhes);
  });

  modal.querySelector(".modal__fechar").addEventListener("click", () => modal.close());
  // Fecha ao clicar fora do conteúdo (no fundo escuro)
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

  renderizar();
}

/* ---------------------------------------------------------------------------
   PRÉVIA ANIMADA DOS SITES (cards de modelos e do portfólio)
   Cada card com a classe .tem-previa tem uma .previa com um elemento
   .previa__rolagem dentro: a miniatura montada pelo JS (.mini) ou a captura
   da página inteira (img). Esta função mede quanto cada um precisa rolar.
   - Com mouse: aparece e rola ao passar o mouse (CSS :hover).
   - Sem mouse (celular/tablet): aparece e rola sozinha enquanto o card está na tela.
--------------------------------------------------------------------------- */
const LARGURA_MINI = 320; // largura "real" da miniatura (.mini) antes de ser ajustada ao card

function iniciarPrevias(raiz) {
  const comMouse = window.matchMedia("(hover: hover) and (pointer: fine)");
  const observador = "IntersectionObserver" in window
    ? new IntersectionObserver((entradas) => {
        // A checagem do mouse é feita aqui, na hora, para acompanhar aparelhos
        // que alternam entre toque e mouse.
        entradas.forEach((en) => en.target.classList.toggle("rodando", en.isIntersecting && !comMouse.matches));
      }, { threshold: 0.55 })
    : null;

  function medir() {
    raiz.querySelectorAll(".tem-previa").forEach((card) => {
      const tela = card.querySelector(".previa");
      const alvo = card.querySelector(".previa__rolagem");
      if (!tela || !alvo || !tela.clientWidth) return; // ainda sem tamanho
      const escala = alvo.classList.contains("mini") ? tela.clientWidth / LARGURA_MINI : 1;
      const rolagem = Math.max(0, alvo.offsetHeight - tela.clientHeight / escala);
      alvo.style.setProperty("--escala", escala.toFixed(4));
      alvo.style.setProperty("--rolagem", Math.round(rolagem));
      // Quanto mais longa a página, mais tempo, entre 6 e 16 segundos por volta
      alvo.style.setProperty("--duracao", `${Math.min(16, Math.max(6, (rolagem * escala) / 150)).toFixed(1)}s`);
      if (observador) observador.observe(card);
    });
  }

  // Mede de novo quando o tamanho muda (girar o celular, redimensionar a janela),
  // quando fontes/imagens terminam de carregar e quando cada captura de página carrega
  if ("ResizeObserver" in window) new ResizeObserver(medir).observe(raiz);
  window.addEventListener("load", medir);
  raiz.addEventListener("load", (e) => { if (e.target.classList?.contains("previa__rolagem")) medir(); }, true);
  medir();

  return {
    // Chamado depois que os cards são redesenhados (filtro e busca dos modelos)
    atualizar() {
      if (observador) observador.disconnect();
      medir();
    }
  };
}

/* ---------------------------------------------------------------------------
   8. EDITOR DE CÓDIGO ANIMADO DO HERO (index.html)
   Digita um código falso, letra por letra, alternando entre as abas
   index.html, style.css e script.js. É só decoração.
   Formato das linhas: [[classe:texto]] pinta o trecho com a cor da classe
   (c-tag, c-attr, c-str...). Texto fora dos colchetes fica na cor padrão.
--------------------------------------------------------------------------- */
const EDITOR_ARQUIVOS = [
  {
    linguagem: "HTML",
    linhas: [
      "[[c-com:<!-- Site da Pizzaria Bella Napoli -->]]",
      "[[c-tag:<section]] [[c-attr:class]][[c-pun:=]][[c-str:\"hero\"]][[c-tag:>]]",
      "  [[c-tag:<h1>]]A melhor pizza da cidade[[c-tag:</h1>]]",
      "  [[c-tag:<p>]]Forno a lenha e entrega em 30 min.[[c-tag:</p>]]",
      "  [[c-tag:<a]] [[c-attr:href]][[c-pun:=]][[c-str:\"#cardapio\"]] [[c-attr:class]][[c-pun:=]][[c-str:\"btn\"]][[c-tag:>]]",
      "    Ver cardápio",
      "  [[c-tag:</a>]]",
      "  [[c-tag:<a]] [[c-attr:href]][[c-pun:=]][[c-str:\"https://wa.me/...\"]][[c-tag:>]]",
      "    Pedir no WhatsApp",
      "  [[c-tag:</a>]]",
      "[[c-tag:</section>]]"
    ]
  },
  {
    linguagem: "CSS",
    linhas: [
      "[[c-com:/* Hero com fundo escuro e botão em destaque */]]",
      "[[c-sel:.hero]] {",
      "  [[c-prop:min-height]]: [[c-num:100vh]];",
      "  [[c-prop:display]]: grid;",
      "  [[c-prop:place-items]]: center;",
      "  [[c-prop:background]]: [[c-fn:url]]([[c-str:\"forno.jpg\"]]);",
      "}",
      "",
      "[[c-sel:.btn]] {",
      "  [[c-prop:padding]]: [[c-num:14px]] [[c-num:28px]];",
      "  [[c-prop:border-radius]]: [[c-num:999px]];",
      "  [[c-prop:background]]: [[c-str:#E63946]];",
      "}"
    ]
  },
  {
    linguagem: "JavaScript",
    linhas: [
      "[[c-com:// Abre o WhatsApp com o pedido pronto]]",
      "[[c-kw:const]] [[c-var:numero]] = [[c-str:\"5511999999999\"]];",
      "",
      "[[c-kw:function]] [[c-fn:pedir]]([[c-var:pizza]]) {",
      "  [[c-kw:const]] [[c-var:texto]] = [[c-str:`Quero uma ${]][[c-var:pizza]][[c-str:}`]];",
      "  [[c-fn:open]]([[c-str:`https://wa.me/${]][[c-var:numero]][[c-str:}`]]);",
      "}",
      "",
      "[[c-fn:pedir]]([[c-str:\"Margherita\"]]);"
    ]
  }
];

function iniciarEditor() {
  const codigo = document.getElementById("editor-codigo");
  if (!codigo) return;
  const caixa = codigo.closest(".editor__codigo");
  const numeros = document.querySelector(".editor__linhas");
  const abas = document.querySelectorAll(".editor__aba");
  const posicao = document.getElementById("editor-pos");
  const linguagem = document.getElementById("editor-ling");

  // Converte "[[classe:texto]]" em pedaços { classe, texto }
  const pedacos = (linha) => {
    const lista = [];
    linha.replace(/\[\[([\w-]+):(.*?)\]\]|([^[]+|\[)/g, (_, cls, txt, puro) => {
      lista.push(cls ? { classe: cls, texto: txt } : { classe: "", texto: puro });
    });
    return lista;
  };

  const trocarAba = (i) => {
    abas.forEach((aba, n) => aba.classList.toggle("ativa", n === i));
    linguagem.textContent = EDITOR_ARQUIVOS[i].linguagem;
    codigo.textContent = "";
    numeros.textContent = "1";
  };

  // Quem prefere menos movimento vê o primeiro arquivo já pronto, sem animação
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const arq = EDITOR_ARQUIVOS[0];
    codigo.innerHTML = arq.linhas.map((l) =>
      pedacos(l).map((p) => p.classe ? `<span class="${p.classe}">${escaparHTML(p.texto)}</span>` : escaparHTML(p.texto)).join("")
    ).join("\n");
    numeros.textContent = arq.linhas.map((_, i) => i + 1).join("\n");
    return;
  }

  const espera = (ms) => new Promise((r) => setTimeout(r, ms));

  async function digitarArquivo(i) {
    trocarAba(i);
    const linhas = EDITOR_ARQUIVOS[i].linhas;
    for (let l = 0; l < linhas.length; l++) {
      if (l > 0) {
        codigo.append("\n");
        numeros.textContent += `\n${l + 1}`;
      }
      let coluna = 1;
      for (const p of pedacos(linhas[l])) {
        const alvo = p.classe ? codigo.appendChild(Object.assign(document.createElement("span"), { className: p.classe })) : null;
        const no = document.createTextNode("");
        (alvo || codigo).appendChild(no);
        for (const letra of p.texto) {
          no.data += letra;
          coluna++;
          // Espaços da indentação saem mais rápido, como no editor de verdade
          await espera(letra === " " ? 12 : 22 + Math.random() * 38);
        }
      }
      posicao.textContent = `Ln ${l + 1}, Col ${coluna}`;
      caixa.scrollTop = caixa.scrollHeight; // acompanha o código se passar da altura
      await espera(160);
    }
  }

  (async function repetir() {
    for (let i = 0; ; i = (i + 1) % EDITOR_ARQUIVOS.length) {
      await digitarArquivo(i);
      await espera(2600); // pausa com o arquivo pronto antes de ir para a próxima aba
    }
  })();
}

/* ---------------------------------------------------------------------------
   9. ANO ATUAL NO RODAPÉ
--------------------------------------------------------------------------- */
function iniciarAno() {
  document.querySelectorAll("[data-ano]").forEach((el) => { el.textContent = new Date().getFullYear(); });
}

/* ---------------------------------------------------------------------------
   INICIALIZAÇÃO
--------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  iniciarLinksWhatsApp();
  iniciarMenu();
  iniciarModelos(); // antes do reveal, pois cria elementos na página
  iniciarReveal();
  iniciarContadores();
  iniciarFiltroPortfolio();
  iniciarFAQ();
  iniciarFormulario();
  iniciarEditor();
  iniciarAno();
});
