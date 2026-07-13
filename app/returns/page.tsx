import Link from "next/link";
import { getAllMetrics } from "@/lib/product-metrics";
import { ReturnSignalAccumulator } from "../components/ReturnSignalAccumulator";

export const dynamic = "force-dynamic";

export default async function ReturnsPage() {
  const metrics = await getAllMetrics();

  return (
    <main className="pad">
      <h1 className="heading rise">Return Signal Accumulator</h1>
      <p className="prose rise">
        the product has been accumulating since it began existing. each layer
        below is a named dimension of that accumulation — a surface that has
        changed across every sprint and will continue to change. the product
        describes itself here.
      </p>
      <ReturnSignalAccumulator metrics={metrics} />
      <nav className="rule-top rise">
        <Link href="/">return to surface</Link>
      </nav>
    </main>
  );
}
