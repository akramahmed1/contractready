import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ContractReady | From zero to contract-ready",
  description:
    "Honest, step-by-step guidance for US small businesses: SAM.gov registration, finding bids, and submitting your first government contract bid. SAM.gov registration is free; we sell the shortcut.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-white text-slate-900 antialiased">
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
