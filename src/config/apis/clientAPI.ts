import EnvManager from "../EnvManager";

export const PUT_CLIENT_BY_ID = (identification: string) =>
    `${EnvManager.CLIENT_URL}/api/client/${identification}`

export const PUT_CLIENT_BY_USER_ID = (identification: string) =>
    `${EnvManager.CLIENT_URL}/api/client/user/${identification}`

export const PUT_CLIENT_REFERENCE = () =>
    `${EnvManager.CLIENT_URL}/api/client/reference`

export const PUT_CLIENT_PHONE = () =>
    `${EnvManager.CLIENT_URL}/api/client/phone`

export const PUT_CLIENT_PERSONAL_DATA = () =>
    `${EnvManager.CLIENT_URL}/api/client/personal-data`

export const PUT_CLIENT_ADDRESS = () =>
    `${EnvManager.CLIENT_URL}/api/client/adress`

export const POST_CLIENT = () =>
    `${EnvManager.CLIENT_URL}/api/client`

export const POST_CLIENT_SIGNUP = () =>
    `${EnvManager.CLIENT_URL}/api/client/signup`;

export const POST_CLIENT_LOGIN = () =>
    `${EnvManager.CLIENT_URL}/api/client/login`;

export const GET_CLIENT_BY_ID_AND_IDENTIFICATION_TYPE = (identification: string, identificationType: string) =>
    `${EnvManager.CLIENT_URL}/api/client/${identification}/${identificationType}`;

export const GET_CLIENT_SIGNATURE = (identification: string, identificationType: string) =>
    `${EnvManager.CLIENT_URL}/api/client/signature/${identificationType}/${identification}`;

export const GET_CLIENT_BY_EMAIL = (email: string) =>
    `${EnvManager.CLIENT_URL}/api/client/email/${email}`;

export const GET_CLIENTS_BY_LASTNAME = (lastname: string) =>
    `${EnvManager.CLIENT_URL}/api/client/clients/${lastname}`;

export const GET_CLIENT_BY_ID = (identification: string) =>
    `${EnvManager.CLIENT_URL}/api/client/client/${identification}`;

export const GET_CLIENT_ATM = (identification: string) =>
    `${EnvManager.CLIENT_URL}/api/client/atm/${identification}`;