import { protocol, rootDomain } from "@/lib/consts";
import { createServerFn } from "@tanstack/react-start";
import { notFound, redirect } from "@tanstack/react-router";
import { env } from "cloudflare:workers";
import { subdomainFormSchema } from "@/lib/schemas";
import type { SubdomainData, Tenant } from "@/lib/types";

export const createSubdomainFn = createServerFn({ method: "POST" })
    .inputValidator(subdomainFormSchema)
    .handler(async ({ data }) => {
        const sanitizedSubdomain = data.subdomain
            .toLocaleLowerCase()
            .replace(/[^a-z0-9-]/g, "");

        if (sanitizedSubdomain !== data.subdomain) {
            throw new Error(
                "Subdomain can only have lowercase letters, numbers, and hyphens. Please try again.",
            );
        }

        const subdomainAlreadyExists = await env.KV.get<SubdomainData>(`subdomain:${sanitizedSubdomain}`, "json")
        if (subdomainAlreadyExists) {
            throw new Error("Subdomain already exists.")
        }

        await env.KV.put(
            `subdomain:${sanitizedSubdomain}`,
            JSON.stringify({
                name: data.name,
                createdAt: Date.now(),
            }),
        );

        throw redirect({
            to: `/s/$subdomain`,
            params: {
                subdomain: sanitizedSubdomain
            }
        });
    });

export const getSubdomainDataFn = createServerFn({ method: "GET" })
    .inputValidator(subdomainFormSchema.pick({ subdomain: true }))
    .handler(async ({ data }) => {
        const sanitizedSubdomain = data.subdomain
            .toLocaleLowerCase()
            .replace(/[^a-z0-9-]/g, "");

        const subdomain = await env.KV.get<SubdomainData>(
            `subdomain:${sanitizedSubdomain}`,
        );

        if (!subdomain) {
            throw notFound();
        }

        console.log("Found subdomain", subdomain)

        return subdomain;
    });

export const getAllSubdomainsFn = createServerFn({ method: "GET" }).handler(
    async () => {
        const list = await env.KV.list({
            prefix: "subdomain:",
        });

        const keys = list.keys.map((k) => k.name);

        if (!keys.length) {
            return [];
        }

        const values = await env.KV.get<SubdomainData>(keys, "json");

        const tenants = keys.map((key): Tenant => {
            const subdomain = key.replace("subdomain:", "");
            const data = values.get(key);
            return {
                subdomain,
                name: data?.name || "Unknown",
                createdAt: data?.createdAt || Date.now(),
            };
        });

        return tenants;
    },
);

export const deleteSubdomainFn = createServerFn({ method: "POST" })
    .inputValidator(subdomainFormSchema.pick({ subdomain: true }))
    .handler(async ({ data }) => {
        const sanitizedSubdomain = data.subdomain
            .toLocaleLowerCase()
            .replace(/[^a-z0-9-]/g, "");

        await env.KV.delete(
            `subdomain:${sanitizedSubdomain}`,
        );
    });