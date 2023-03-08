const EnvManager = {
    CLIENT_URL: import.meta.env.VITE_CLIENT_URL || 'http://ec2-52-87-157-136.compute-1.amazonaws.com',
    SEGMENT_URL: import.meta.env.VITE_SEGMENT_URL || 'http://ec2-54-82-244-214.compute-1.amazonaws.com',
    PRODUCT_URL: import.meta.env.VITE_PRODUCT_URL || 'http://ec2-54-91-135-51.compute-1.amazonaws.com',
    ACCOUNT_URL: import.meta.env.VITE_ACCOUNT_URL || 'http://ec2-3-94-85-202.compute-1.amazonaws.com',
    TRANSACTION_URL: import.meta.env.VITE_TRANSACTION_URL || 'http://ec2-54-210-251-222.compute-1.amazonaws.com',
    SETTINGS_URL: import.meta.env.VITE_SETTINGS_URL || 'https://settingsbanquito-app-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com',
};

export default Object.freeze(EnvManager);


EStos son los deploys de todos los servicios, por fa cualuier cosa avisenme y cada que hagan merge a master o push directamente, los cambios se reflejaran en la nube, ustedes o tiene que hacer nada

client: http://ec2-52-87-157-136.compute-1.amazonaws.com/
segment: http://ec2-54-82-244-214.compute-1.amazonaws.com/
account: http://ec2-3-94-85-202.compute-1.amazonaws.com/
product: http://ec2-54-91-135-51.compute-1.amazonaws.com/
transaction: http://ec2-54-210-251-222.compute-1.amazonaws.com/ 