import { api } from "./client";
import type {
  Product,
  InventoryTotalResponse,
  InventoryMaxResponse,
  CombinationResponse,
} from "../types";

export const ProductsAPI = {
  list: () => api.get<Product[]>("/api/v1/productos").then(r => r.data),
  create: (payload: Omit<Product, "id">) => api.post("/api/v1/productos", payload),
  update: (id: number, payload: Omit<Product, "id">) => api.put(`/api/v1/productos/${id}`, payload),
  remove: (id: number) => api.delete(`/api/v1/productos/${id}`),

  total: () => api.get<InventoryTotalResponse>("/api/v1/productos/inventario/total").then(r => r.data),
  max: () => api.get<InventoryMaxResponse>("/api/v1/productos/inventario/mayor").then(r => r.data),

  combos: (valor: number) =>
    api.get<CombinationResponse[]>(`/api/v1/productos/combinaciones?valor=${valor}`).then(r => r.data),
};
