# Nexo Web

Site da **Nexo Web**, que cria sites profissionais para pequenos negócios, profissionais autônomos e empresas.

**Site no ar:** https://nexowebp.netlify.app/

Feito com HTML, CSS e JavaScript puro, sem frameworks nem etapa de build.

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Página inicial: serviços, portfólio, planos, como funciona, sobre, perguntas frequentes e contato |
| `modelos.html` | Vitrine de modelos de site prontos, com filtro, busca e detalhes |
| `privacidade.html` | Política de Privacidade (LGPD) |
| `404.html` | Página de endereço não encontrado |

## Arquivos de código

| Arquivo | Conteúdo |
|---|---|
| `style.css` | Todo o visual, organizado do celular para o computador |
| `script.js` | Menu, animações, filtros, formulário, botões do WhatsApp e prévias animadas |
| `dados.js` | Catálogo dos modelos de site (nome, preço, imagem e prévia animada) |
| `img/` | Imagem de compartilhamento e capturas do portfólio |

## Como editar

- **Número do WhatsApp:** constante `WHATSAPP_NUMERO`, no início do `script.js`.
- **Preços dos planos:** seção `PLANOS`, no `index.html`.
- **Modelos de site:** array `MODELOS`, no `dados.js`. O comentário no topo do arquivo explica cada campo.
- **Cores:** variáveis no `:root`, no início do `style.css`.

## Rodar no computador

Abra o `index.html` no navegador ou, para testar como no servidor:

```bash
python -m http.server 5500
```

Depois, acesse `http://localhost:5500`.
