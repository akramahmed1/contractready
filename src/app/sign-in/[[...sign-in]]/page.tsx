import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";

function AuthLoading({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col items-center gap-3 py-10"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span
        className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#0f3d2e]"
        aria-hidden="true"
      />
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  );
}

// Note: Clerk publishable + secret keys are required at runtime for this page.
export default function SignInPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4 py-16">
      <ClerkLoading>
        <AuthLoading label="Loading sign in..." />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
      </ClerkLoaded>
    </div>
  );
}
