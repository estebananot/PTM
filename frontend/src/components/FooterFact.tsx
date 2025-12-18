export default function FooterFact({ fact }: { fact: string }) {
  return (
    <div className="mt-8 border-t border-zinc-900 pt-4 text-xs text-zinc-500">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <span>Useless fact of the day:</span>
        <span className="text-zinc-300">{fact || "—"}</span>
      </div>
    </div>
  );
}
