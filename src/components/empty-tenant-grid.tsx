import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { protocol, rootDomain } from "@/lib/consts";
import { HugeiconsIcon } from "@hugeicons/react";
import { BlockGameIcon } from "@hugeicons/core-free-icons";

export function EmptyTenantGrid() {
  return (
    <Empty className="h-full bg-muted/30 border grow">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={BlockGameIcon} />
        </EmptyMedia>
        <EmptyTitle>No Tenants</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          No tenants have been created yet.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <a
          href={`${protocol}://${rootDomain}`}
          className={buttonVariants({ variant: "outline" })}
        >
          Home
        </a>
      </EmptyContent>
    </Empty>
  );
}
