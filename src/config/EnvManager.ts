const EnvManager = {
    CLIENT_URL: import.meta.env.VITE_CLIENT_URL || 'http:localhost:3001',
    SEGMENT_URL: import.meta.env.VITE_SEGMENT_URL || 'http:localhost:3002',
    PRODUCT_URL: import.meta.env.VITE_PRODUCT || 'http:localhost:3003',
    ACCOUNT_URL: import.meta.env.VITE_ACCOUNT || 'http:localhost:3005',
    TRANSACTION_URL: import.meta.env.VITE_TRANSACTION_URL || 'http:localhost:3006',
    SETTINGS_URL: import.meta.env.VITE_SETTINGS_URL || 'http:localhost:3007',
};

export default Object.freeze(EnvManager);
