import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import type { Product } from "../types";
import type { SortKey } from "../hooks/useProducts";
import { money } from "../utils/formats";

export default function ProductTable({
  loading,
  products,
  onSort,
  onEdit,
  onDelete,
}: {
  loading: boolean;
  products: Product[];
  onSort: (k: SortKey) => void;
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="overflow-auto rounded-xl border border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-900">
          <tr className="text-zinc-500">
            <th className="px-4 py-3">
              <button onClick={() => onSort("nombre")} className="inline-flex items-center gap-2">
                Nombre <ArrowUpDown className="h-4 w-4" />
              </button>
            </th>
            <th className="px-4 py-3">
              <button onClick={() => onSort("precio")} className="inline-flex items-center gap-2">
                Precio <ArrowUpDown className="h-4 w-4" />
              </button>
            </th>
            <th className="px-4 py-3">
              <button onClick={() => onSort("cantidadEnStock")} className="inline-flex items-center gap-2">
                Stock <ArrowUpDown className="h-4 w-4" />
              </button>
            </th>
            <th className="px-4 py-3">Inventario</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr><td className="px-4 py-6 text-zinc-700" colSpan={5}>Cargando…</td></tr>
          ) : products.length === 0 ? (
            <tr><td className="px-4 py-6 text-zinc-700" colSpan={5}>No hay productos aún.</td></tr>
          ) : (
            products.map((p) => {
              const inv = Number(p.precio) * Number(p.cantidadEnStock);
              return (
                <tr key={p.id} className="border-t border-zinc-800 hover:bg-zinc-900/40">
                  <td className="px-4 py-3">
                    <div className="font-medium">{p.nombre}</div>
                    {p.descripcion ? <div className="text-xs text-zinc-500">{p.descripcion}</div> : null}
                  </td>
                  <td className="px-4 py-3">{money(Number(p.precio))}</td>
                  <td className="px-4 py-3">{p.cantidadEnStock}</td>
                  <td className="px-4 py-3">{money(inv)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(p)}
                        className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs hover:bg-zinc-800"
                      >
                        <Pencil className="h-4 w-4" /> Editar
                      </button>
                      <button
                        onClick={() => onDelete(p.id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs hover:bg-red-950/70"
                      >
                        <Trash2 className="h-4 w-4" /> Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
