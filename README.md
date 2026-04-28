# TanStack Start Multi-Tenant Example

> View live example: [TSS Platforms](https://tss-platforms.dev)

A production-ready example of a multi-tenant application built with TanStack Start, featuring custom subdomains for each tenant.

## Features

- ✅ Custom subdomain routing with TanStack Start router url rewrites
- ✅ Tenant-specific content and pages
- ✅ Shared components and layouts across tenants
- ✅ Cache for tenant data storage
- ✅ Admin interface for managing tenants
- ✅ Support for local development with subdomains

## Tech Stack

- [TanStack Start](https://tanstack.com/start/latest) with React
- [React 19](https://react.dev/)
- [Cloudflare KV](https://developers.cloudflare.com/kv/) for data storage
- [Tailwind 4](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for the design system

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- pnpm (recommended) or npm/yarn
- Cloudflare account (for production) - you can swap this out for whatever deployment and storage you want

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AchillesDH/platforms.git
   cd platforms
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Copy `.env.example` twice and name it `.env.development` and `.env.production`.

   Update the contents to have your development domain and production domain

   ```
   # .env.development
   VITE_ROOT_DOMAIN=localhost:3000

   # .env.development
   VITE_ROOT_DOMAIN=yourdomain.com
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Access the application:
   - Main site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin
   - Tenants: http://[tenant-name].localhost:3000

## Multi-Tenant Architecture

This application demonstrates a subdomain-based multi-tenant architecture where:

- Each tenant gets their own subdomain (`tenant.yourdomain.com`)
- The router rewrite handles routing requests to the correct tenant
- Tenant data is stored in Cloudflare KV using a `subdomain:{name}` key pattern
- The main domain hosts the landing page and admin interface
- Subdomains are dynamically mapped to tenant-specific content

The router detects subdomains across various environments (local development and production) and rewrites the location between the actual href and the internal href of the router.

## Deployment

This application is designed to be deployed on Cloudflare. To deploy:

Update `wrangler.jsonc` with your own configurations, you will need to change:

```
# KV Namespace
"kv_namespaces": [
    {
        "binding": "KV",
        "id": "<YOUR_KV_NAMESPACE_ID>"
    }
]

# Routes
"routes": [
    {
        "pattern": <YOUR_ROOT_DOMAIN>/*",
        "zone_name": "<YOUR_ROOT_DOMAIN>"
    },
    {
        "pattern": "*.<YOUR_ROOT_DOMAIN>/*",
        "zone_name": "<YOUR_ROOT_DOMAIN>"
    }
]
```

Ensure you have also provided the proper values for your environment-variables in `.env.production` as these get bundled at build time.

Run the following to deploy to Cloudflare Workers:

`pnpm run deploy`

For custom domains, make sure to:

1. Add your root domain to Cloudflare
2. Set up a wildcard DNS record (`*.yourdomain.com`) on Cloudflare

## Todos

- Move all data fetching and mutations to TanStack Query so we can do proper invalidations, etc.
- Implement `better-auth` with support for the `admin` and `organization` plugins.
  - Admin plugin controls access to the `/admin` dashboard and admin functions.
  - Organization plugin controls tenant creation and access to `/s/<subdomain>` routes.
- 