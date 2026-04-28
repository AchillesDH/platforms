import z from "zod";

export const subdomainFormSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required.")
        .max(32, "Name must be at most 32 characters."),
    subdomain: z
        .string()
        .min(5, "Subdomain must be at least 5 characters.")
        .max(32, "Subdomain must be at most 32 characters.")
});