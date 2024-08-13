"use client";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "./ui/switch";
import { Shield, User } from "lucide-react";

export default function ViewToggle() {
  const currentPath = usePathname();
  const navigate = useRouter();
  return (
    <div className="flex items-center gap-1 justify-center ">
      <User/>
      <Switch className=""
        onCheckedChange={(value) => {
          if (value) {
            navigate.push("/manage");
          } else {
            navigate.push("/");
          }
        }}
        checked={currentPath === "/manage"}
      />
      <Shield />
    </div>
  );
}
