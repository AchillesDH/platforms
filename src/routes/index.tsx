import { SubdomainForm } from "#/components/subdomain-form";
import { buttonVariants } from "#/components/ui/button";
import { rootDomain } from "@/lib/consts";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <Link to="/admin" className={buttonVariants({ variant: "ghost" })}>
          Admin
        </Link>
      </div>

      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">{rootDomain}</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Create your own subdomain
          </p>
        </div>

        <SubdomainForm />
      </div>
    </div>
  );
}
