import { StoreCatalogSchema } from "./schemas.js";
import { catalogRawData } from "./catalog.js";

export function validateStoreCatalog() {
  const result = StoreCatalogSchema.safeParse(catalogRawData);
  if (!result.success) {
    console.error("❌ ERRO DETERMINÍSTICO DE VALIDAÇÃO ZOD:", JSON.stringify(result.error.format(), null, 2));
    throw new Error("Falha na integridade dos dados da loja ByteCraft!");
  }
  console.log("✅ Validação Zod concluída com sucesso! 0 Erros de alucinação ou tipo.");
  return result.data;
}

export const validatedCatalog = validateStoreCatalog();
