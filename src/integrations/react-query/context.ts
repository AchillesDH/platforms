import { MutationCache, QueryClient, type QueryKey } from "@tanstack/react-query";

declare module "@tanstack/react-query" {
    interface Register {
        mutationMeta: {
            invalidatesQuery?: QueryKey
        }
    }
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // With SSR we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client.
            staleTime: 1000 * 60 * 2, // 2 minutes
        },
    },
    mutationCache: new MutationCache({
        onSettled: (_data, _error, _variables, _context, mutation) => {
            if (mutation.meta?.invalidatesQuery) {
                queryClient.invalidateQueries({
                    queryKey: mutation.meta.invalidatesQuery
                })
            }
        }
    })
});