# ⚡ Bytecraft Store — High-Performance Hardware E-Commerce

[![Live Demo](https://img.shields.io/badge/Demo%20Online-bytecraft.andrecorreia01.com.br-00f0ff?style=for-the-badge&logo=cloudflare&logoColor=white)](https://bytecraft.andrecorreia01.com.br/)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://bytecraft.andrecorreia01.com.br/)
[![Zod](https://img.shields.io/badge/Schema%20Validation-Zod%20v4-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev)
[![Architecture](https://img.shields.io/badge/Architecture-SSG%20%2B%20Zero--Cost%20Edge-10b981?style=for-the-badge)](https://bytecraft.andrecorreia01.com.br/)

> E-commerce e catálogo de hardware de alta performance com arquitetura estática otimizada (SSG), validação rigorosa de dados via **Zod**, estoque omnichannel simulado (lojas físicas e armazém central), carrinho reativo e hospedagem serverless na Cloudflare.

---

## 🌐 Demonstração Online

Aceda à versão de produção em:  
🔗 **[https://bytecraft.andrecorreia01.com.br/](https://bytecraft.andrecorreia01.com.br/)**

---

## 🎯 Destaques do Projeto

- **Validação Determinística com Zod:** 100% dos dados de produtos, categorias, mídias e especificações técnicas passam por validação estrita em tempo de build, eliminando campos indefinidos ou inconsistências.
- **Omnichannel Stock Engine:** Simulação de disponibilidade por loja física (Lisboa Benfica, Porto Gaia, Braga/Leiria) e armazém online central, com selos dinâmicos (*Em Stock*, *Poucas Unidades*, *Receba amanhã*).
- **Compilador Estático Próprio (SSG):** Pipeline Node.js em `src/build.js` que gera páginas HTML puras pré-renderizadas, garantindo **Score 99+ no Google PageSpeed / Lighthouse** e TTFB ultrabaixo.
- **Edge Deployment (Cloudflare Pages):** Configurado com `wrangler.jsonc` para distribuição global em mais de 300 pontos de presença (PoPs) com custo zero e CDN ultraveloz.
- **Experiência de Compra Fluida:** MegaMenu categorizado, busca instantânea por produto/SKU, filtros laterais, carrinho dinâmico local e checkout otimizado via WhatsApp.

---

## 📂 Categorias de Produtos

1. **Componentes:** Processadores (Intel/AMD), Placas Gráficas (RTX 40 Series / 50 Series), Motherboards, Memórias RAM DDR5, SSDs NVMe e Fontes ATX 3.0.
2. **Computadores:** Computadores Gaming pré-configurados, Workstations de IA/Edição e Portáteis Ultrafinos.
3. **Periféricos:** Monitores Gaming Fast-IPS/OLED, Teclados Mecânicos, Ratos de Alta Precisão e Headsets 7.1.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| **Linguagem & Runtime** | JavaScript Moderno (ES Modules) + Node.js |
| **Validação de Dados** | [Zod v4](https://zod.dev) |
| **Frontend & UI** | HTML5 Semântico, Tailwind CSS, Lucide Icons |
| **Build Engine** | Motor SSG nativo (`src/build.js`) |
| **Infraestrutura / Edge** | [Cloudflare Pages](https://pages.cloudflare.com/) + Wrangler CLI |

---

## 📁 Estrutura do Repositório

```text
bytecraft-store/
├── dist/                          # Páginas compiladas estáticas prontas para deploy
│   ├── index.html                 # Página inicial (Hero, Destaques, Ofertas)
│   ├── categoria-componentes.html  # Catálogo de Componentes
│   ├── categoria-computadores.html # Catálogo de Computadores & Workstations
│   ├── categoria-perifericos.html  # Catálogo de Periféricos
│   ├── politica-privacidade.html  # Compliance RGPD / Privacidade
│   ├── termos-e-condicoes.html    # Termos e Condições
│   └── catalog.json               # Dump JSON validado do catálogo
├── src/
│   ├── build.js                   # Script gerador de páginas estáticas
│   ├── catalog.js                 # Agregador e normalizador de catálogo
│   ├── schemas.js                 # Schemas Zod de Validação
│   ├── validator.js               # Runner de validação estrita
│   └── data/                      # Dados puros estruturados por categoria
│       ├── category1.js           # Componentes
│       ├── category2.js           # Computadores
│       ├── category3.js           # Periféricos
│       └── imageMap.js            # Mapeamento e CDN de imagens
├── public/                        # Ativos estáticos públicos
├── package.json                   # Dependências e scripts
└── wrangler.jsonc                 # Configuração de deploy Cloudflare Pages
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (v18+)
- npm ou pnpm

### 1. Clonar o repositório
```bash
git clone https://github.com/andreluizcorreia/bytecraft-store.git
cd bytecraft-store
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Compilar as páginas (Build SSG)
```bash
npm run build
```
O build executará o validador Zod e compilará todas as páginas para o diretório `dist/`.

### 4. Pré-visualizar localmente com Wrangler
```bash
npm run preview
```

---

## ☁️ Deploy na Nuvem (Cloudflare Pages)

O deploy é gerenciado pelo Wrangler CLI:

```bash
npm run deploy
```

---

## 👤 Autor

**André Correia**  
- Website: [andrecorreia01.com.br](https://andrecorreia01.com.br/)  
- GitHub: [@andreluizcorreia](https://github.com/andreluizcorreia)  
- LinkedIn: [André Correia](https://linkedin.com/in/andreluizcorreia)

---

## 📄 Licença

Este projeto é desenvolvido para fins de portfólio profissional e demonstração de engenharia de software moderna. Todos os direitos reservados.
