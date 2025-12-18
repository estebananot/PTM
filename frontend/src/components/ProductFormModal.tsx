import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import Modal from "./Modal";
import type { Product } from "../types";

type Form = Omit<Product, "id">;

export default function ProductFormModal({
  open,
  editing,
  onClose,
  onSave,
}: {
  open: boolean;
  editing: Product | null;
  onClose: () => void;
  onSave: (payload: Form, id?: number) => Promise<void>;
}) {
  const [form, setForm] = useState<Form>({ nombre: "", descripcion: "", precio: 0, cantidadEnStock: 0 });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        nombre: editing.nombre,
        descripcion: editing.descripcion || "",
        precio: Number(editing.precio),
        cantidadEnStock: Number(editing.cantidadEnStock),
      });
    } else {
      setForm({ nombre: "", descripcion: "", precio: 0, cantidadEnStock: 0 });
    }
  }, [editing, open]);

  const submit = async () => {
    setSaving(true);
    try {
      await onSave(form, editing?.id);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} title={editing ? "Editar producto" : "Nuevo producto"} onClose={onClose}>
      <div className="space-y-3">
        <div>
          <label className="text-xs text-zinc-700">Nombre</label>
          <input
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-zinc-600"
          />
        </div>

        <div>
          <label className="text-xs text-zinc-700">Descripción</label>
          <input
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-zinc-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-zinc-700">Precio</label>
            <input
              type="number"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-zinc-600"
            />
          </div>
          <div>
            <label className="text-xs text-zinc-700">Stock</label>
            <input
              type="number"
              value={form.cantidadEnStock}
              onChange={(e) => setForm({ ...form, cantidadEnStock: Number(e.target.value) })}
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-zinc-600"
            />
          </div>
        </div>

        <button
          onClick={submit}
          disabled={saving}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </Modal>
  );
}
