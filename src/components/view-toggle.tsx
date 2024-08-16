"use client";
import { Shield, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "./ui/switch";

export default function ViewToggle() {
  const currentPath = usePathname();
  const router = useRouter();
  return (
    <div className="flex items-center justify-center gap-1">
      <User />
      <Switch
        className=""
        onCheckedChange={(value) => {
          if (value) {
            router.push("/manage");
            router.refresh();
          } else {
            router.push("/");
            router.refresh();
          }
        }}
        checked={currentPath === "/manage"}
      />
      <Shield />
    </div>
  );
}
