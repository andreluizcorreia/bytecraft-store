import { category1Products } from "./data/category1.js";
import { category2Products } from "./data/category2.js";
import { category3Products } from "./data/category3.js";

export const catalogRawData = {
  storeName: "ByteCraft Informática",
  tagline: "O Maior Especialista em Hardware, Upgrades e Tecnologia Descomplicada em Portugal",
  currency: "EUR",
  currencySymbol: "€",
  supportPhone: "+351 210 000 000",
  supportEmail: "apoio@bytecraft.pt",
  topBanner: {
    campaignName: "CAMPANHA UPGRADE EXPRESS 2026",
    highlightText: "Geração RTX 5080/5070 disponível + Portes Grátis acima de 50€ para Portugal Continental!",
    ctaText: "Ver Novidades",
    ctaLink: "#catalogo",
    urgencyBadge: "TERMINA EM POUCAS HORAS"
  },
  categories: [
    {
      id: "cat-componentes",
      name: "Componentes & Hardware",
      slug: "componentes-hardware",
      description: "Placas Gráficas RTX Série 50 (5090, 5080, 5070 Ti, 5070, 5060 Ti), Ryzen 9000 e Core Ultra 200.",
      icon: "cpu",
      subcategories: [
        { id: "sub-gpu", name: "Placas Gráficas (RTX Série 50)", slug: "placas-graficas", count: 18 },
        { id: "sub-cpu", name: "Processadores (AMD 9000 / Intel Ultra)", slug: "processadores", count: 15 },
        { id: "sub-motherboards", name: "Motherboards X870 / Z890", slug: "motherboards", count: 12 },
        { id: "sub-psu", name: "Fontes ATX 3.1 PCIe 5.1", slug: "fontes-psu", count: 14 }
      ]
    },
    {
      id: "cat-computadores",
      name: "Computadores & Armazenamento",
      slug: "computadores-armazenamento",
      description: "Desktops Gaming ByteCraft, Portáteis Core Ultra/Ryzen AI 9 e SSDs NVMe PCIe 5.0 até 14.500 MB/s.",
      icon: "desktop",
      subcategories: [
        { id: "sub-pcs-montados", name: "Computadores Gaming ByteCraft", slug: "computadores-gaming", count: 10 },
        { id: "sub-portateis-gaming", name: "Portáteis Gaming RTX 50", slug: "portateis-gaming", count: 8 },
        { id: "sub-portateis", name: "Portáteis Ultralight AI Copilot+", slug: "portateis-produtividade", count: 10 },
        { id: "sub-ssd", name: "Discos SSD M.2 PCIe 5.0 / 4.0", slug: "discos-ssd-nvme", count: 22 }
      ]
    },
    {
      id: "cat-perifericos",
      name: "Periféricos & Redes",
      slug: "perifericos-redes",
      description: "Monitores QD-OLED 240Hz/360Hz, Teclados Magnéticos Rapid Trigger, Ratos 8000Hz e Wi-Fi 7.",
      icon: "keyboard",
      subcategories: [
        { id: "subcat-monitores", name: "Monitores QD-OLED 240Hz/360Hz", slug: "monitores-oled", count: 14 },
        { id: "subcat-teclados", name: "Teclados Magnéticos Hall Effect", slug: "teclados-magneticos", count: 16 },
        { id: "subcat-ratos", name: "Ratos 8000Hz Ultralight", slug: "ratos-8000hz", count: 18 },
        { id: "subcat-audio", name: "Áudio & Headsets Audiófilos", slug: "audio-headsets", count: 11 },
        { id: "subcat-redes", name: "Routers Wi-Fi 7 Multi-Gigabit", slug: "redes-wifi7", count: 7 },
        { id: "subcat-servicos", name: "Serviço ByteCraft Pro Montagem", slug: "servicos-montagem", count: 5 }
      ]
    }
  ],
  products: [
    ...category1Products,
    ...category2Products,
    ...category3Products
  ]
};
