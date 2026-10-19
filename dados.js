/* ==========================================================================
   NEXO WEB — dados.js
   Catálogo de modelos de sites exibidos em modelos.html.
   Para adicionar, remover ou editar um modelo, basta mexer neste array.
   Campos:
     id         → identificador único (sem espaços)
     nome       → nome exibido no card
     categoria  → usada no filtro (os botões de filtro são gerados a partir daqui)
     preco      → número, sem "R$" (ex.: 697 ou 1297.90)
     imagem     → URL da imagem (Unsplash ou arquivo local, ex.: "img/restaurante.jpg")
     alt        → descrição da imagem para acessibilidade e SEO
     resumo     → texto curto do card
     descricao  → texto mais longo exibido no modal "Ver detalhes"
     recursos   → lista de itens exibida no modal
     prazo      → prazo de entrega exibido no modal
     demo       → prévia animada do site que aparece no card (como um vídeo):
                  cor (destaque), fundo, texto, sobreCor (texto em cima da cor de destaque),
                  titulo e botao do topo, e blocos (seções, na ordem em que aparecem).
                  Tipos de bloco:
                    { tipo: "lista",    titulo, itens: [["Nome", "Preço"], ...] }
                    { tipo: "grade",    titulo, itens: [["Nome", "Preço opcional"], ...] }
                    { tipo: "horarios", titulo, itens: ["09:00", ...] }   (o 2º fica marcado)
                    { tipo: "chips",    titulo, itens: ["Texto", ...] }
                    { tipo: "galeria",  titulo }
                    { tipo: "busca",    texto, itens: ["Filtro", ...] }
                    { tipo: "info",     texto }
                    { tipo: "cta",      texto }   (botão no fim do site)
   ========================================================================== */

const MODELOS = [
  {
    id: "restaurante",
    nome: "Sabor & Brasa",
    categoria: "Alimentação",
    preco: 697,
    imagem: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=70",
    alt: "Salão de restaurante moderno com mesas de madeira e iluminação quente",
    resumo: "Cardápio digital, reservas e pedidos pelo WhatsApp.",
    descricao: "Modelo pensado para restaurantes, bares e lanchonetes que querem receber mais pedidos e reservas. Destaque para o cardápio com fotos e botão de pedido direto no WhatsApp.",
    recursos: ["Cardápio com categorias e fotos", "Botão de pedido via WhatsApp", "Horário de funcionamento e mapa", "Galeria do ambiente", "Integração com iFood (link)"],
    prazo: "5 dias úteis",
    demo: {
      cor: "#E85D04", fundo: "#17110E", texto: "#FFF5EC", sobreCor: "#FFFFFF",
      titulo: "Sabor que reúne a família", botao: "Ver cardápio",
      blocos: [
        { tipo: "info", texto: "Aberto hoje · 11h às 23h" },
        { tipo: "lista", titulo: "Cardápio", itens: [["Picanha na brasa", "R$ 89"], ["Costela 12 horas", "R$ 76"], ["Feijoada completa", "R$ 54"], ["Caipirinha", "R$ 22"]] },
        { tipo: "galeria", titulo: "Nosso ambiente" },
        { tipo: "cta", texto: "Pedir no WhatsApp" }
      ]
    }
  },
  {
    id: "barbearia",
    nome: "Navalha Clássica",
    categoria: "Beleza",
    preco: 597,
    imagem: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=70",
    alt: "Barbeiro aparando a barba de um cliente em barbearia vintage",
    resumo: "Tabela de serviços, equipe e agendamento rápido.",
    descricao: "Visual marcante para barbearias que querem lotar a agenda. Mostra serviços, preços, equipe de barbeiros e leva o cliente direto para o agendamento.",
    recursos: ["Tabela de serviços e preços", "Apresentação da equipe", "Agendamento por WhatsApp", "Galeria de cortes", "Avaliações de clientes"],
    prazo: "5 dias úteis",
    demo: {
      cor: "#C9A227", fundo: "#121212", texto: "#F5F5F5", sobreCor: "#121212",
      titulo: "Estilo que se mantém", botao: "Agendar horário",
      blocos: [
        { tipo: "lista", titulo: "Serviços", itens: [["Corte", "R$ 45"], ["Barba", "R$ 35"], ["Corte + barba", "R$ 70"], ["Pigmentação", "R$ 40"]] },
        { tipo: "horarios", titulo: "Escolha o horário", itens: ["09:00", "10:30", "13:00", "15:30", "17:00", "18:30"] },
        { tipo: "cta", texto: "Confirmar no WhatsApp" }
      ]
    }
  },
  {
    id: "academia",
    nome: "Pulse Fitness",
    categoria: "Saúde",
    preco: 797,
    imagem: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=70",
    alt: "Academia com halteres e equipamentos de musculação",
    resumo: "Planos, modalidades, horários e aula experimental.",
    descricao: "Site energético para academias e estúdios. Apresenta modalidades, grade de horários, planos de matrícula e um chamado forte para a aula experimental gratuita.",
    recursos: ["Planos de matrícula", "Grade de horários das aulas", "Página de modalidades", "Formulário de aula experimental", "Depoimentos de alunos"],
    prazo: "7 dias úteis",
    demo: {
      cor: "#FF3D00", fundo: "#0D0D0D", texto: "#FAFAFA", sobreCor: "#FFFFFF",
      titulo: "Sua melhor versão começa hoje", botao: "Aula grátis",
      blocos: [
        { tipo: "grade", titulo: "Modalidades", itens: [["Musculação"], ["Funcional"], ["Spinning"], ["Yoga"]] },
        { tipo: "lista", titulo: "Planos", itens: [["Mensal", "R$ 99"], ["Trimestral", "R$ 269"], ["Anual", "R$ 899"]] },
        { tipo: "cta", texto: "Agendar aula experimental" }
      ]
    }
  },
  {
    id: "advogado",
    nome: "Lex Advocacia",
    categoria: "Serviços",
    preco: 897,
    imagem: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=70",
    alt: "Balança da justiça e livros de direito sobre uma mesa",
    resumo: "Áreas de atuação, equipe e contato sigiloso.",
    descricao: "Modelo sóbrio e elegante para escritórios de advocacia e advogados autônomos, seguindo as diretrizes do Provimento 205/2021 da OAB sobre publicidade.",
    recursos: ["Áreas de atuação", "Perfil dos advogados", "Blog de artigos jurídicos", "Formulário de consulta", "Adequado às regras da OAB"],
    prazo: "7 dias úteis",
    demo: {
      cor: "#B08D57", fundo: "#0F1A2B", texto: "#F3EFE6", sobreCor: "#0F1A2B",
      titulo: "Seus direitos em boas mãos", botao: "Falar com advogado",
      blocos: [
        { tipo: "grade", titulo: "Áreas de atuação", itens: [["Trabalhista"], ["Família"], ["Previdenciário"], ["Consumidor"]] },
        { tipo: "info", texto: "Atendimento presencial e online" },
        { tipo: "cta", texto: "Agendar consulta" }
      ]
    }
  },
  {
    id: "loja-roupas",
    nome: "Vitrine Moda",
    categoria: "Loja",
    preco: 1497,
    imagem: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=70",
    alt: "Interior de loja de roupas com araras e peças expostas",
    resumo: "Loja virtual com catálogo, carrinho e checkout.",
    descricao: "Loja virtual completa para marcas de roupa e acessórios. Catálogo com filtros por tamanho e cor, carrinho de compras e finalização pelo WhatsApp ou meio de pagamento online.",
    recursos: ["Catálogo com filtros", "Carrinho de compras", "Checkout via WhatsApp ou Pix", "Cálculo de frete", "Painel para cadastrar produtos"],
    prazo: "15 dias úteis",
    demo: {
      cor: "#D9466F", fundo: "#FAF7F2", texto: "#1C1917", sobreCor: "#FFFFFF",
      titulo: "Nova coleção verão", botao: "Comprar agora",
      blocos: [
        { tipo: "info", texto: "Frete grátis acima de R$ 299" },
        { tipo: "grade", titulo: "Mais vendidos", itens: [["Vestido linho", "R$ 189"], ["Camisa", "R$ 129"], ["Calça pantalona", "R$ 159"], ["Blusa", "R$ 89"]] },
        { tipo: "chips", titulo: "Tamanhos", itens: ["PP", "P", "M", "G", "GG"] },
        { tipo: "cta", texto: "Finalizar no WhatsApp" }
      ]
    }
  },
  {
    id: "clinica",
    nome: "Vida Clínica",
    categoria: "Saúde",
    preco: 897,
    imagem: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=70",
    alt: "Corredor claro e limpo de uma clínica médica",
    resumo: "Especialidades, convênios e agendamento online.",
    descricao: "Site acolhedor para clínicas médicas, odontológicas e consultórios. Transmite confiança e facilita o agendamento de consultas.",
    recursos: ["Especialidades e corpo clínico", "Lista de convênios aceitos", "Agendamento por WhatsApp", "Página de exames", "Localização e estacionamento"],
    prazo: "7 dias úteis",
    demo: {
      cor: "#0EA5E9", fundo: "#F4FAFD", texto: "#0F172A", sobreCor: "#FFFFFF",
      titulo: "Cuidado completo para sua saúde", botao: "Agendar consulta",
      blocos: [
        { tipo: "grade", titulo: "Especialidades", itens: [["Cardiologia"], ["Pediatria"], ["Dermatologia"], ["Ortopedia"]] },
        { tipo: "horarios", titulo: "Horários disponíveis", itens: ["Seg 09:00", "Seg 14:00", "Ter 10:30", "Qua 16:00"] },
        { tipo: "chips", titulo: "Convênios", itens: ["Unimed", "Amil", "SulAmérica", "Particular"] },
        { tipo: "cta", texto: "Agendar pelo WhatsApp" }
      ]
    }
  },
  {
    id: "imobiliaria",
    nome: "Chave Imóveis",
    categoria: "Serviços",
    preco: 1297,
    imagem: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=70",
    alt: "Fachada de casa moderna com jardim",
    resumo: "Vitrine de imóveis com busca e filtros.",
    descricao: "Portal para imobiliárias e corretores autônomos, com listagem de imóveis, filtros por bairro, preço e tipo, e contato direto com o corretor responsável.",
    recursos: ["Listagem de imóveis com fotos", "Busca por bairro, tipo e preço", "Página individual do imóvel", "Contato direto com o corretor", "Painel para cadastrar imóveis"],
    prazo: "12 dias úteis",
    demo: {
      cor: "#F97316", fundo: "#FFFFFF", texto: "#1E293B", sobreCor: "#FFFFFF",
      titulo: "Encontre o lar ideal", botao: "Buscar imóveis",
      blocos: [
        { tipo: "busca", texto: "Bairro ou cidade", itens: ["Casa", "Apartamento", "Comprar"] },
        { tipo: "grade", titulo: "Destaques", itens: [["Casa 3 quartos", "R$ 650 mil"], ["Apto 2 quartos", "R$ 420 mil"], ["Sobrado", "R$ 890 mil"], ["Studio", "R$ 310 mil"]] },
        { tipo: "cta", texto: "Falar com corretor" }
      ]
    }
  },
  {
    id: "fotografo",
    nome: "Lente Viva",
    categoria: "Portfólio",
    preco: 597,
    imagem: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=70",
    alt: "Câmera fotográfica profissional sobre uma mesa",
    resumo: "Galerias em tela cheia e pacotes de ensaio.",
    descricao: "Modelo minimalista que coloca suas fotos em primeiro plano. Ideal para fotógrafos de casamento, ensaios, produtos e eventos.",
    recursos: ["Galerias em tela cheia", "Pacotes e preços de ensaios", "Área de depoimentos", "Formulário de orçamento", "Carregamento otimizado de imagens"],
    prazo: "5 dias úteis",
    demo: {
      cor: "#EDEDED", fundo: "#0A0A0A", texto: "#FAFAFA", sobreCor: "#0A0A0A",
      titulo: "Histórias contadas em imagens", botao: "Ver portfólio",
      blocos: [
        { tipo: "galeria", titulo: "Portfólio" },
        { tipo: "lista", titulo: "Pacotes", itens: [["Ensaio", "R$ 450"], ["Evento", "R$ 1.200"], ["Casamento", "R$ 3.900"]] },
        { tipo: "cta", texto: "Pedir orçamento" }
      ]
    }
  },
  {
    id: "portfolio-pessoal",
    nome: "Perfil Pro",
    categoria: "Portfólio",
    preco: 497,
    imagem: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=70",
    alt: "Notebook aberto com código na tela ao lado de uma xícara de café",
    resumo: "Currículo online, projetos e contato.",
    descricao: "Portfólio pessoal para designers, desenvolvedores, freelancers e profissionais liberais que querem se destacar em processos seletivos e conquistar clientes.",
    recursos: ["Seção sobre mim", "Projetos com estudo de caso", "Currículo para download", "Links para redes sociais", "Formulário de contato"],
    prazo: "4 dias úteis",
    demo: {
      cor: "#8B5CF6", fundo: "#0B0B14", texto: "#EDE9FE", sobreCor: "#FFFFFF",
      titulo: "Olá, eu sou Ana. Designer de produto", botao: "Ver projetos",
      blocos: [
        { tipo: "grade", titulo: "Projetos", itens: [["App de finanças"], ["E-commerce"], ["Dashboard"], ["Landing page"]] },
        { tipo: "chips", titulo: "Habilidades", itens: ["Figma", "UI", "UX", "HTML", "CSS"] },
        { tipo: "cta", texto: "Baixar currículo" }
      ]
    }
  }
];
