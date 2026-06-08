import { getEngagement } from "@/lib/product-metrics";

export async function QuietStateModule() {
  const engagement = await getEngagement();

  return (
    <aside className="label" data-testid="quiet-state-module">
      {engagement === 0
        ? "the product is quiet. no encounters yet recorded."
        : `the product has been encountered ${engagement} time${engagement !== 1 ? "s" : ""}.`}
    </aside>
  );
}

export default QuietStateModule;
