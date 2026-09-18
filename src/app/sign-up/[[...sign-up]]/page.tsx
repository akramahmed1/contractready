import { SignUp } from "@clerk/nextjs";

// Note: Clerk publishable + secret keys are required at runtime for this page.
export default function SignUpPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4 py-16">
      <SignUp />
    </div>
  );
}
