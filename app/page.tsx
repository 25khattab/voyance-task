import SignIn from "@/components/sign-in";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session===null?<></>:session.user?.admin}
      <SignIn></SignIn>
    </main>
  );
}
