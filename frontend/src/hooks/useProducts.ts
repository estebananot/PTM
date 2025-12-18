import { useCallback, useEffect, useMemo, useState } from "react";
import type { InventoryMaxResponse, Product } from "../types";
import { ProductsAPI } from "../api/products";

export type SortKey = "nombre" | "precio" | "cantidadEnStock";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [invTotal, setInvTotal] = useState(0);
  const [invMax, setInvMax] = useState<InventoryMaxResponse | null>(null);

  const [sortKey, setSortKey] = useState<SortKey>("nombre");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const toggleSort = (k: SortKey) => {
    setSortKey((prev) => {
      if (prev === k) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        return prev;
      }
      setSortDir("asc");
      return k;
    });
  };

  const sorted = useMemo(() => {
    const arr = [...products];
    arr.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (typeof va === "string" && typeof vb === "string") return va.localeCompare(vb);
      return (va as number) - (vb as number);
    });
    if (sortDir === "desc") arr.reverse();
    return arr;
  }, [products, sortKey, sortDir]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [p, t, m] = await Promise.all([
        ProductsAPI.list(),
        ProductsAPI.total(),
        ProductsAPI.max(),
      ]);
      setProducts(p);
      setInvTotal(Number(t.totalInventario ?? 0));
      setInvMax(m);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (payload: Omit<Product, "id">) => {
    await ProductsAPI.create(payload);
    await refresh();
  };

  const update = async (id: number, payload: Omit<Product, "id">) => {
    await ProductsAPI.update(id, payload);
    await refresh();
  };

  const remove = async (id: number) => {
    await ProductsAPI.remove(id);
    await refresh();
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    products,
    sorted,
    loading,
    invTotal,
    invMax,
    sortKey,
    sortDir,
    toggleSort,
    refresh,
    create,
    update,
    remove,
  };
}
