import React, { useEffect } from "react";

export default function Modal({
  open,
  title,
  children,
  onClose,
  autoCloseMs,
  showClose = false,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  autoCloseMs?: number;
  showClose?: boolean;
}) {
  useEffect(() => {
    if (!open) return;

    // autocierre
    let t: number | undefined;
    if (autoCloseMs && autoCloseMs > 0) {
      t = window.setTimeout(onClose, autoCloseMs);
    }

    // bloquear scroll del body
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      if (t) window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open, autoCloseMs, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/70 p-4">
      <div className="modal-enter w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <h3 className="text-lg font-semibold text-zinc-700">{title}</h3>

          {showClose ? (
            <button
              onClick={onClose}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-800"
              aria-label="Cerrar"
            >
              Cerrar
            </button>
          ) : null}
        </div>

        <div className="px-5 py-4 text-zinc-700">{children}</div>

        {autoCloseMs ? (
          <div className="h-1 w-full bg-zinc-900">
            <div
              className="h-full bg-white/70"
              style={{ animation: `shrink ${autoCloseMs}ms linear forwards` }}
            />
          </div>
        ) : null}
      </div>

      <style>{`
        .modal-enter {
          animation: modalIn 180ms ease-out forwards;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shrink {
          from { transform: translateX(0); width: 100%; }
          to   { transform: translateX(-100%); width: 100%; }
        }
      `}</style>
    </div>
  );
}
