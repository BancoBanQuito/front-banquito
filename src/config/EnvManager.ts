const EnvManager = {
<<<<<<< HEAD
    CLIENT_URL: import.meta.env.VITE_CLIENT_URL || 'https://client-banquito-abigailscl-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
    SEGMENT_URL: import.meta.env.VITE_SEGMENT_URL || '',
    PRODUCT_URL: import.meta.env.VITE_PRODUCT || '',
    ACCOUNT_URL: import.meta.env.VITE_ACCOUNT || '',
    TRANSACTION_URL: import.meta.env.VITE_TRANSACTION_URL || '',
    SETTINGS_URL: import.meta.env.VITE_SETTINGS_URL || '',
=======
    CLIENT_URL: import.meta.env.VITE_CLIENT_URL || 'http:localhost:3001',
    SEGMENT_URL: import.meta.env.VITE_SEGMENT_URL || 'http:localhost:3002',
    PRODUCT_URL: import.meta.env.VITE_PRODUCT || 'http:localhost:3003',
    ACCOUNT_URL: import.meta.env.VITE_ACCOUNT || 'https://banquitoaccount-dalopez18-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
    TRANSACTION_URL: import.meta.env.VITE_TRANSACTION_URL || 'https://transaction-dalopez18-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
    SETTINGS_URL: import.meta.env.VITE_SETTINGS_URL || 'http:localhost:3007',
>>>>>>> main
};

export default Object.freeze(EnvManager);
