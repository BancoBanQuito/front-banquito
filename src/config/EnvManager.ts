const EnvManager = {
    CLIENT_URL: import.meta.env.VITE_CLIENT_URL || '',
    SEGMENT_URL: import.meta.env.VITE_SEGMENT_URL || '',
    PRODUCT_URL: import.meta.env.VITE_PRODUCT || '',
    ACCOUNT_URL: import.meta.env.VITE_ACCOUNT || 'http://localhost:9001',
    TRANSACTION_URL: import.meta.env.VITE_TRANSACTION_URL || 'http://localhost:9002',
    SETTINGS_URL: import.meta.env.VITE_SETTINGS_URL || '',
};

export default Object.freeze(EnvManager);
