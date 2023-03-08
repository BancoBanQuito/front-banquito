const EnvManager = {
    CLIENT_URL: import.meta.env.VITE_CLIENT_URL || 'http://ec2-52-87-157-136.compute-1.amazonaws.com',
    SEGMENT_URL: import.meta.env.VITE_SEGMENT_URL || 'http://ec2-54-82-244-214.compute-1.amazonaws.com',
    PRODUCT_URL: import.meta.env.VITE_PRODUCT_URL || 'http://ec2-54-91-135-51.compute-1.amazonaws.com',
    ACCOUNT_URL: import.meta.env.VITE_ACCOUNT_URL || 'http://ec2-3-94-85-202.compute-1.amazonaws.com',
    TRANSACTION_URL: import.meta.env.VITE_TRANSACTION_URL || 'http://ec2-54-210-251-222.compute-1.amazonaws.com',
    SETTINGS_URL: import.meta.env.VITE_SETTINGS_URL || 'https://settingsbanquito-app-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
};

export default Object.freeze(EnvManager);