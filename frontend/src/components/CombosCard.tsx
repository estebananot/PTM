import { useState } from "react";
import { Sparkles } from "lucide-react";
import Card from "./Card";
import { ProductsAPI } from "../api/products";
import type { CombinationResponse } from "../types";
import { money } from "../utils/formats";

export default function CombosCard() {
  const [valor, setValor] = useState(0);
  const [loading, setLoading] = useState(false);
  const [combos, setCombos] = useState<CombinationResponse[]>([]);

  const fetchCombos = async () => {
    setLoading(true);
    try {
      const r = await ProductsAPI.combos(valor);
      setCombos(r);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Combinaciones</h2>
      </div>
      <p className="mt-1 text-sm text-zinc-700">2–3 productos, suma ≤ valor, máx 5.</p>

      <div className="mt-4 flex gap-2">
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-zinc-600"
          placeholder="Ej: 10000"
        />
        <button
          onClick={fetchCombos}
          disabled={loading}
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 disabled:opacity-60"
        >
          {loading ? "…" : "Buscar"}
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {combos.length === 0 ? (
          <p className="text-sm text-zinc-500">Aquí aparecerán las combinaciones.</p>
        ) : (
          combos.map((c, idx) => (
            <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2">
              <div className="text-sm font-medium">{c.productos.join(" + ")}</div>
              <div className="text-xs text-zinc-700">Suma: {money(Number(c.suma))}</div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
