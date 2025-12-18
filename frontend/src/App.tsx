import { useState } from "react";
import Container from "./components/Container";
import Card from "./components/Card";
import Header from "./components/Header";
import ProductTable from "./components/ProductTable";
import ProductFormModal from "./components/ProductFormModal";
import CombosCard from "./components/CombosCard";
import Modal from "./components/Modal";
import FooterFact from "./components/FooterFact";
import { money } from "./utils/formats";
import type { Product } from "./types";
import { useProducts } from "./hooks/useProducts";
import { useFacts } from "./hooks/useFacts";

export default function App() {
  const {
    sorted,
    loading,
    invTotal,
    invMax,
    toggleSort,
    refresh,
    create,
    update,
    remove,
  } = useProducts();

  const { catFacts, catModalOpen, setCatModalOpen, uselessFact } = useFacts();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const onNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const onEdit = (p: Product) => {
    setEditing(p);
    setFormOpen(true);
  };

  const onSave = async (payload: Omit<Product, "id">, id?: number) => {
    if (id) await update(id, payload);
    else await create(payload);
  };

  const onDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    await remove(id);
  };

  return (
    <Container>
      {/* MODAL: aparece encima de todo incluso si la página está cargando */}
      <Modal
        open={catModalOpen}
        title="Sabías que… 🐱"
        onClose={() => setCatModalOpen(false)}
        autoCloseMs={4500} // autocierra en 4.5s
        showClose={false} // sin botón X / cerrar
      >
        <div className="space-y-2">
          {catFacts.length === 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-zinc-300">Cargando datos de gatos…</p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-900">
                <div className="h-full w-1/2 animate-pulse bg-white/60" />
              </div>
            </div>
          ) : (
            catFacts.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800"
              >
                {f}
              </div>
            ))
          )}

          <p className="pt-2 text-xs text-zinc-500">
            *Si la traducción falla, se muestra el texto original.
          </p>
        </div>
      </Modal>

      <Header onNew={onNew} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-zinc-300">Valor total de inventario</p>
          <p className="mt-2 text-2xl font-semibold">
            {money(invTotal)}
          </p>
          <p className="mt-2 text-xs text-zinc-200">Σ (precio × stock)</p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-300">Producto con mayor valor</p>
          <p className="mt-2 text-lg font-semibold text-zinc-300">
            {invMax?.producto?.nombre || "—"}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            {invMax?.valorInventarioProducto
              ? money(Number(invMax.valorInventarioProducto))
              : "—"}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-zinc-300">Estado</p>
          <p className="mt-2 text-lg font-semibold text-zinc-300">
            {loading ? "Cargando…" : "Listo ✅"}
          </p>
          <button
            onClick={refresh}
            className="mt-3 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
          >
            Refrescar
          </button>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-zinc-300">Productos</h2>
              <p className="text-sm text-zinc-300">
                Ordenamiento se hace en el frontend.
              </p>
            </div>

            <ProductTable
              loading={loading}
              products={sorted}
              onSort={toggleSort}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </Card>
        </div>

        <CombosCard />
      </div>

      <ProductFormModal
        open={formOpen}
        editing={editing}
        onClose={() => setFormOpen(false)}
        onSave={onSave}
      />

      <FooterFact fact={uselessFact} />
    </Container>
  );
}
