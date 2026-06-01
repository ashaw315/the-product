import Link from "next/link";
import { getSprintCount, getVelocity, getNorthStar } from "@/lib/product-metrics";

export const dynamic = "force-dynamic";

export default async function ReflectionPage() {
  const sprintCount = await getSprintCount();
  const velocity = await getVelocity();
  const northStar = await getNorthStar();

  return (
    <main className="pad">
      <h1 className="heading">The Product Reflects</h1>
      <p className="prose">
        The product has completed {sprintCount} sprints with a velocity of{" "}
        {velocity.toFixed(1)} tickets per sprint. The north star holds at{" "}
        {northStar}.
      </p>
      <Link href="/" className="label">
        Return to the dashboard.
      </Link>
    </main>
  );
}
