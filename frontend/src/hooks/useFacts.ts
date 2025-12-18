import { useEffect, useState } from "react";

async function translateToEs(text: string): Promise<string> {
  try {
    const r = await fetch(`/api/v1/utils/translate?text=${encodeURIComponent(text)}`);
    if (r.ok) {
      const data = await r.json();
      return data?.text ?? text;
    }
  } catch (err) {
    console.warn("translateToEs failed", err);
  }
  return text;
}

export function useFacts() {
  const [catFacts, setCatFacts] = useState<string[]>([]);
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [uselessFact, setUselessFact] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("https://meowfacts.herokuapp.com/?count=2");
        const data = await r.json();
        const facts: string[] = Array.isArray(data?.data) ? data.data : [];

        // traduc via backend
        const translated = await Promise.all(facts.map(translateToEs));
        setCatFacts(translated);
        setCatModalOpen(true);
      } catch (err) {
        console.warn("cat facts failed", err);
      }
    })();

    (async () => {
      try {
        const r = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/today?language=en");
        const data = await r.json();
        if (data?.text) setUselessFact(String(data.text));
      } catch (err) {
        console.warn("useless fact failed", err);
      }
    })();
  }, []);

  return { catFacts, catModalOpen, setCatModalOpen, uselessFact };
}