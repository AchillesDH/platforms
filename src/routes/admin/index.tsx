import { AdminDashboard } from "@/components/admin-dashboard";
import { rootDomain } from "@/lib/consts";
import { getSubdomainsOptions } from "@/lib/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const tenants = await context.queryClient.ensureQueryData(
      getSubdomainsOptions(),
    );

    return tenants;
  },
  head: () => ({
    meta: [
      {
        title: `Admin Dashboard | ${rootDomain}`,
      },
      {
        name: "description",
        content: `Manage subdomains for ${rootDomain}`,
      },
    ],
  }),
});

function RouteComponent() {
  // Read the pre-loaded data from cache and subscribe to updates
  const { data: tenants } = useSuspenseQuery(getSubdomainsOptions());

  return (
    <div className="min-h-screen p-4">
      <AdminDashboard tenants={tenants} />
    </div>
  );
}
