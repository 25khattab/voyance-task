import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="flex w-full justify-between border-b border-b-border bg-background px-5 py-3">
      <div className="">
        <img src={"logo.png"} alt="" className="h-10 w-10" />
      </div>

      <ul>
        {session === null && (
          <li>
            <Button asChild variant={"ghost"}>
              <Link href="/login">Login</Link>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}
