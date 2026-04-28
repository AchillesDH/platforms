// This is the payload we send/recv from cache
export type SubdomainData = {
    name: string;
    createdAt: number;
}

// This is the cache data + the subdomain value itself
export type Tenant = SubdomainData & {
    subdomain: string;
}