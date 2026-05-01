import { createSubdomainFn, deleteSubdomainFn, getAllSubdomainsFn, getSubdomainDataFn } from "@/server/functions/subdomain";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const createSubdomainMutationOptions = () => mutationOptions({
    mutationFn: createSubdomainFn,
    meta: {
        invalidatesQuery: ["subdomains"]
    }
})

export const deleteSubdomainMutationOptions = () => mutationOptions({
    mutationFn: deleteSubdomainFn,
    meta: {
        invalidatesQuery: ["subdomains"]
    }
})

export const getSubdomainsOptions = () => queryOptions({
    queryKey: ["subdomains"],
    queryFn: () => getAllSubdomainsFn()
})

export const getSubdomainDetailsOptions = (subdomain: string) => queryOptions({
    queryKey: ["subdomains", subdomain],
    queryFn: () => getSubdomainDataFn({
        data: { subdomain }
    })
})