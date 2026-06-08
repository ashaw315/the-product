import { getEngagement, getSprintCount } from "@/lib/product-metrics";

export async function ReturnBeacon() {
  const engagement = await getEngagement();
  const sprintCount = await getSprintCount();

  return (
    <p className="label" data-testid="return-beacon">
      {`the product persists — ${sprintCount} sprint${sprintCount !== 1 ? "s" : ""} in, encountered ${engagement} time${engagement !== 1 ? "s" : ""}.`}
    </p>
  );
}

export default ReturnBeacon;
