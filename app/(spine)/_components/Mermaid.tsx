"use client";

import { useEffect, useId, useState } from "react";

// Themed to the substrate: ink on paper, flat, the Kelly accents, no rounded
// drop-shadow look. The diagram reads as austere and declarative.
const THEME = {
  startOnLoad: false,
  securityLevel: "loose" as const,
  theme: "base" as const,
  fontFamily: "var(--font-body), Helvetica, sans-serif",
  themeVariables: {
    background: "#faf9f5",
    primaryColor: "#faf9f5",
    primaryTextColor: "#16140f",
    primaryBorderColor: "#16140f",
    lineColor: "#16140f",
    secondaryColor: "#ffc400",
    tertiaryColor: "#1f3fd6",
    fontSize: "14px",
  },
};

export default function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Dynamic import keeps mermaid (which needs the DOM) off the server.
    import("mermaid")
      .then(async ({ default: mermaid }) => {
        mermaid.initialize(THEME);
        const { svg } = await mermaid.render(`m-${id}`, chart);
        if (!cancelled) setSvg(svg);
      })
      .catch(() => {
        // The PM occasionally emits invalid Mermaid. Fail quietly — never break
        // the page. Show nothing rather than a broken diagram.
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (failed || !chart || !svg) return null;

  return (
    <div
      className="rise"
      style={{ overflowX: "auto", padding: "1rem 0" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
