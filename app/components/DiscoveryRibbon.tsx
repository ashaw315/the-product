import Link from "next/link";

const links = [
  { href: "/engagement", label: "Engagement" },
  { href: "/stillness", label: "Stillness" },
  { href: "/returns", label: "Returns" },
  { href: "/wayfinding", label: "Wayfinding" },
];

export function DiscoveryRibbon() {
  return (
    <nav aria-label="discovery ribbon" data-testid="discovery-ribbon">
      {links.map(({ href, label }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
