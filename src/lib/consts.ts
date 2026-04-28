export const protocol =
    import.meta.env.PROD ? 'https' : 'http';
export const rootDomain =
    import.meta.env.VITE_ROOT_DOMAIN || 'localhost:3000';