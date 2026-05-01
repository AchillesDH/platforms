import type { Tenant } from "@/lib/types";
import { DashboardHeader } from "./dashboard-header";
import { TenantGrid } from "./tenant-grid";

type Props = {
    tenants: Tenant[]
}

export function AdminDashboard({ tenants }: Props) {
  // TODO:  You can add authentication here with your preferred auth provider:
  //        e.g. better-auth with the admin plugin
  return (
    <div className="flex flex-col gap-8 h-full flex-1">
      <DashboardHeader />
      <TenantGrid tenants={tenants} />
    </div>
  );
}
