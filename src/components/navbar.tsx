import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import ViewToggle from "./view-toggle";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="flex w-full justify-between border-b border-b-border bg-background px-5 py-3">
      <div className="">
        <Link href={"/"}>
          <img src={"logo.png"} alt="" className="h-10 w-10" />
        </Link>
      </div>

      <ul className="flex items-center justify-center gap-3">
        {session && session.user.admin && (
          <li className="">
            <ViewToggle />
          </li>
        )}
        {session === null ? (
          <li>
            <Button variant={"ghost"}>
              <a href="/login">Login</a>
            </Button>
          </li>
        ) : (
          <li>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button variant={"ghost"}>Logout</Button>
            </form>
          </li>
        )}
      </ul>
    </nav>
  );
}
