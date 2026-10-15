import fs from "fs";
import path from "path";
import { validatedCatalog } from "./validator.js";

const distDir = path.resolve("dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Salva o JSON validado para API Headless
fs.writeFileSync(path.join(distDir, "catalog.json"), JSON.stringify(validatedCatalog, null, 2), "utf-8");

// Template base de Layout com Filtros Avançados, Chatbot IA e Animações
function renderStorePage({ pageTitle, categoryFilter = null, isHome = false, legalContent = null }) {
  
  const filteredProducts = validatedCatalog.products.filter(p => {
    if (categoryFilter && p.categoryId !== categoryFilter) return false;
    return true;
  });

  return `<!DOCTYPE html>
<html lang="pt" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle} | ${validatedCatalog.storeName}</title>
  <meta name="description" content="${validatedCatalog.tagline}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            pcdDark: '#0B0F19',
            pcdSurface: '#121826',
            pcdCard: '#1A2234',
            pcdBorder: '#28334E',
            pcdPrimary: '#0066FF',
            pcdPrimaryHover: '#0052CC',
            pcdAccent: '#00D084',
            pcdOrange: '#FF5A1F',
            pcdTextMuted: '#94A3B8'
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
          },
          animation: {
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'float': 'float 3s ease-in-out infinite'
          },
          keyframes: {
            float: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-6px)' }
            }
          }
        }
      }
    }
  </script>
  <style>
    .stock-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.72rem;
      font-weight: 600;
      padding: 0.15rem 0.5rem;
      border-radius: 9999px;
    }
    .stock-in {
      background: rgba(0, 208, 132, 0.12);
      color: #00D084;
      border: 1px solid rgba(0, 208, 132, 0.3);
    }
    .stock-low {
      background: rgba(255, 90, 31, 0.12);
      color: #FF5A1F;
      border: 1px solid rgba(255, 90, 31, 0.3);
    }
    .pcd-glass {
      background: rgba(26, 34, 52, 0.85);
      backdrop-filter: blur(14px);
      border: 1px solid #28334E;
    }
    .hover-glow:hover {
      box-shadow: 0 12px 30px -5px rgba(0, 102, 255, 0.3);
      border-color: #0066FF;
      transform: translateY(-3px);
    }
    #menu-overlay { transition: opacity 0.25s ease; }
    #menu-drawer { transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    /* Animação suave para cards */
    .fade-enter {
      animation: fadeIn 0.3s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body class="bg-pcdDark text-slate-100 font-sans antialiased selection:bg-pcdPrimary selection:text-white">

  <!-- 1. TOP BAR PROMOÇÃO URGENTE -->
  <div class="bg-gradient-to-r from-blue-700 via-indigo-700 to-pcdDark border-b border-white/10 text-white text-xs py-2 px-4 font-medium">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center space-x-2">
        <span class="bg-pcdOrange text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider animate-pulse">${validatedCatalog.topBanner.urgencyBadge}</span>
        <span class="font-bold">${validatedCatalog.topBanner.campaignName}:</span>
        <span class="hidden sm:inline text-blue-100">${validatedCatalog.topBanner.highlightText}</span>
      </div>
      <div class="flex items-center space-x-4 text-[11px]">
        <span class="flex items-center"><span class="w-2 h-2 rounded-full bg-pcdAccent mr-1.5 animate-ping"></span> Envio 24h para Portugal Continental</span>
        <a href="/#catalogo" class="bg-white text-pcdDark hover:bg-slate-200 font-bold px-3 py-1 rounded transition-colors text-[11px] shadow">${validatedCatalog.topBanner.ctaText} &rarr;</a>
      </div>
    </div>
  </div>

  <!-- 2. HEADER PRINCIPAL COM TRIGGER DO MENU LATERAL (GAVETA PCDIGA) -->
  <header class="sticky top-0 z-40 bg-pcdSurface/95 backdrop-blur-md border-b border-pcdBorder">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
      <div class="flex items-center justify-between gap-4">
        
        <!-- BOTÃO HAMBURGUER GAVETA PCDIGA + LOGO -->
        <div class="flex items-center space-x-4">
          <button onclick="toggleSideMenu()" class="p-2.5 rounded-xl bg-pcdCard hover:bg-pcdBorder text-white border border-pcdBorder flex items-center justify-center transition-all group" title="Abrir Menu Departamentos">
            <svg class="w-6 h-6 text-white group-hover:text-pcdPrimary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>

          <a href="/" class="flex items-center space-x-3 flex-shrink-0 group">
            <div class="w-11 h-11 rounded-xl bg-pcdPrimary flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-pcdPrimary/40 group-hover:scale-105 transition-transform">
              B
            </div>
            <div>
              <div class="text-2xl font-black tracking-tight text-white flex items-center">
                Byte<span class="text-pcdPrimary">Craft</span>
                <span class="ml-1.5 bg-pcdBorder text-slate-300 text-[10px] font-bold px-1.5 py-0.5 rounded">PT</span>
              </div>
              <div class="text-[10px] uppercase font-mono tracking-wider text-pcdTextMuted">Hardware & Tech Store</div>
            </div>
          </a>
        </div>

        <!-- BARRA DE PESQUISA ONIPRESENTE -->
        <div class="hidden md:flex flex-1 max-w-2xl mx-6 relative">
          <input type="text" id="pcd-search" onkeyup="liveSearchProducts(this.value)" placeholder="Pesquisar por RTX 5090, 5080, Ryzen 9800X3D, OLED, SSD 4TB..." class="w-full bg-pcdCard border border-pcdBorder text-white text-sm rounded-xl px-4 py-3 pl-11 focus:outline-none focus:border-pcdPrimary transition-all placeholder:text-slate-500 shadow-inner">
          <svg class="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <div class="absolute right-3 top-2.5 bg-pcdSurface border border-pcdBorder text-[10px] font-mono text-slate-400 px-2 py-1 rounded">30 Produtos</div>
        </div>

        <!-- TELEFONE DE APOIO E BOTÃO CARRINHO -->
        <div class="flex items-center space-x-4 flex-shrink-0">
          <div class="hidden lg:flex items-center space-x-3 text-right">
            <div>
              <div class="text-[11px] text-pcdTextMuted">Linha de Apoio PT</div>
              <div class="text-xs font-bold text-white">${validatedCatalog.supportPhone}</div>
            </div>
          </div>

          <button onclick="toggleCart()" class="flex items-center space-x-3 bg-pcdPrimary hover:bg-pcdPrimaryHover px-4 py-2.5 rounded-xl text-white font-bold text-sm transition-all shadow-lg shadow-pcdPrimary/25">
            <div class="relative">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <span id="cart-counter" class="absolute -top-2 -right-2 bg-pcdOrange text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">0</span>
            </div>
            <div class="text-left hidden sm:block">
              <span class="text-[10px] block text-blue-200 uppercase font-mono leading-none">O meu carrinho</span>
              <span id="cart-header-total" class="text-xs font-black">0.00€</span>
            </div>
          </button>
        </div>

      </div>

      <!-- 3. BARRA DE ATALHOS RÁPIDOS -->
      <nav class="mt-3 pt-3 border-t border-pcdBorder flex items-center justify-between text-xs font-bold">
        <div class="flex items-center space-x-4 sm:space-x-8 text-slate-300">
          <button onclick="toggleSideMenu()" class="text-white hover:text-pcdPrimary flex items-center space-x-2 font-black">
            <svg class="w-4 h-4 text-pcdPrimary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            <span>DEPARTAMENTOS</span>
          </button>
          <a href="/categoria-componentes.html" class="hover:text-white ${categoryFilter === 'cat-componentes' ? 'text-pcdPrimary border-b-2 border-pcdPrimary pb-1' : ''}">Componentes & Hardware (RTX 50)</a>
          <a href="/categoria-computadores.html" class="hover:text-white ${categoryFilter === 'cat-computadores' ? 'text-pcdPrimary border-b-2 border-pcdPrimary pb-1' : ''}">Computadores & Armazenamento</a>
          <a href="/categoria-perifericos.html" class="hover:text-white ${categoryFilter === 'cat-perifericos' ? 'text-pcdPrimary border-b-2 border-pcdPrimary pb-1' : ''}">Periféricos & Redes</a>
          <a href="/#configurador" class="hover:text-white hidden sm:inline text-pcdAccent">Montagem de PC (49.90€)</a>
        </div>
        <div class="hidden lg:flex items-center space-x-2 text-pcdAccent font-mono text-[11px]">
          <span class="w-2 h-2 rounded-full bg-pcdAccent animate-ping"></span>
          <span>Stock 2026 Confirmado</span>
        </div>
      </nav>

    </div>
  </header>

  <!-- GAVETA LATERAL FIXA ESTILO PCDIGA (IMAGEM 2 DO USUÁRIO) -->
  <div id="menu-overlay" onclick="toggleSideMenu()" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm hidden opacity-0 transition-opacity duration-200"></div>
  
  <aside id="menu-drawer" class="fixed top-0 left-0 bottom-0 z-50 w-80 sm:w-96 bg-[#161B26] border-r border-pcdBorder flex flex-col justify-between -translate-x-full transition-transform duration-200 shadow-2xl overflow-y-auto">
    <div class="p-6">
      <div class="flex items-center justify-between pb-6 border-b border-pcdBorder">
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-lg bg-pcdPrimary flex items-center justify-center text-white font-black text-xl">B</div>
          <span class="text-xl font-black text-white">Byte<span class="text-pcdPrimary">Craft</span></span>
        </div>
        <button onclick="toggleSideMenu()" class="p-2 rounded-lg bg-pcdCard text-slate-400 hover:text-white text-xl transition-colors">&times;</button>
      </div>

      <div class="mt-6 space-y-1">
        <div class="text-[11px] font-mono uppercase text-slate-400 tracking-wider mb-2 px-3">Departamentos Oficiais</div>
        
        <a href="/categoria-componentes.html" class="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-pcdCard text-sm font-bold text-white transition-all group">
          <div class="flex items-center space-x-3">
            <span class="text-lg">🔲</span>
            <span class="group-hover:text-pcdPrimary transition-colors">Componentes & Hardware</span>
          </div>
          <span class="text-xs text-slate-500 font-mono">10</span>
        </a>

        <a href="/categoria-computadores.html" class="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-pcdCard text-sm font-bold text-white transition-all group">
          <div class="flex items-center space-x-3">
            <span class="text-lg">🖥️</span>
            <span class="group-hover:text-pcdPrimary transition-colors">Computadores & Armazenamento</span>
          </div>
          <span class="text-xs text-slate-500 font-mono">10</span>
        </a>

        <a href="/categoria-perifericos.html" class="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-pcdCard text-sm font-bold text-white transition-all group">
          <div class="flex items-center space-x-3">
            <span class="text-lg">⌨️</span>
            <span class="group-hover:text-pcdPrimary transition-colors">Periféricos & Redes</span>
          </div>
          <span class="text-xs text-slate-500 font-mono">10</span>
        </a>
      </div>

      <div class="mt-8 pt-6 border-t border-pcdBorder space-y-1 text-xs">
        <div class="text-[11px] font-mono uppercase text-slate-400 tracking-wider mb-2 px-3">Serviços & Políticas Oficiais</div>
        
        <a href="/#configurador" onclick="toggleSideMenu()" class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-pcdCard transition-colors">
          <span>⚙️</span>
          <span>Configurador de PC & Montagem</span>
        </a>

        <a href="/termos-e-condicoes.html" class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-pcdCard transition-colors">
          <span>📜</span>
          <span>Termos e Condições Gerais (Garantia 3 Anos)</span>
        </a>

        <a href="/politica-privacidade.html" class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-pcdCard transition-colors">
          <span>🔒</span>
          <span>Política de Privacidade e Cookies (RGPD)</span>
        </a>

        <a href="https://www.livroreclamacoes.pt" target="_blank" class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-pcdOrange hover:bg-pcdCard transition-colors">
          <span>📖</span>
          <span>Livro de Reclamações Eletrónico</span>
        </a>
      </div>
    </div>

    <div class="p-6 border-t border-pcdBorder bg-pcdDark/60 text-xs text-slate-400">
      <div class="font-bold text-white mb-1">Linha de Apoio Direto</div>
      <div>Segunda a Sexta: 09h00 às 19h00</div>
      <div class="text-pcdPrimary font-mono mt-1 font-bold">${validatedCatalog.supportPhone}</div>
    </div>
  </aside>

  ${legalContent ? `
  <!-- CONTEÚDO DE PÁGINAS LEGAIS (TERMOS / PRIVACIDADE) -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    ${legalContent}
  </main>
  ` : `
  
  ${isHome ? `
  <!-- 4. BANNER PRINCIPAL COM DESTAQUE DE OFERTAS & RELÓGIO -->
  <section id="ofertas-relogio" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
    <div class="bg-gradient-to-br from-pcdCard via-slate-900 to-pcdDark rounded-2xl border border-pcdBorder p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
      
      <div class="relative z-10 max-w-xl">
        <div class="inline-flex items-center space-x-2 bg-pcdOrange/10 border border-pcdOrange/30 text-pcdOrange text-xs font-black uppercase px-3 py-1 rounded-full mb-4">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>ERA RTX 50 • STOCK REAL CONFIRMADO PORTUGAL</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          NVIDIA GeForce <span class="text-pcdPrimary">RTX Série 50</span> & Ryzen 9000
        </h1>
        <p class="text-sm text-slate-300 mt-4 leading-relaxed">
          Os componentes mais avançados do mundo com suporte a DLSS 4, GDDR7, PCIe 5.0 e serviço de montagem certificado pela equipa ByteCraft.
        </p>
        <div class="mt-6 flex flex-wrap gap-4 text-xs font-bold">
          <a href="/categoria-componentes.html" class="bg-pcdPrimary hover:bg-pcdPrimaryHover text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-pcdPrimary/30">Explorar Placas RTX Série 50 &rarr;</a>
          <a href="/categoria-computadores.html" class="bg-pcdSurface hover:bg-pcdBorder text-white border border-pcdBorder px-6 py-3 rounded-xl transition-all">Ver Desktops Montados</a>
        </div>
      </div>

      <div class="relative z-10 w-full md:w-auto flex-shrink-0 grid grid-cols-2 gap-4">
        <div class="p-4 rounded-xl bg-pcdSurface/80 border border-pcdBorder text-center">
          <div class="text-pcdPrimary font-black text-2xl">24h / 48h</div>
          <div class="text-[11px] text-slate-400 mt-1">Expedição Expresso Nacional</div>
        </div>
        <div class="p-4 rounded-xl bg-pcdSurface/80 border border-pcdBorder text-center">
          <div class="text-pcdAccent font-black text-2xl">MB WAY</div>
          <div class="text-[11px] text-slate-400 mt-1">Checkout Seguro e Imediato</div>
        </div>
        <div class="p-4 rounded-xl bg-pcdSurface/80 border border-pcdBorder text-center">
          <div class="text-white font-black text-2xl">3 Lojas</div>
          <div class="text-[11px] text-slate-400 mt-1">Lisboa, Porto e Leiria</div>
        </div>
        <div class="p-4 rounded-xl bg-pcdSurface/80 border border-pcdBorder text-center">
          <div class="text-pcdOrange font-black text-2xl">3 Anos</div>
          <div class="text-[11px] text-slate-400 mt-1">Garantia Nacional Completa</div>
        </div>
      </div>

    </div>
  </section>

  <!-- 5. BOLINHAS CIRCULARES DE CATEGORIAS (10 BOLINHAS PERFEITAMENTE ALINHADAS - IMAGEM 5) -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="border-b border-pcdBorder/60 pb-8">
      <div class="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-4">Navegação Rápida por Departamentos (10 Categorias Alinhadas)</div>
      
      <!-- GRID DE 10 BOLINHAS ALINHADAS (RESPONSIVO E JUSTIFICADO) -->
      <div class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4 sm:gap-6 justify-items-center">
        
        <!-- 1. Placas Gráficas RTX 50 -->
        <a href="/categoria-componentes.html" class="flex flex-col items-center group w-full">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pcdCard border-2 border-pcdBorder group-hover:border-pcdPrimary p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-pcdPrimary/40">
            <img src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=200&q=80" alt="Placas Gráficas RTX 50" class="w-full h-full object-cover rounded-full">
          </div>
          <span class="text-[11px] font-bold text-slate-300 group-hover:text-white mt-2 text-center leading-tight">Placas<br><span class="text-[10px] text-pcdPrimary font-mono">RTX 50</span></span>
        </a>

        <!-- 2. Processadores -->
        <a href="/categoria-componentes.html" class="flex flex-col items-center group w-full">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pcdCard border-2 border-pcdBorder group-hover:border-pcdPrimary p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-pcdPrimary/40">
            <img src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=200&q=80" alt="Processadores" class="w-full h-full object-cover rounded-full">
          </div>
          <span class="text-[11px] font-bold text-slate-300 group-hover:text-white mt-2 text-center leading-tight">CPUs<br><span class="text-[10px] text-amber-400 font-mono">Ryzen 9000</span></span>
        </a>

        <!-- 3. Motherboards -->
        <a href="/categoria-componentes.html" class="flex flex-col items-center group w-full">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pcdCard border-2 border-pcdBorder group-hover:border-pcdPrimary p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-pcdPrimary/40">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80" alt="Motherboards" class="w-full h-full object-cover rounded-full">
          </div>
          <span class="text-[11px] font-bold text-slate-300 group-hover:text-white mt-2 text-center leading-tight">Motherboards<br><span class="text-[10px] text-cyan-400 font-mono">X870 / Z890</span></span>
        </a>

        <!-- 4. Computadores Desktop Gaming -->
        <a href="/categoria-computadores.html" class="flex flex-col items-center group w-full">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pcdCard border-2 border-pcdBorder group-hover:border-pcdPrimary p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-pcdPrimary/40">
            <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=200&q=80" alt="Computadores Gaming" class="w-full h-full object-cover rounded-full">
          </div>
          <span class="text-[11px] font-bold text-slate-300 group-hover:text-white mt-2 text-center leading-tight">Desktops<br><span class="text-[10px] text-pcdAccent font-mono">Gaming PC</span></span>
        </a>

        <!-- 5. Portáteis -->
        <a href="/categoria-computadores.html" class="flex flex-col items-center group w-full">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pcdCard border-2 border-pcdBorder group-hover:border-pcdPrimary p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-pcdPrimary/40">
            <img src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=200&q=80" alt="Portáteis" class="w-full h-full object-cover rounded-full">
          </div>
          <span class="text-[11px] font-bold text-slate-300 group-hover:text-white mt-2 text-center leading-tight">Portáteis<br><span class="text-[10px] text-blue-300 font-mono">Core Ultra/AI</span></span>
        </a>

        <!-- 6. Armazenamento SSD Gen5 -->
        <a href="/categoria-computadores.html" class="flex flex-col items-center group w-full">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pcdCard border-2 border-pcdBorder group-hover:border-pcdPrimary p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-pcdPrimary/40">
            <img src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=200&q=80" alt="Armazenamento SSD" class="w-full h-full object-cover rounded-full">
          </div>
          <span class="text-[11px] font-bold text-slate-300 group-hover:text-white mt-2 text-center leading-tight">Discos SSD<br><span class="text-[10px] text-pcdOrange font-mono">PCIe 5.0</span></span>
        </a>

        <!-- 7. Monitores QD-OLED -->
        <a href="/categoria-perifericos.html" class="flex flex-col items-center group w-full">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pcdCard border-2 border-pcdBorder group-hover:border-pcdPrimary p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-pcdPrimary/40">
            <img src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=200&q=80" alt="Monitores QD-OLED" class="w-full h-full object-cover rounded-full">
          </div>
          <span class="text-[11px] font-bold text-slate-300 group-hover:text-white mt-2 text-center leading-tight">Monitores<br><span class="text-[10px] text-pcdAccent font-mono">QD-OLED 240Hz</span></span>
        </a>

        <!-- 8. Teclados Magnéticos -->
        <a href="/categoria-perifericos.html" class="flex flex-col items-center group w-full">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pcdCard border-2 border-pcdBorder group-hover:border-pcdPrimary p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-pcdPrimary/40">
            <img src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80" alt="Teclados Magnéticos" class="w-full h-full object-cover rounded-full">
          </div>
          <span class="text-[11px] font-bold text-slate-300 group-hover:text-white mt-2 text-center leading-tight">Teclados<br><span class="text-[10px] text-purple-400 font-mono">Hall Effect</span></span>
        </a>

        <!-- 9. Ratos 8000Hz -->
        <a href="/categoria-perifericos.html" class="flex flex-col items-center group w-full">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pcdCard border-2 border-pcdBorder group-hover:border-pcdPrimary p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-pcdPrimary/40">
            <img src="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=200&q=80" alt="Ratos Gaming" class="w-full h-full object-cover rounded-full">
          </div>
          <span class="text-[11px] font-bold text-slate-300 group-hover:text-white mt-2 text-center leading-tight">Ratos Gamers<br><span class="text-[10px] text-blue-400 font-mono">8000Hz Ultra</span></span>
        </a>

        <!-- 10. Routers Wi-Fi 7 -->
        <a href="/categoria-perifericos.html" class="flex flex-col items-center group w-full">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pcdCard border-2 border-pcdBorder group-hover:border-pcdPrimary p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-pcdPrimary/40">
            <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=200&q=80" alt="Redes Wi-Fi 7" class="w-full h-full object-cover rounded-full">
          </div>
          <span class="text-[11px] font-bold text-slate-300 group-hover:text-white mt-2 text-center leading-tight">Redes<br><span class="text-[10px] text-emerald-400 font-mono">Wi-Fi 7 Multi-G</span></span>
        </a>

      </div>
    </div>
  </section>
  ` : ''}

  <!-- 6. GRID DETERMINÍSTICO DE PRODUTOS COM FILTROS E ORDENAÇÃO DINÂMICA -->
  <main id="catalogo" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    <!-- BARRA DE CONTROLO DE FILTROS & ORDENAÇÃO RICA (REQUISITO EXPLÍCITO DO USUÁRIO) -->
    <div class="bg-pcdCard border border-pcdBorder p-4 sm:p-6 rounded-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
      <div>
        <h2 class="text-2xl font-black text-white flex items-center">
          <span>${isHome ? 'Catálogo Geral de Produtos' : pageTitle}</span>
          <span id="product-count-badge" class="ml-3 text-xs bg-pcdPrimary/15 text-pcdPrimary font-mono px-3 py-1 rounded-full border border-pcdPrimary/30 font-bold">${filteredProducts.length} Artigos</span>
        </h2>
        <p class="text-xs text-slate-400 mt-1">Impostos incluídos a 23% • Entregas em 24h para Portugal Continental</p>
      </div>

      <!-- SELETOR DE ORDENAÇÃO & BOTÕES RÁPIDOS -->
      <div class="flex flex-wrap items-center gap-3">
        <label for="sort-select" class="text-xs font-bold text-slate-300 flex items-center">
          <svg class="w-4 h-4 mr-1 text-pcdPrimary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
          Ordenar:
        </label>
        
        <select id="sort-select" onchange="applySorting(this.value)" class="bg-pcdSurface border border-pcdBorder text-white text-xs font-bold rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-pcdPrimary transition-all cursor-pointer">
          <option value="featured">Destaques Recomendados</option>
          <option value="price-asc">Preço: Menor para Maior (€ &uarr;)</option>
          <option value="price-desc">Preço: Maior para Menor (€ &darr;)</option>
          <option value="popular">Mais Comprados / Avaliados</option>
          <option value="promo">Apenas Promoções e Descontos</option>
          <option value="name-asc">Nome: A &rarr; Z</option>
          <option value="name-desc">Nome: Z &rarr; A</option>
        </select>

        <div class="hidden sm:flex items-center space-x-1 border-l border-pcdBorder pl-3">
          <button onclick="filterByBadge('promo')" class="px-3 py-1.5 rounded-lg bg-pcdOrange/15 hover:bg-pcdOrange/25 text-pcdOrange text-xs font-bold border border-pcdOrange/30 transition-colors">🔥 Ofertas</button>
          <button onclick="resetFilters()" class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10 transition-colors">Limpar</button>
        </div>
      </div>
    </div>

    <!-- CARDS DE PRODUTOS (RENDERIZADOS DETERMINISTICAMENTE) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="products-container">
      ${filteredProducts.map(p => `
        <div class="product-card pcd-glass hover-glow rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 border border-pcdBorder fade-enter" 
             data-id="${p.id}" 
             data-price="${p.price}" 
             data-rating="${p.rating}" 
             data-reviews="${p.reviewsCount}" 
             data-title="${p.title}" 
             data-promo="${p.discountPercent ? 'true' : 'false'}"
             data-category="${p.categoryId}">
          
          <div>
            <!-- HEADER DO CARD: MARCA E BADGE DE DESCONTO -->
            <div class="p-4 pb-2 flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-wider text-pcdTextMuted font-bold">${p.brand}</span>
              ${p.discountPercent ? `<span class="bg-pcdOrange text-white text-[11px] font-black px-2 py-0.5 rounded shadow">-${p.discountPercent}%</span>` : ''}
            </div>

            <!-- IMAGEM COM PROPORÇÃO E ZOOM HOVER -->
            <div class="relative h-48 bg-pcdSurface/60 p-4 flex items-center justify-center overflow-hidden">
              <img src="${p.media[0].url}" alt="${p.media[0].alt}" class="max-h-full object-contain hover:scale-105 transition-transform duration-300" loading="lazy">
              ${p.highlightBadge ? `<span class="absolute bottom-2 left-2 bg-pcdPrimary/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">${p.highlightBadge}</span>` : ''}
            </div>

            <!-- INFOS E REVIEWS -->
            <div class="p-5">
              <div class="text-[11px] font-mono text-slate-500">SKU: ${p.sku}</div>
              <h3 class="text-sm font-bold text-white mt-1 leading-snug line-clamp-2 hover:text-pcdPrimary cursor-pointer transition-colors" onclick="openProductDetail('${p.id}')">${p.title}</h3>
              
              <div class="flex items-center space-x-2 mt-2">
                <div class="flex text-amber-400 text-xs">★★★★★</div>
                <span class="text-[11px] text-slate-400 font-medium font-mono">${p.rating} (${p.reviewsCount} avaliações)</span>
              </div>

              <!-- BULLET POINTS TÉCNICOS -->
              <ul class="mt-3 space-y-1 text-[11px] text-slate-300">
                ${p.shortSpecs.slice(0, 3).map(spec => `
                  <li class="flex items-center"><span class="w-1.5 h-1.5 rounded-full bg-pcdPrimary mr-2 flex-shrink-0"></span><span class="line-clamp-1">${spec}</span></li>
                `).join('')}
              </ul>

              <!-- DISPONIBILIDADE EM LOJAS FÍSICAS REAIS -->
              <div class="mt-4 pt-3 border-t border-pcdBorder/60 bg-pcdDark/40 p-3 rounded-xl text-[11px]">
                <div class="font-bold text-slate-300 mb-2 flex items-center justify-between">
                  <span>Disponibilidade:</span>
                  <span class="text-pcdAccent font-mono font-semibold">${p.fastShippingPill}</span>
                </div>
                <div class="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div>Online: <span class="stock-badge ${p.stockStatus.onlineWarehouse === 'Em Stock' ? 'stock-in' : 'stock-low'}">${p.stockStatus.onlineWarehouse}</span></div>
                  <div>Lisboa: <span class="stock-badge ${p.stockStatus.lisboaBenfica === 'Em Stock' ? 'stock-in' : 'stock-low'}">${p.stockStatus.lisboaBenfica}</span></div>
                  <div>Porto: <span class="stock-badge ${p.stockStatus.portoGaia === 'Em Stock' ? 'stock-in' : 'stock-low'}">${p.stockStatus.portoGaia}</span></div>
                  <div>Leiria: <span class="stock-badge ${p.stockStatus.bragaLeiria === 'Em Stock' ? 'stock-in' : 'stock-low'}">${p.stockStatus.bragaLeiria}</span></div>
                </div>
              </div>

            </div>
          </div>

          <!-- FOOTER DO CARD -->
          <div class="p-5 pt-0">
            <div class="flex items-baseline justify-between mb-3">
              <div>
                ${p.oldPrice ? `<span class="text-xs text-slate-500 line-through mr-2 font-mono">${p.oldPrice.toFixed(2)}€</span>` : ''}
                <span class="text-2xl font-black text-white font-mono">${p.price.toFixed(2)}€</span>
              </div>
              <span class="text-[10px] text-slate-400">c/ IVA 23%</span>
            </div>

            <div class="grid grid-cols-4 gap-2">
              <button onclick="addToCart('${p.id}', '${p.title.replace(/'/g, "")}', ${p.price})" class="col-span-3 bg-pcdPrimary hover:bg-pcdPrimaryHover text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-pcdPrimary/20 hover:scale-[1.02]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                <span>Adicionar</span>
              </button>
              <button onclick="openProductDetail('${p.id}')" title="Ver Ficha Técnica" class="col-span-1 bg-pcdBorder hover:bg-slate-700 text-white rounded-xl flex items-center justify-center transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </button>
            </div>
          </div>

        </div>
      `).join('')}
    </div>
  </main>
  `}

  <!-- 7. CONFIGURADOR DE COMPUTADORES & MONTAGEM PRO -->
  <section id="configurador" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="bg-gradient-to-r from-pcdCard to-pcdSurface rounded-2xl border border-pcdBorder p-8 md:p-12">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div>
          <span class="text-xs font-mono font-bold uppercase text-pcdAccent tracking-widest">Bancada Técnica ByteCraft Lab</span>
          <h2 class="text-3xl font-black text-white mt-2">Configurador de PC & Serviço de Montagem Oficial Pro</h2>
          <p class="text-slate-300 text-sm max-w-2xl mt-3 leading-relaxed">
            Montagem meticulosa em bancada antiestática ESD, cable management artesanal e 24 horas contínuas de testes de stress térmico e elétrico com AIDA64 e FurMark.
          </p>
          <div class="mt-6 flex flex-wrap gap-4 text-xs font-bold">
            <button onclick="addToCart('prod-srv-bytecraft-montagem-pro', 'Serviço ByteCraft Pro Montagem e Testes', 49.90)" class="bg-pcdAccent hover:bg-emerald-600 text-pcdDark px-6 py-3 rounded-xl transition-all shadow-lg shadow-pcdAccent/20">Adicionar Montagem Pro (49.90€)</button>
            <a href="https://wa.me/351210000000" target="_blank" class="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl border border-white/10 transition-colors">Falar com Técnico no WhatsApp</a>
          </div>
        </div>
        <div class="p-6 rounded-2xl bg-pcdDark/80 border border-pcdBorder w-full lg:w-80 flex-shrink-0 text-center">
          <div class="text-4xl font-black text-pcdAccent">32 Pontos</div>
          <div class="text-sm font-bold text-white mt-1">Checklist de Controlo</div>
          <p class="text-xs text-slate-400 mt-2">Garantia total de compatibilidade física, elétrica e térmica antes do envio.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 8. FOOTER COMPLETO COM LINKS LEGAIS OBRIGATÓRIOS -->
  <footer id="lojas-stock" class="bg-pcdSurface border-t border-pcdBorder text-slate-400 text-xs py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div class="text-xl font-black text-white">Byte<span class="text-pcdPrimary">Craft</span> PT</div>
        <p class="mt-3 text-slate-400 leading-relaxed">
          A referência nacional em hardware de ponta, periféricos e componentes para a era RTX 50 e processadores de nova geração.
        </p>
        <div class="mt-4 text-[11px] font-mono text-slate-500">
          Subdomínio Cloudflare Ativo:<br>
          <a href="https://bytecraft.andrecorreia01.com.br" class="text-pcdPrimary font-bold hover:underline">bytecraft.andrecorreia01.com.br</a>
        </div>
      </div>

      <div>
        <h4 class="text-white font-bold text-sm mb-4">Departamentos & Páginas</h4>
        <ul class="space-y-2">
          <li><a href="/categoria-componentes.html" class="hover:text-white">Componentes & Hardware (RTX 50)</a></li>
          <li><a href="/categoria-computadores.html" class="hover:text-white">Computadores & Armazenamento</a></li>
          <li><a href="/categoria-perifericos.html" class="hover:text-white">Periféricos & Redes</a></li>
          <li><a href="/termos-e-condicoes.html" class="text-pcdPrimary hover:underline">Termos e Condições (Garantia 3 Anos)</a></li>
          <li><a href="/politica-privacidade.html" class="text-pcdAccent hover:underline">Política de Privacidade e Cookies (RGPD)</a></li>
          <li><a href="https://www.livroreclamacoes.pt" target="_blank" class="text-pcdOrange hover:underline font-bold">Livro de Reclamações Eletrónico</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-bold text-sm mb-4">Lojas Físicas & Levantamentos</h4>
        <ul class="space-y-2 text-slate-300">
          <li><strong class="text-white">Lisboa / Benfica:</strong> 10h00 às 20h00</li>
          <li><strong class="text-white">Porto / Gaia:</strong> 10h00 às 19h30</li>
          <li><strong class="text-white">Leiria:</strong> 10h00 às 19h00</li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-bold text-sm mb-4">Pagamentos Suportados em Portugal</h4>
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="bg-pcdCard border border-pcdBorder px-3 py-1.5 rounded-lg text-white font-bold text-xs">MB WAY</span>
          <span class="bg-pcdCard border border-pcdBorder px-3 py-1.5 rounded-lg text-white font-bold text-xs">Multibanco</span>
          <span class="bg-pcdCard border border-pcdBorder px-3 py-1.5 rounded-lg text-white font-bold text-xs">Cartão de Crédito</span>
        </div>
        <p class="text-[11px] text-slate-500">Transações protegidas por TLS 1.3 Full Strict Edge Cloudflare.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-pcdBorder/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
      <div>© 2026 ByteCraft Informática, Lda. Formando: André Correia • Módulo No-Code IEFP.</div>
      <div class="mt-2 sm:mt-0">Decreto-Lei n.º 24/2014 & Decreto-Lei n.º 84/2021 Compliant.</div>
    </div>
  </footer>

  <!-- 9. WIDGET DE CHATBOT IA NO CANTO INFERIOR DIREITO (REQUISITO EXPLÍCITO) -->
  <div class="fixed bottom-6 right-6 z-50">
    <!-- BOTÃO FLUTUANTE DO CHATBOT -->
    <button onclick="toggleChatbot()" id="chat-toggle-btn" class="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 hover:scale-110 transition-transform focus:outline-none animate-float">
      <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
      <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-pcdAccent rounded-full border-2 border-pcdDark"></span>
    </button>

    <!-- JANELA DE CONVERSA DO CHATBOT -->
    <div id="chatbot-window" class="hidden absolute bottom-16 right-0 w-80 sm:w-96 bg-pcdSurface border border-pcdBorder rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300">
      <!-- HEADER DO CHAT -->
      <div class="bg-gradient-to-r from-blue-700 to-pcdDark p-4 flex items-center justify-between border-b border-pcdBorder">
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-full bg-pcdPrimary flex items-center justify-center text-white font-bold text-sm">IA</div>
          <div>
            <h4 class="text-sm font-black text-white">Assistente Técnico ByteCraft</h4>
            <div class="flex items-center text-[10px] text-emerald-300">
              <span class="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              Online • Especialista em Hardware
            </div>
          </div>
        </div>
        <button onclick="toggleChatbot()" class="text-slate-300 hover:text-white text-xl">&times;</button>
      </div>

      <!-- MENSAGENS -->
      <div id="chat-messages" class="p-4 space-y-3 h-72 overflow-y-auto text-xs">
        <div class="p-3 rounded-xl bg-pcdCard border border-pcdBorder text-slate-200">
          Olá! Sou o assistente de hardware da ByteCraft. Como posso ajudar com a compatibilidade da tua máquina, placas RTX Série 50 ou prazos de entrega em Portugal?
        </div>
      </div>

      <!-- SUGESTÕES RÁPIDAS -->
      <div class="px-4 py-2 border-t border-pcdBorder bg-pcdDark/40 flex flex-wrap gap-1.5 text-[10px]">
        <button onclick="sendQuickMessage('Qual a melhor RTX 50 para 1440p?')" class="bg-pcdCard hover:bg-pcdBorder text-slate-300 px-2 py-1 rounded-md border border-pcdBorder">RTX 50 para 1440p?</button>
        <button onclick="sendQuickMessage('Quanto tempo demora o envio?')" class="bg-pcdCard hover:bg-pcdBorder text-slate-300 px-2 py-1 rounded-md border border-pcdBorder">Prazos de Envio</button>
        <button onclick="sendQuickMessage('Posso pagar com MB WAY?')" class="bg-pcdCard hover:bg-pcdBorder text-slate-300 px-2 py-1 rounded-md border border-pcdBorder">Pagar com MB WAY</button>
      </div>

      <!-- INPUT DO CHAT -->
      <form onsubmit="handleChatSubmit(event)" class="p-3 border-t border-pcdBorder bg-pcdSurface flex gap-2">
        <input type="text" id="chat-input" placeholder="Escreve uma pergunta sobre hardware..." class="flex-1 bg-pcdCard border border-pcdBorder rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pcdPrimary">
        <button type="submit" class="bg-pcdPrimary hover:bg-pcdPrimaryHover text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors">Enviar</button>
      </form>
    </div>
  </div>

  <!-- DRAWER DO CARRINHO (ESTILO CHECKOUT EXPRESSO MB WAY) -->
  <div id="cart-drawer" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm hidden flex justify-end transition-opacity">
    <div class="w-full max-w-md bg-pcdSurface h-full p-6 flex flex-col justify-between border-l border-pcdBorder shadow-2xl">
      <div>
        <div class="flex items-center justify-between pb-4 border-b border-pcdBorder">
          <div>
            <h3 class="text-lg font-black text-white">Carrinho de Compras</h3>
            <span class="text-xs text-slate-400">Envio para Portugal Continental</span>
          </div>
          <button onclick="toggleCart()" class="text-slate-400 hover:text-white text-2xl">&times;</button>
        </div>
        <div id="cart-items-list" class="mt-6 space-y-3 overflow-y-auto max-h-[60vh]">
          <p class="text-xs text-slate-400">O carrinho está vazio.</p>
        </div>
      </div>

      <div class="pt-6 border-t border-pcdBorder">
        <div class="space-y-2 text-xs mb-4">
          <div class="flex justify-between text-slate-400">
            <span>Subtotal:</span>
            <span id="cart-subtotal" class="font-mono text-white">0.00€</span>
          </div>
          <div class="flex justify-between text-slate-400">
            <span>Portes de Envio:</span>
            <span id="cart-shipping" class="text-pcdAccent font-bold">Grátis</span>
          </div>
          <div class="flex justify-between text-base font-black text-white pt-2 border-t border-pcdBorder/50">
            <span>Total com IVA:</span>
            <span id="cart-drawer-total" class="font-mono text-pcdPrimary text-xl">0.00€</span>
          </div>
        </div>

        <button onclick="simularCheckoutMBWay()" class="w-full py-3.5 bg-pcdAccent hover:bg-emerald-600 text-pcdDark font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-pcdAccent/20 flex items-center justify-center space-x-2">
          <span>Pagar com MB WAY</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
        <p class="text-[10px] text-center text-slate-500 mt-2">Ambiente Demonstrativo IEFP • Webhooks prontos para conexão ativa</p>
      </div>
    </div>
  </div>

  <!-- MODAL DE FICHA TÉCNICA -->
  <div id="detail-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md hidden flex items-center justify-center p-4">
    <div class="bg-pcdSurface border border-pcdBorder rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-start pb-4 border-b border-pcdBorder">
        <h3 id="modal-title" class="text-lg font-black text-white"></h3>
        <button onclick="closeProductDetail()" class="text-slate-400 hover:text-white text-2xl">&times;</button>
      </div>
      <div id="modal-content" class="mt-4 text-xs space-y-4"></div>
    </div>
  </div>

  <!-- SCRIPTS GERAIS (ORDENAÇÃO, FILTROS, CARRINHO E CHATBOT) -->
  <script>
    let products = ${JSON.stringify(validatedCatalog.products)};
    let cart = [];

    function toggleSideMenu() {
      const drawer = document.getElementById('menu-drawer');
      const overlay = document.getElementById('menu-overlay');
      const isOpen = !drawer.classList.contains('-translate-x-full');
      
      if (isOpen) {
        drawer.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 200);
      } else {
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        drawer.classList.remove('-translate-x-full');
      }
    }

    function toggleCart() {
      document.getElementById('cart-drawer').classList.toggle('hidden');
    }

    function addToCart(id, title, price) {
      cart.push({ id, title, price });
      updateCartDisplay();
      document.getElementById('cart-drawer').classList.remove('hidden');
    }

    function updateCartDisplay() {
      document.getElementById('cart-counter').innerText = cart.length;
      let total = cart.reduce((acc, curr) => acc + curr.price, 0);
      document.getElementById('cart-header-total').innerText = total.toFixed(2) + '€';
      document.getElementById('cart-subtotal').innerText = total.toFixed(2) + '€';
      document.getElementById('cart-drawer-total').innerText = total.toFixed(2) + '€';

      const list = document.getElementById('cart-items-list');
      if (cart.length === 0) {
        list.innerHTML = '<p class="text-xs text-slate-400">O carrinho está vazio.</p>';
        return;
      }
      list.innerHTML = cart.map((item, idx) => \`
        <div class="p-3 bg-pcdCard rounded-xl border border-pcdBorder flex items-center justify-between text-xs">
          <div>
            <div class="font-bold text-white line-clamp-1">\${item.title}</div>
            <div class="text-pcdPrimary font-mono font-bold mt-0.5">\${item.price.toFixed(2)}€</div>
          </div>
          <button onclick="removeFromCart(\${idx})" class="text-red-400 hover:text-red-300 ml-2">&times;</button>
        </div>
      \`).join('');
    }

    function removeFromCart(index) {
      cart.splice(index, 1);
      updateCartDisplay();
    }

    function simularCheckoutMBWay() {
      if (cart.length === 0) {
        alert("O teu carrinho está vazio. Adiciona um produto primeiro.");
        return;
      }
      alert("✅ Simulação MB WAY: Notificação enviada para o telemóvel para autorização em 5 minutos! Integração de webhook pronta.");
    }

    // --- SISTEMA DE ORDENAÇÃO DINÂMICA ---
    function applySorting(criterion) {
      const container = document.getElementById('products-container');
      if (!container) return;
      const cards = Array.from(container.getElementsByClassName('product-card'));

      cards.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));
        const titleA = a.getAttribute('data-title').toLowerCase();
        const titleB = b.getAttribute('data-title').toLowerCase();
        const reviewsA = parseInt(a.getAttribute('data-reviews'), 10);
        const reviewsB = parseInt(b.getAttribute('data-reviews'), 10);
        const promoA = a.getAttribute('data-promo') === 'true';
        const promoB = b.getAttribute('data-promo') === 'true';

        switch (criterion) {
          case 'price-asc': return priceA - priceB;
          case 'price-desc': return priceB - priceA;
          case 'popular': return reviewsB - reviewsA;
          case 'name-asc': return titleA.localeCompare(titleB);
          case 'name-desc': return titleB.localeCompare(titleA);
          case 'promo': return (promoB ? 1 : 0) - (promoA ? 1 : 0);
          default: return 0;
        }
      });

      cards.forEach(card => {
        card.classList.remove('fade-enter');
        void card.offsetWidth; // trigger reflow
        card.classList.add('fade-enter');
        container.appendChild(card);
      });
    }

    function filterByBadge(badge) {
      const container = document.getElementById('products-container');
      if (!container) return;
      const cards = Array.from(container.getElementsByClassName('product-card'));
      let visibleCount = 0;
      cards.forEach(card => {
        if (badge === 'promo') {
          const isPromo = card.getAttribute('data-promo') === 'true';
          card.style.display = isPromo ? 'flex' : 'none';
          if (isPromo) visibleCount++;
        }
      });
      const badgeElem = document.getElementById('product-count-badge');
      if (badgeElem) badgeElem.innerText = visibleCount + ' Artigos';
    }

    function resetFilters() {
      const container = document.getElementById('products-container');
      if (!container) return;
      const cards = Array.from(container.getElementsByClassName('product-card'));
      cards.forEach(card => card.style.display = 'flex');
      const badgeElem = document.getElementById('product-count-badge');
      if (badgeElem) badgeElem.innerText = cards.length + ' Artigos';
      const select = document.getElementById('sort-select');
      if (select) select.value = 'featured';
    }

    function liveSearchProducts(query) {
      const q = query.toLowerCase();
      document.querySelectorAll('#products-container > div').forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(q) ? 'flex' : 'none';
      });
    }

    function openProductDetail(id) {
      const prod = products.find(p => p.id === id);
      if (!prod) return;
      document.getElementById('modal-title').innerText = prod.title;
      const content = document.getElementById('modal-content');
      content.innerHTML = \`
        <div class="p-3 bg-pcdDark rounded-xl border border-pcdBorder">
          <span class="text-pcdAccent font-bold">Compatibilidade & Garantia:</span>
          <p class="text-slate-300 mt-1">\${prod.compatibilityStatus}</p>
        </div>
        <h4 class="font-bold text-white mt-4">Especificações Técnicas Oficiais:</h4>
        <div class="grid grid-cols-2 gap-2 mt-2">
          \${Object.entries(prod.detailedSpecs).map(([k, v]) => \`
            <div class="p-2 bg-pcdCard rounded-lg border border-pcdBorder">
              <span class="text-slate-400 block text-[10px] font-mono">\${k}</span>
              <span class="text-white font-medium">\${v}</span>
            </div>
          \`).join('')}
        </div>
      \`;
      document.getElementById('detail-modal').classList.remove('hidden');
    }

    function closeProductDetail() {
      document.getElementById('detail-modal').classList.add('hidden');
    }

    // --- CHATBOT IA INTERATIVO ---
    function toggleChatbot() {
      const win = document.getElementById('chatbot-window');
      win.classList.toggle('hidden');
    }

    function sendQuickMessage(msg) {
      const input = document.getElementById('chat-input');
      input.value = msg;
      handleChatSubmit(new Event('submit'));
    }

    function handleChatSubmit(e) {
      e.preventDefault();
      const input = document.getElementById('chat-input');
      const query = input.value.trim();
      if (!query) return;

      const chatBox = document.getElementById('chat-messages');
      // Adiciona pergunta do utilizador
      chatBox.innerHTML += \`
        <div class="p-2.5 rounded-xl bg-pcdPrimary text-white font-medium ml-8 self-end">
          \${query}
        </div>
      \`;
      input.value = '';
      chatBox.scrollTop = chatBox.scrollHeight;

      // Resposta inteligente e determinística
      setTimeout(() => {
        let answer = "Para essa configuração, recomendo verificar as novas placas da família RTX Série 50 e fontes ATX 3.1 com cabo nativo 12V-2x6!";
        const q = query.toLowerCase();

        if (q.includes('1440p')) {
          answer = "Para resolução 1440p competitiva com altas taxas de FPS, a escolha ideal na ByteCraft é a <strong>RTX 5070 Ti (1.249€)</strong> ou <strong>RTX 5070 (929€)</strong>, combinada com memórias DDR5 6000MHz!";
        } else if (q.includes('envio') || q.includes('prazo') || q.includes('tempo')) {
          answer = "Em Portugal Continental, as encomendas são entregues em <strong>24h a 48h úteis</strong> via transportadora expresso. Para compras acima de 50€, os portes são 100% gratuitos!";
        } else if (q.includes('mb way') || q.includes('pagar') || q.includes('pagamento')) {
          answer = "Sim! Aceitamos <strong>MB WAY</strong> imediato pelo telemóvel, referências <strong>Multibanco (SIBS)</strong> e Cartões de Crédito com 3D Secure v2.";
        } else if (q.includes('garantia') || q.includes('devolução')) {
          answer = "Todos os artigos beneficiam da <strong>Garantia Legal de 3 Anos</strong> ao abrigo do DL 84/2021 e dispõe de <strong>14 dias de calendário</strong> para livre resolução.";
        }

        chatBox.innerHTML += \`
          <div class="p-3 rounded-xl bg-pcdCard border border-pcdBorder text-slate-200">
            \${answer}
          </div>
        \`;
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 500);
    }
  </script>
</body>
</html>`;
}

// 1. Gera Home Page (index.html)
const homeHtml = renderStorePage({ pageTitle: "Início", isHome: true });
fs.writeFileSync(path.join(distDir, "index.html"), homeHtml, "utf-8");

// 2. Gera Categoria Componentes (categoria-componentes.html)
const cat1Html = renderStorePage({ pageTitle: "Componentes & Hardware", categoryFilter: "cat-componentes" });
fs.writeFileSync(path.join(distDir, "categoria-componentes.html"), cat1Html, "utf-8");

// 3. Gera Categoria Computadores (categoria-computadores.html)
const cat2Html = renderStorePage({ pageTitle: "Computadores & Armazenamento", categoryFilter: "cat-computadores" });
fs.writeFileSync(path.join(distDir, "categoria-computadores.html"), cat2Html, "utf-8");

// 4. Gera Categoria Periféricos (categoria-perifericos.html)
const cat3Html = renderStorePage({ pageTitle: "Periféricos & Redes", categoryFilter: "cat-perifericos" });
fs.writeFileSync(path.join(distDir, "categoria-perifericos.html"), cat3Html, "utf-8");

// 5. Gera Página de Termos e Condições (termos-e-condicoes.html)
const termosContent = `
<article class="bg-pcdSurface border border-pcdBorder rounded-2xl p-6 sm:p-10 text-slate-300 text-sm leading-relaxed shadow-xl max-w-5xl mx-auto">
  <div class="border-b border-pcdBorder pb-6 mb-8">
    <div class="inline-block bg-pcdPrimary/10 border border-pcdPrimary/30 text-pcdPrimary px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3">
      Documento Contratual Vinculativo
    </div>
    <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight">Termos e Condições Gerais de Venda</h1>
    <p class="text-xs text-slate-400 mt-2 font-mono">
      Em conformidade com o Decreto-Lei n.º 24/2014 e Decreto-Lei n.º 84/2021 • Ano 2026
    </p>
  </div>
  <div class="space-y-6">
    <p>Todos os preços exibidos na <strong>ByteCraft Informática</strong> incluem o Imposto sobre o Valor Acrescentado (IVA) à taxa legal de 23% em Portugal Continental. As encomendas beneficiam de Portes Grátis acima de 50€ e entrega rápida em 24h a 48h úteis.</p>
    <div class="p-4 bg-pcdCard rounded-xl border border-pcdBorder">
      <h3 class="text-white font-bold text-base mb-2">Garantia Legal de 3 Anos (Decreto-Lei n.º 84/2021)</h3>
      <p class="text-xs">Todos os equipamentos comercializados beneficiam de 3 anos de garantia legal contra faltas de conformidade. Nos primeiros 2 anos, presume-se que qualquer defeito é originário. Em caso de avaria, a reparação ou substituição é efetuada no prazo legal máximo de 30 dias de calendário.</p>
    </div>
    <div class="p-4 bg-pcdCard rounded-xl border border-pcdBorder">
      <h3 class="text-white font-bold text-base mb-2">Direito de Livre Resolução de 14 Dias (Decreto-Lei n.º 24/2014)</h3>
      <p class="text-xs">O consumidor dispõe de 14 dias de calendário a contar da receção física do produto para resolver o contrato e devolver os artigos sem penalização, procedendo-se ao reembolso total no prazo máximo de 14 dias.</p>
    </div>
    <div class="p-4 bg-pcdCard rounded-xl border border-pcdBorder flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h3 class="text-white font-bold text-base">Livro de Reclamações Eletrónico</h3>
        <p class="text-xs text-slate-400">Acesso oficial à plataforma de resolução de litígios e reclamações.</p>
      </div>
      <a href="https://www.livroreclamacoes.pt" target="_blank" class="bg-pcdOrange text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider">Aceder ao Livro Oficial</a>
    </div>
  </div>
</article>`;
const termosHtml = renderStorePage({ pageTitle: "Termos e Condições Gerais", legalContent: termosContent });
fs.writeFileSync(path.join(distDir, "termos-e-condicoes.html"), termosHtml, "utf-8");

// 6. Gera Página de Política de Privacidade (politica-privacidade.html)
const privacidadeContent = `
<article class="bg-pcdSurface border border-pcdBorder rounded-2xl p-6 sm:p-10 text-slate-300 text-sm leading-relaxed shadow-xl max-w-5xl mx-auto">
  <div class="border-b border-pcdBorder pb-6 mb-8">
    <div class="inline-block bg-pcdAccent/10 border border-pcdAccent/30 text-pcdAccent px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3">
      Proteção de Dados Pessoais • RGPD
    </div>
    <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight">Política de Privacidade e Cookies</h1>
    <p class="text-xs text-slate-400 mt-2 font-mono">
      Em conformidade com o Regulamento (UE) 2016/679 (RGPD) e Lei n.º 58/2019 • Ano 2026
    </p>
  </div>
  <div class="space-y-6">
    <p>A <strong>ByteCraft Informática, Lda.</strong> (NIPC 517894120) recolhe e trata os seus dados estritamente para efeitos de faturação, expedição de encomendas e cumprimento das obrigações fiscais portuguesas durante o período legal de 10 anos.</p>
    <div class="p-4 bg-pcdCard rounded-xl border border-pcdBorder">
      <h3 class="text-white font-bold text-base mb-2">Segurança de Infraestrutura Cloudflare</h3>
      <p class="text-xs">A comunicação é encriptada por TLS 1.3 de ponta a ponta na rede Edge da Cloudflare, com mitigação de ataques DDoS e Web Application Firewall (WAF) ativo.</p>
    </div>
    <div class="p-4 bg-pcdCard rounded-xl border border-pcdBorder">
      <h3 class="text-white font-bold text-base mb-2">Direitos dos Titulares</h3>
      <p class="text-xs">Pode a qualquer momento solicitar o acesso, retificação, limitação ou eliminação dos seus dados enviando mensagem para <a href="mailto:privacidade@bytecraft.pt" class="text-pcdAccent font-mono underline">privacidade@bytecraft.pt</a>. Tem ainda o direito de apresentar reclamação perante a Comissão Nacional de Proteção de Dados (CNPD).</p>
    </div>
  </div>
</article>`;
const privacidadeHtml = renderStorePage({ pageTitle: "Política de Privacidade e Cookies", legalContent: privacidadeContent });
fs.writeFileSync(path.join(distDir, "politica-privacidade.html"), privacidadeHtml, "utf-8");

console.log("✅ Todas as 6 páginas compiladas com sucesso em dist/!");
