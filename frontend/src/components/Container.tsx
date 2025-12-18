import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto w-full px-4 py-8">{children}</div>
    </div>
  );
}
