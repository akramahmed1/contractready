import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import ReadinessForm from "@/components/dashboard/ReadinessForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Readiness assessment | ContractReady",
  description: "Answer seven questions and get your contract readiness score.",
};

export default async function ReadinessPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Please sign in</h1>
        <p className="mt-2 text-slate-600">Your assessment lives behind your account.</p>
        <Link
          href="/sign-in"
          className="mt-6 inline-block rounded-lg bg-emerald-900 px-6 py-3 font-semibold text-white"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/dashboard" className="text-sm font-semibold text-emerald-800 underline">
        Back to dashboard
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Readiness assessment</h1>
      <p className="mt-2 text-slate-600">
        Seven honest questions about where your business stands. Your answers feed your
        Contract Readiness Score on the dashboard and decide what we suggest you do
        next. Nothing here is shared with anyone.
      </p>
      <p className="mt-2 text-sm text-slate-500">
        The score measures preparation steps you have completed. It is not a prediction
        of winning contracts, and no score guarantees results.
      </p>
      <ReadinessForm />
    </div>
  );
}
