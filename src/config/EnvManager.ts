const EnvManager = {
    CLIENT_URL: import.meta.env.VITE_CLIENT_URL || '',
    SEGMENT_URL: import.meta.env.VITE_SEGMENT_URL || '',
    PRODUCT_URL: import.meta.env.VITE_PRODUCT_URL || 'https://product-banquito-pablin2017-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com',
    ACCOUNT_URL: import.meta.env.VITE_ACCOUNT_URL || '',
    TRANSACTION_URL: import.meta.env.VITE_TRANSACTION_URL || '',
    SETTINGS_URL: import.meta.env.VITE_SETTINGS_URL || '',
};

export default Object.freeze(EnvManager);
