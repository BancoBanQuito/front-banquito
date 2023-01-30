const EnvManager = {
    CLIENT_URL: import.meta.env.VITE_CLIENT_URL || 'https://client-banquito-prod-abigailscl-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
    SEGMENT_URL: import.meta.env.VITE_SEGMENT_URL || '',
    PRODUCT_URL: import.meta.env.VITE_PRODUCT_URL || '',
    ACCOUNT_URL: import.meta.env.VITE_ACCOUNT_URL || 'https://banquitoaccount-dalopez18-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
    TRANSACTION_URL: import.meta.env.VITE_TRANSACTION_URL || 'https://transaction-dalopez18-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
    SETTINGS_URL: import.meta.env.VITE_SETTINGS_URL || '',
};

export default Object.freeze(EnvManager);
