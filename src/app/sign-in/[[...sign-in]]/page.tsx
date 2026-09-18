import { SignIn } from "@clerk/nextjs";

// Note: Clerk publishable + secret keys are required at runtime for this page.
export default function SignInPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4 py-16">
      <SignIn />
    </div>
  );
}
