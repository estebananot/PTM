export type Product = {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  cantidadEnStock: number;
};

export type InventoryTotalResponse = { totalInventario: number };

export type InventoryMaxResponse = {
  producto: Product | null;
  valorInventarioProducto: number;
};

export type CombinationResponse = {
  productos: string[];
  suma: number;
};
