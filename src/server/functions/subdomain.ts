import { protocol, rootDomain } from "#/lib/consts";
import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { env } from "cloudflare:workers";
import { subdomainFormSchema } from "#/lib/schemas";

export const createSubdomainFn = createServerFn({ method: "POST" })
    .inputValidator(subdomainFormSchema)
    .handler(async ({ data }) => {
        const sanitizedSubdomain = data.subdomain.toLocaleLowerCase().replace(/[^a-z0-9-]/g, "")

        if (sanitizedSubdomain !== data.subdomain) {
            throw new Error("Subdomain can only have lowercase letters, numbers, and hyphens. Please try again.")
        }

        await env.KV.put(
            `subdomain:${sanitizedSubdomain}`,
            JSON.stringify({
                name: data.name,
                createdAt: Date.now()
            })
        )

        throw redirect({
            href: `${protocol}://${sanitizedSubdomain}.${rootDomain}`
        })
    })