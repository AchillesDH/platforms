import { protocol, rootDomain } from "@/lib/consts";
import { buttonVariants } from "./ui/button";

export function DashboardHeader() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Subdomain Management</h1>
      <div className="flex items-center gap-4">
        <a
          href={`${protocol}://${rootDomain}`}
          className={buttonVariants({ variant: "ghost" })}
        >
          {rootDomain}
        </a>
      </div>
    </div>
  );
}
