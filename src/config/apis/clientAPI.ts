import EnvManager from "../EnvManager";

export const POST_CLIENT_LOGIN = () =>
    `${EnvManager.CLIENT_URL}/api/client/login`;

export const GET_CLIENT_BY_EMAIL = (email: string) =>
    `${EnvManager.CLIENT_URL}/api/client/email/${email}`;