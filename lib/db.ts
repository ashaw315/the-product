import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Lazy: don't throw at import time, so pure helpers (getUser, getNPSLiftIndex)
// and the test suite can load without a database. The product only reads.
let _sql: NeonQueryFunction<false, false> | null = null;

export const sql = ((...args: unknown[]) => {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }
    _sql = neon(process.env.DATABASE_URL);
  }
  // forward tagged-template invocation
  // @ts-expect-error tagged template args forwarded verbatim
  return _sql(...args);
}) as unknown as NeonQueryFunction<false, false>;
