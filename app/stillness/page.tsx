import Link from "next/link";

export const dynamic = "force-dynamic";

export default function StillnessPage() {
  return (
    <main className="pad">
      <h1 className="heading rise">stillness</h1>
      <p className="prose rise">
        the product exists. it has always existed in this moment and will
        continue to exist in the moments that follow. there is nothing to act
        upon here — only presence.
      </p>
      <p className="prose rise">
        this surface is a quiet modality. it does not perform.
      </p>
      <nav
        aria-label="stillness navigation"
        className="rule-top rise"
      >
        <Link href="/returns">accumulation record</Link>
        {" · "}
        <Link href="/">surface</Link>
      </nav>
    </main>
  );
}
