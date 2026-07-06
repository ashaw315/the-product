import Link from "next/link";

const RIBBON_ENTRIES = [
  { href: "/presence", label: "presence" },
  { href: "/orientation", label: "orientation" },
  { href: "/surfaces", label: "surfaces" },
  { href: "/engagement", label: "engagement" },
  { href: "/stillness", label: "stillness" },
] as const;

export function DiscoveryRibbon() {
  return (
    <nav aria-label="discovery ribbon" data-testid="discovery-ribbon">
      {RIBBON_ENTRIES.map(({ href, label }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default DiscoveryRibbon;
