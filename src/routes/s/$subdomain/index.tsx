import { buttonVariants } from "@/components/ui/button";
import { protocol, rootDomain } from "@/lib/consts";
import { getSubdomainDetailsOptions } from "@/lib/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/s/$subdomain/")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const tenant = await context.queryClient.ensureQueryData(
      getSubdomainDetailsOptions(params.subdomain),
    );

    return tenant;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      {
        title: loaderData?.name
          ? `${params.subdomain}.${rootDomain}`
          : rootDomain,
      },
      loaderData && {
        name: "description",
        content: `Subdomain page for ${params.subdomain}.${rootDomain}`,
      },
    ],
  }),
});

function RouteComponent() {
  const { subdomain } = Route.useParams();
  // Read the pre-loaded data from cache and subscribe to updates
  const { data: tenant } = useSuspenseQuery(
    getSubdomainDetailsOptions(subdomain),
  );

  return (
    <div className="flex min-h-screen flex-col p-4">
      <div className="absolute top-4 right-4">
        <a
          href={`${protocol}://${rootDomain}`}
          className={buttonVariants({ variant: "ghost" })}
        >
          {rootDomain}
        </a>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-9xl mb-6">{tenant.name}</div>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to {subdomain}.{rootDomain}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            This is your custom subdomain page
          </p>
        </div>
      </div>
    </div>
  );
}
