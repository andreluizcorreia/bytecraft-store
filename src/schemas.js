import { z } from "zod";

// Schema de Mídia
export const MediaSchema = z.object({
  type: z.enum(["image", "video", "audio"]),
  url: z.string().url(),
  alt: z.string().default("Asset ByteCraft"),
  caption: z.string().optional()
});

// Schema de Subcategoria do MegaMenu (Estilo PCDIGA)
export const SubCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  count: z.number().optional()
});

// Schema de Categoria Principal
export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  icon: z.string(),
  subcategories: z.array(SubCategorySchema)
});

// Schema de Estoque em Lojas Físicas / Online (Padrão PCDIGA)
export const StoreStockSchema = z.object({
  onlineWarehouse: z.enum(["Em Stock", "Poucas Unidades", "Esgotado", "Por Encomenda"]),
  lisboaBenfica: z.enum(["Em Stock", "Poucas Unidades", "Sob Consulta"]),
  portoGaia: z.enum(["Em Stock", "Poucas Unidades", "Sob Consulta"]),
  bragaLeiria: z.enum(["Em Stock", "Poucas Unidades", "Sob Consulta"])
});

// Schema Determinístico de Produto Completo (E-Commerce Profissional)
export const ProductSchema = z.object({
  id: z.string(),
  sku: z.string(),
  brand: z.string(),
  title: z.string(),
  slug: z.string(),
  categoryId: z.string(),
  subcategoryId: z.string(),
  price: z.number().positive(),
  oldPrice: z.number().positive().optional(),
  discountPercent: z.number().int().optional(),
  stockNumber: z.number().int().nonnegative(),
  stockStatus: StoreStockSchema,
  deliveryEstimate: z.string(),
  fastShippingPill: z.string().default("Receba amanhã"),
  highlightBadge: z.string().optional(),
  rating: z.number().min(1).max(5).default(4.9),
  reviewsCount: z.number().int().default(12),
  shortSpecs: z.array(z.string()),
  detailedSpecs: z.record(z.string(), z.string()),
  compatibilityStatus: z.string(),
  media: z.array(MediaSchema).min(1),
  featuredPromo: z.boolean().default(false),
  dealEndsIn: z.string().optional() // Cronômetro de campanha relâmpago
});

// Schema do Banner Promocional do Topo
export const TopBannerSchema = z.object({
  campaignName: z.string(),
  highlightText: z.string(),
  ctaText: z.string(),
  ctaLink: z.string(),
  urgencyBadge: z.string()
});

// Schema Geral do Catálogo
export const StoreCatalogSchema = z.object({
  storeName: z.string(),
  tagline: z.string(),
  currency: z.string().default("EUR"),
  currencySymbol: z.string().default("€"),
  supportPhone: z.string(),
  supportEmail: z.string().email(),
  topBanner: TopBannerSchema,
  categories: z.array(CategorySchema),
  products: z.array(ProductSchema)
});
