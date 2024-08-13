import { auth } from "@/auth";
import SignInGoogleButton from "@/components/sign-in-google-button";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session) redirect("/");
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5">
      <img src={"logo.png"} alt="" className="w-3/12 min-w-16" />

      <SignInGoogleButton />
    </main>
  );
}
