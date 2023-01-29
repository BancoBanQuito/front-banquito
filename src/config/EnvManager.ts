const EnvManager = {
    CLIENT_URL: import.meta.env.VITE_CLIENT_URL || 'https://client-banquito-abigailscl-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/swagger-ui/index.html',
    SEGMENT_URL: import.meta.env.VITE_SEGMENT_URL || 'http:localhost:3002',
    PRODUCT_URL: import.meta.env.VITE_PRODUCT || 'http:localhost:3003',
    ACCOUNT_URL: import.meta.env.VITE_ACCOUNT || 'https://banquitoaccount-dalopez18-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
    TRANSACTION_URL: import.meta.env.VITE_TRANSACTION_URL || 'https://transaction-dalopez18-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
    SETTINGS_URL: import.meta.env.VITE_SETTINGS_URL || 'https://settingsbanquitoapp-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/swagger-ui/index.html',
};

export default Object.freeze(EnvManager);
