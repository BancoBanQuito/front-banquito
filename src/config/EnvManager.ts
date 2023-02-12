const EnvManager = {
    CLIENT_URL: import.meta.env.VITE_CLIENT_URL || 'https://client-banquito-prod-abigailscl-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
    SEGMENT_URL: import.meta.env.VITE_SEGMENT_URL || 'https://segment-banquito-prod-abigailscl-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
    PRODUCT_URL: import.meta.env.VITE_PRODUCT_URL || 'https://product-banquito-pablin2017-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com',
    ACCOUNT_URL: import.meta.env.VITE_ACCOUNT_URL || 'https://banquitoaccount-dalopez18-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
    TRANSACTION_URL: import.meta.env.VITE_TRANSACTION_URL || 'https://transaction-dalopez18-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
    SETTINGS_URL: import.meta.env.VITE_SETTINGS_URL || 'https://settingsbanquito-app-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
};

export default Object.freeze(EnvManager);
