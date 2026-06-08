import { getSprintCount } from "@/lib/product-metrics";

export async function DepthIndicator() {
  const sprintCount = await getSprintCount();

  return (
    <p className="mono" data-testid="depth-indicator">
      {`depth: ${sprintCount} sprint${sprintCount !== 1 ? "s" : ""}`}
    </p>
  );
}

export default DepthIndicator;
