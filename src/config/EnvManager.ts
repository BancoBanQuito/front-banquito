const EnvManager = {
    CLIENT_URL: import.meta.env.VITE_CLIENT_URL || 'https://client-banquito-abigailscl-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
    SEGMENT_URL: import.meta.env.VITE_SEGMENT_URL || '',
    PRODUCT_URL: import.meta.env.VITE_PRODUCT || '',
    ACCOUNT_URL: import.meta.env.VITE_ACCOUNT || '',
    TRANSACTION_URL: import.meta.env.VITE_TRANSACTION_URL || '',
    SETTINGS_URL: import.meta.env.VITE_SETTINGS_URL || '',
};

export default Object.freeze(EnvManager);
