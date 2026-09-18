import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-lg font-extrabold text-[#0f3d2e]">ContractReady</p>
            <p className="mt-2 text-sm text-slate-600">From zero to contract-ready.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Product</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li><Link href="/how-it-works" className="hover:text-[#0f3d2e]">How it works</Link></li>
              <li><Link href="/pricing" className="hover:text-[#0f3d2e]">Pricing</Link></li>
              <li><Link href="/free-checklist" className="hover:text-[#0f3d2e]">Free SAM.gov checklist</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#0f3d2e]">Member dashboard</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Support</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li><Link href="/faq" className="hover:text-[#0f3d2e]">FAQ</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#0f3d2e]">Member portal</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Legal</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li><Link href="/legal/terms" className="hover:text-[#0f3d2e]">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-[#0f3d2e]">Privacy Policy</Link></li>
              <li><Link href="/legal/refunds" className="hover:text-[#0f3d2e]">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 rounded-lg bg-white p-4 text-xs leading-relaxed text-slate-600 ring-1 ring-slate-200">
          <p>
            <strong className="text-slate-800">Disclosure:</strong> SAM.gov is an official website of the United States
            government and is free to use. ContractReady is an independent private education and guidance service. It is
            not affiliated with or endorsed by SAM.gov, the General Services Administration, the Small Business
            Administration, or any government agency. Government registrations, certifications, and contract awards are
            controlled by the responsible agencies. Results vary, and no outcome is guaranteed.
          </p>
        </div>
        <p className="mt-4 text-xs text-slate-500">© 2026 ContractReady. All rights reserved.</p>
      </div>
    </footer>
  );
}
