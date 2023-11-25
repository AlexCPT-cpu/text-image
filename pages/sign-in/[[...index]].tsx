import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="h-full bg-[#111827] flex items-center justify-center min-h-screen">
      <SignIn />;
    </main>
  );
}
