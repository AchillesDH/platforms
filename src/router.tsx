import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { routeTree } from "@/routeTree.gen";
import { rootDomain } from "@/lib/consts";
import { queryClient } from "@/integrations/react-query/context";

function extractSubdomain(url: URL): string | null {
  const hostname = url.hostname;

  // Local development environment
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    // No subdomain on bare localhost
    return null;
  }

  if (hostname.includes(".localhost")) {
    // e.g. acme.localhost → acme
    return hostname.split(".localhost")[0];
  }

  // Production environment
  const rootDomainFormatted = rootDomain.split(":")[0];

  // Handle preview deployment URLs (tenant---<VERSION_PREFIX OR ALIAS>-<WORKER_NAME>.<SUBDOMAIN>.workers.dev)
  if (hostname.includes("---") && hostname.endsWith(".workers.dev")) {
    const parts = hostname.split("---");
    return parts.length > 0 ? parts[0] : null;
  }

  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, "") : null;
}

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: { queryClient },
    rewrite: {
      input: ({ url }) => {
        const subdomain = extractSubdomain(url);

        if (subdomain) {
          // Block access to /admin from subdomains — redirect to /
          if (url.pathname.startsWith("/admin")) {
            url.pathname = "/";
            return url;
          }

          // Rewrite subdomain root → /s/<subdomain>
          // e.g. acme.example.com/ → internally renders /s/acme
          if (url.pathname === "/") {
            url.pathname = `/s/${subdomain}`;
          }
        }

        return url;
      },

      output: ({ url }) => {
        // Reverse: /s/<subdomain> → subdomain root for link generation
        const match = url.pathname.match(/^\/s\/([^/]+)(\/.*)?$/);
        if (match) {
          const [, subdomain, rest] = match;
          const rootDomainFormatted = rootDomain.split(":")[0];

          // Reconstruct the subdomain hostname
          if (url.hostname.includes(".localhost")) {
            url.hostname = `${subdomain}.localhost`;
          } else {
            url.hostname = `${subdomain}.${rootDomainFormatted}`;
          }

          url.pathname = rest || "/";
        }

        return url;
      },
    },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
    handleRedirects: true,
    wrapQueryClient: true
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
