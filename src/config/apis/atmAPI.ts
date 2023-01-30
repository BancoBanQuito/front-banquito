import URL from '../EnvManager';

export const GET_ATM_CREDENTIALS = (identification: string) =>
    `${URL.CLIENT_URL}/api/client/atm/${identification}`;