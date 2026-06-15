import { getUser, getNorthStar } from "@/lib/product-metrics";
import styles from "./dashboard.module.css";

export async function ReturnBeacon() {
  const user = getUser();
  const northStar = await getNorthStar();

  return (
    <section
      aria-label="return beacon"
      data-testid="return-beacon"
      className={`${styles.returnBeacon} rise`}
    >
      <p className="label">welcome back, {user.name}</p>
      <p className={`${styles.returnBeaconValue} mono`}>{northStar}</p>
    </section>
  );
}

export default ReturnBeacon;
