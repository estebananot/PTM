import { Boxes, Plus } from "lucide-react";

export default function Header({ onNew }: { onNew: () => void }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-zinc-900 p-3 shadow">
          <Boxes className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">Inventario de Productos</h1>
          <p className="text-sm text-zinc-700">Dashboard · CRUD · Métricas · Combinaciones</p>
        </div>
      </div>

      <button
        onClick={onNew}
        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
      >
        <Plus className="h-4 w-4" />
        Nuevo
      </button>
    </div>
  );
}
