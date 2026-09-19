# Denilson Bom Jesus — Portfólio

Portfólio pessoal de **Denilson Bom Jesus** — engenharia de dados, IA local e desenvolvimento full stack. Site estático simples: **HTML, CSS e JavaScript puros**, sem frameworks, sem build e sem dependências externas (apenas fontes do Google Fonts).

🔗 **GitHub:** [github.com/denilsonbomjesus](https://github.com/denilsonbomjesus)

---

## 📂 Estrutura do projeto

```
.
├── index.html   # Estrutura da página (todas as seções)
├── styles.css   # Estilos, tema e media queries
├── script.js    # Dados + interações (menu, typing, projetos, animações)
└── README.md
```

## ✨ Funcionalidades

- **Menu mobile completo** — abre/fecha pelo botão, pelo **×**, clicando fora (overlay) ou tecla **ESC**; bloqueia o scroll do fundo enquanto aberto.
- **Typing effect** no hero — cargo atual alterna automaticamente entre frases.
- **Barra de progresso de leitura** fixa no topo da página.
- **Navegação ativa** — o link do menu destaca a seção visível conforme o scroll.
- **Animações de entrada** com `IntersectionObserver` (reveal + barras de skill preenchendo).
- **Marquee de tecnologias** (rolagem infinita) na seção Stack.
- **Cards de projetos** gerados via JS a partir de um array de dados, com link direto para o repositório.
- **Acessibilidade** — `prefers-reduced-motion` respeitado, labels/aria nos controles, `alt` nas imagens.
- **100% responsivo** — mobile-first, com breakpoints progressivos em `700px` (tablet) e `1024px` (desktop).

## 📑 Seções

| # | Seção | Descrição |
|---|-------|-----------|
| — | **Hero** (`#inicio`) | Apresentação, badge de disponibilidade, typing effect, avatar e stats |
| — | **Sobre** (`#sobre`) | Texto de apresentação + card de "código" com tags |
| 01 | **Skills** (`#skills`) | 4 cards com barras de progresso por área |
| 02 | **Stack** (`#stack`) | Marquee rolável + grid de tecnologias com nível |
| 03 | **Projetos** (`#projetos`) | Grid de repositórios GitHub em destaque |
| 04 | **Formação** (`#formacao`) | Timeline: mestrado, graduação e experiência |
| 05 | **Contato** (`#contato`) | Email, GitHub, LinkedIn e Lattes |

## 🚀 Como rodar

Não há build — é só abrir:

```bash
# opção 1: abrir direto
start index.html        # Windows
open index.html         # macOS

# opção 2: servir localmente (recomendado)
python -m http.server 8000
# depois acesse http://localhost:8000
```

## 🌐 Deploy

Qualquer host de site estático funciona, por exemplo:

- **GitHub Pages** — Settings → Pages → branch `main`
- **Netlify / Vercel** — arraste a pasta ou conecte o repositório
- **Cloudflare Pages** — conecte o repositório (sem build command)

## 🛠️ Personalização

### Projetos
Os cards são gerados no `script.js` a partir do array `projects`. Cada item segue o formato:

```js
[título, descrição, [tags], linguagem, corDaLinguagem, estrelas, emoji, nomeDoRepo]
```

Edite/adiciona linhas nesse array — a grid é reconstruída automaticamente.

### Skills e Stack
No `script.js`:
- Barras de skills ficam direto no `index.html` (edite os percentuais em `style="--value:95%"`).
- Array `stack` alimenta o marquee e o grid da seção 02: `[nome, nível]`.

### Cores do tema
Todas as cores ficam nas variáveis CSS no topo do `styles.css`:

```css
:root{
  --bg:#0d1224;      /* fundo geral */
  --bg2:#131830;     /* fundo de seções alternadas */
  --surface:#181e38; /* cards */
  --text:#f2f4ff;    /* texto principal */
  --muted:#a8b3cf;   /* texto secundário */
  --primary:#9182ff; /* roxo de destaque */
  --blue:#6aa2ff;    /* azul de destaque */
}
```

### Breakpoints
- `< 700px` → mobile (1 coluna, menu hamburger)
- `≥ 700px` → tablet (2 colunas na maioria das grids)
- `≥ 1024px` → desktop (3–4 colunas, projetos em 3)

## 🧰 Tecnologias

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=white)

---

<p align="center">Feito com código e café ☕</p>
