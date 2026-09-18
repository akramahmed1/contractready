import Link from "next/link";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/free-checklist", label: "Free checklist" },
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-[#0f3d2e]">
          ContractReady
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#0f3d2e]">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="text-sm font-medium text-slate-700 hover:text-[#0f3d2e]">
            Sign in
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg bg-[#0f3d2e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0c3125]"
          >
            Get started
          </Link>
        </div>
      </div>
      <div className="md:hidden border-t border-slate-100">
        <nav className="mx-auto flex max-w-6xl gap-5 overflow-x-auto px-4 py-2 text-sm font-medium text-slate-700">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap hover:text-[#0f3d2e]">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
