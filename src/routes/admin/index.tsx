import { AdminDashboard } from "#/components/admin-dashboard";
import { rootDomain } from "#/lib/consts";
import { getAllSubdomainsFn } from "#/server/functions/subdomain";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
  loader: async () => await getAllSubdomainsFn(),
    head: () => ({
      meta: [
        {
            title: `Admin Dashboard | ${rootDomain}`
        },
        {
          name: "description",
          content: `Manage subdomains for ${rootDomain}`,
        },
      ],
    }),
});

function RouteComponent() {
  const tenants = Route.useLoaderData();
  
  return (
    <div className="min-h-screen p-4">
      <AdminDashboard tenants={tenants} />
    </div>
  );
}
