import type { Tenant } from "#/lib/types";
import { Link } from "@tanstack/react-router";
import { EmptyTenantGrid } from "./empty-tenant-grid";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { buttonVariants } from "./ui/button";
import { cn } from "#/lib/utils";
import { rootDomain } from "#/lib/consts";
import { DeleteTenantDialog } from "./delete-tenant-dialog";

type Props = {
  tenants: Tenant[];
};

export function TenantGrid({ tenants }: Props) {
  if (!tenants.length) {
    return <EmptyTenantGrid />;
  }

  return (
    <div className="grid grid-cols-5 gap-4 grow">
      {tenants.map((t) => (
        <Card size="sm">
          <CardHeader>
            <CardTitle>{t.name}</CardTitle>
            <CardDescription>
              {t.subdomain}.{rootDomain}
            </CardDescription>
            <CardAction>
              <DeleteTenantDialog subdomain={t.subdomain} />
            </CardAction>
          </CardHeader>
          <CardContent>
            Created {new Date(t.createdAt).toLocaleDateString()}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Link
              to="/s/$subdomain"
              params={{ subdomain: t.subdomain }}
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
            >
              View tenant →
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
