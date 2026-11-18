---
name: Vinícius Oliveira — Tecnologia e Judô
description: Anime em camadas, acervo de judô e a mesma dedicação.
colors:
  primary: "#e0463d"
  neutral-bg: "#0b1018"
  judo-bg: "#0d0c0d"
  judo-panel: "#111011eb"
  judo-footer: "#141214"
  text-main: "#f3f1ec"
  text-copy: "#cbd3dc"
  text-muted: "#b1bcc7"
  hero-panel: "#080d15cf"
  judo-hero-panel: "#111011d9"
  judo-field: "#131113"
  sensei-copy: "#d9d0c8"
  sensei-link: "#f5aaa4"
  section-panel: "#0b1018e8"
  card-panel: "#0e1720b3"
  field-bg: "#080d15"
  border-panel: "#ffffff22"
  focus: "#e4c28b"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(34px,4.1vw,64px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(40px,4.3vw,66px)"
    fontWeight: 600
    lineHeight: 1.08
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 600
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  sensei-headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(34px,4vw,58px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-.03em"
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "14px"
rounded:
  button: "4px"
  field: "5px"
  card: "12px"
  panel: "14px"
  pill: "999px"
  lightbox: "10px"
spacing:
  tag-gap: "8px"
  card-padding: "16px"
  form-gap: "20px"
  hero-padding: "28px"
  grid-gap: "36px"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.text-main}"
    rounded: "{rounded.button}"
    padding: "12px 22px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-main}"
    rounded: "{rounded.button}"
    padding: "12px 22px"
  field:
    backgroundColor: "{colors.field-bg}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.field}"
    padding: "13px 15px"
  card:
    backgroundColor: "{colors.card-panel}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-padding}"
  tag:
    backgroundColor: "transparent"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  carousel-control:
    backgroundColor: "transparent"
    textColor: "{colors.text-main}"
    rounded: "50%"
    size: "46px"
  lightbox:
    backgroundColor: "#0d0c0df7"
    textColor: "#f7ece7"
    rounded: "{rounded.lightbox}"
    padding: "55px 65px 25px"
---

# Design System: Vinícius Oliveira

## Overview

**Creative North Star: "Dois mundos, a mesma dedicação"**

Dois mundos de uma mesma pessoa: tecnologia e judô apresentados por personagens de anime em camadas sobre ambientes vazios. A identidade usa Archivo, fundo quase preto, vermelho discreto e painéis translúcidos para separar leitura e imagem. No judô, a marca Sakura fornecida pelo usuário e o acervo fotográfico real convivem com a abertura ilustrada; o texto permanece em superfícies escuras.

O registro descreve a homepage estática em `portfolio/index.html`, com `style.css`, `worlds.css`, `worlds.js`, `sensei.css` e `sensei.js`. As páginas de cases e currículo conservam estilos independentes e não têm sua identidade redefinida aqui. A decisão atual em `PRODUCT.md` e `.impeccable/home-brief.md` substitui o contrato anterior de rolagem cinematográfica.

**Key Characteristics:**
- Personagens alpha derivados das artes autorizadas, ambientes mascarados e acervo real de judô.
- Archivo em títulos e texto, com hierarquia por escala e peso.
- Painéis escuros, bordas claras finas e acento vermelho restrito.

## Colors

Preto azulado e texto claro sustentam a leitura; a cor das cenas vem principalmente das artes.

### Primary

- **Vermelho de passagem:** acento da navegação selecionada e da porta; não é preenchimento geral dos botões.

### Neutral

- **Noite azulada:** fundo do mundo de tecnologia.
- **Carvão do dojo:** no judô, fundo e navegação mudam para judo-bg; todos os painéis usam judo-panel e o rodapé usa judo-footer. A neutralidade deixa as cores quentes da arte conduzirem a cena.
- **Branco suave:** texto principal e controles.
- **Cinzas frios:** parágrafos e informação secundária.
- **Vidro escuro:** painéis de abertura, seções e cards; bordas brancas transparentes os separam da imagem.
- **Dourado de foco:** contorno de foco geral herdado da implementação atual; botões têm contorno vermelho próprio.

### Named Rules

**The Texto sobre Painel Rule.** Sobre a arte, preservar uma superfície escura entre texto e imagem.

## Typography

**Display Font:** Archivo, sans-serif.
**Body Font:** Archivo, sans-serif.

A mesma família liga os dois mundos; títulos semibold, grandes e compactos contrastam com parágrafos mais soltos. As antigas declarações de Instrument Serif e Manrope são sobrescritas nesta homepage.

### Hierarchy

- **Display:** abertura, com o papel definido no frontmatter; no celular usa `clamp(30px,8.5vw,42px)`.
- **Headline:** títulos de seção; no celular ficam em (40px). Na abertura desktop, Archivo usa largura expandida (125%); celular retorna a (100%). Os painéis Sensei usam sensei-headline (34px no celular); subtítulos usam `clamp(23px,2.4vw,32px)`, peso (500), entrelinha (1.2).
- **Title:** títulos dos projetos; categorias usam (1.1rem), peso (600).
- **Body:** conteúdo geral com entrelinha do papel body; abertura usa `clamp(14px,1.2vw,18px)` e entrelinha (1.75), com limite (43ch). No celular a abertura fica em (14px), entrelinha (1.65).
- **Label:** formulário; navegação usa (13px), (12px) abaixo de 900px e (11px) abaixo de 600px. Tags usam (0.82rem).

## Layout

Navegação sticky acima de uma abertura de um viewport, com mínimo de altura. No desktop, tecnologia posiciona texto à esquerda e personagem à direita; judô inverte: personagem à esquerda e texto à direita. Personagem, ambiente e interface ocupam planos separados. As seções alternam ambientes mascarados e painéis alinhados, sem coluna lateral fixa.

Abertura: altura `calc(100svh - 80px)`, mínimo (600px). Painel com largura (42%) e máximo (580px). Personagem usa largura (49%) e altura (101%) no desktop; no celular ocupa (92%) por (66%) no topo, com painel abaixo. Judô desconta header e subnav da abertura: `calc(100svh - 125px)` no desktop e `calc(100svh - 107px)` no celular. As seções têm espaçamento (100px 6vw), com painéis de até (900px); projetos e redes ampliam para (1120px). Projetos usam duas colunas, e a grade secundária usa três, com intervalo do token grid-gap. O formulário tem máximo (620px).

Abaixo de (900px), navegação e títulos compactam. Abaixo de (600px), a abertura usa `calc(100svh - 64px)` e mínimo (650px); os painéis ficam entre margens de (5%) com padding (20px), e a arte é reenquadrada. Grades viram uma coluna, seções ilustradas usam (52px 5vw), e o rodapé empilha. Não há transição controlada pela rolagem: a página rola normalmente dentro do mundo selecionado.

## Elevation & Depth

Profundidade vem de imagem, máscaras com gradientes, tonalidade e vidro: blur (12px) nos painéis da abertura e (10px) nos painéis de seção. Cards e botões não usam sombra. Abertura usa sombra ambiente (`0 22px 70px #0005`) e a mensagem da porta usa (`0 12px 40px #0004`). A porta de transição conserva uma sombra difusa (`20px 0 60px #0008`) para sugerir oclusão, sem deslocamento duro de neobrutalismo.

## Shapes

Painéis amplos têm cantos suaves; cards e abertura usam o raio card, seções usam panel, campos usam field e botões usam button. Tags são cápsulas. Bordas finas e semitransparentes delimitam superfícies; máscaras suavizam as extremidades das artes e miniaturas.

## Components

### Buttons

Contornos discretos e texto claro. Primary e secondary convergem visualmente na homepage: fundo transparente, borda (`#a5bdcd70`) e peso (500). Hover aplica fundo (`#c0d7e715`) sem deslocamento; foco tem contorno do acento, afastado (3px). Não herdar o gradiente dos estilos antigos como aparência desta página.

### Chips

Tags informativas com borda (`#ffffff25`), fundo transparente e intervalo tag-gap. Não possuem estado selecionado ou interação de filtro.

### Cards / Containers

Cards de projeto usam card-panel, borda (`#ffffff18`) e padding card-padding; hover muda borda para (`#c37d7660`) e fundo para (`#17202a`), em (200ms). Miniaturas mantêm proporção (16/10) e máscaras nas bordas. Painéis maiores usam section-panel, borda border-panel, padding `clamp(24px,4vw,56px)`; no celular (25px 20px).

### Inputs / Fields

Nome, assunto e mensagem compartilham fundo field-bg, borda (`#ffffff40`) e padding do componente field. Labels ficam acima, separados por (9px); o formulário usa form-gap. No Judô, campos usam judo-field e a nota usa (`#c8c1bd`). Foco geral visível; textarea redimensiona verticalmente. Validação nativa exige nome e mensagem. O envio do formulário abre a mensagem no WhatsApp para revisão, sem backend. O Judô também preserva um link mailto coerente com o endereço exibido e localização copiada do portfólio-fonte; esses dados não implicam verificação externa.

### Navigation

Marca textual Archivo (24px) em Tecnologia; marca Sakura do usuário no Judô. Header sticky no topo, links compactos, hover rosa claro e borda vermelha inferior no mundo ativo. Subnav exclusiva do Judô fica sticky abaixo do header, com rolagem horizontal no celular. Currículo pertence a Tecnologia e desaparece abaixo de (900px). Projetos aponta para os projetos do mundo atual. Contato e rodapé são compartilhados. Setas decorativas usam SVG inline com viewBox de (24 × 24), traço (1.5), sem fonte de ícones.

### Porta entre mundos

Seleção por clique em Tecnologia ou Judô oculta o conteúdo do outro mundo. A porta cobre a tela em (400ms), troca o mundo e retorna ao topo; sai em (500ms), com easing `cubic-bezier(.4,0,.2,1)`. Ao terminar, o título recebe foco. Os personagens continuam sendo imagens estáticas: o movimento pertence à composição em camadas, sem simular filmagem corporal. Com `prefers-reduced-motion: reduce`, a troca é imediata e a porta desaparece.

### Camadas e microinterações

Entrada do personagem (850ms), ambiente (950ms) e painel (650ms) usa `cubic-bezier(.16,1,.3,1)`. Parallax de pointer fino desloca o personagem até (±9px) horizontal e (±6px) vertical; ambiente reage em sentido contrário com fator (-.45). Scroll acrescenta deslocamento máximo (26px). Atualizações rAF são solicitadas por eventos, sem loop contínuo. Movimento reduzido cancela entradas, zera profundidade e elimina deslocamentos. Setas deslizam (3px,-3px), sublinhado vermelho cresce em (220ms), cards respondem por cor e borda. Não converter isso numa abertura longa controlada por scroll.

### Conteúdo Sensei

Nove capítulos em carrossel manual, com contador e botões circulares (46px), sem autoplay. Cinco homenagens usam retratos recortados suavemente, linhas separadoras e texto; duas colunas no desktop e empilhamento abaixo de (600px). Oito marcos de 2017–2025 usam `details` e `summary` nativos: marcador rosa, linha divisória, texto e foto no conteúdo expandido. Numerais de seção são uma decisão expressa do usuário, renumerados por mundo; não são um padrão genérico de eyebrow a estender indiscriminadamente.

### Galeria e ampliação

A galeria reúne (525) fotos, em (44) páginas de até (12). Miniaturas otimizadas (480px), imagens maiores limitadas a (1600px), máscaras suaves e enquadramento (4:3). Três colunas no desktop; duas abaixo de (800px). Hover amplia a miniatura em (1.04), suprimido com movimento reduzido. Carregamento sob demanda ao entrar em Judô, mensagem de falha e botão de nova tentativa.

A ampliação usa `dialog` nativo com backdrop escuro e blur (6px), foto contida sem corte, legenda, fechar, anterior/próxima, setas de teclado e Escape. O foco retorna à miniatura ao fechar. No celular, controles de avanço ficam abaixo da foto. Fotografias documentam o acervo autorizado do sensei; não substituem a abertura em anime.

## Do's and Don'ts

### Do:
- **Do** manter a leitura sobre painéis escuros ao sobrepor arte.
- **Do** preservar a troca reversível entre Tecnologia e Judô e o estado ativo na navegação.
- **Do** trocar imediatamente de mundo quando prefers-reduced-motion estiver ativo.

### Don't:
- **Don't** voltar à abertura longa controlada por rolagem: a seleção por clique a substituiu.
- **Don't** apresentar ilustração estática como filmagem de uma pessoa.
- **Don't** inventar conquistas, datas e graduação; preservar os fatos e o acervo autorizados da fonte Sensei.


Atualização de continuidade: bordas das cenas dissolvidas no fundo; entradas de painel de 650 ms e arte de 850 ms apenas na primeira aparição; capítulos com saída de 140 ms e entrada de 380 ms, trajetória de 360 ms e galeria de 380 ms. Movimento reduzido preservado.


TI: escritório com monitores de código e rede e rack, sem dojô. Grafite e ciano; neon limitado aos circuitos na transição. Judô: vento com pétalas Sakura na entrada. Passagens de 1,15 s, sem loop, respeitando movimento reduzido. Fotografias dos senseis preservam proporção natural e dissolvem quatro bordas. CICLO incluído em Produtos com captura e descrição do site público.


Marca TI: monograma VO em três linhas de fibra óptica, branco e ciano, derivado do modelo 03 escolhido pelo usuário. SVG editável no topo e rodapé, com nome completo; em celular o topo usa apenas símbolo. Marca Sensei continua exclusiva ao Judô.


Área de TI dá destaque explícito a desenvolvimento web e automações na abertura e em seção própria, com exemplos dos projetos existentes e sem novas alegações de resultado.


Currículo alinhado à identidade de TI: Archivo, marca VO fibra, cabeçalho horizontal, fundo grafite e acentos ciano, documento legível sem a antiga barra lateral. Perfil destaca web e automações; CICLO incluído. Botão salva a página atual pelo diálogo de impressão/PDF, com tema de impressão claro. Histórico e formação preservados.
