import URL from '../EnvManager';

//#region ACCOUNT STATEMENT
export const GET_ACCOUNT_STATEMENT_LIST_API = (codeLocalAccount: string) =>
    `${URL.ACCOUNT_URL}/api/account/statement/list/${codeLocalAccount}`;
    
export const GET_ACCOUNT_STATEMENT_HISTORIC_API = (statementLog: string) =>
    `${URL.ACCOUNT_URL}/api/account/statement/historic/${statementLog}`;

export const GET_ACCOUNT_STATEMENT_CURRENT_API = (codeLocalAccount: string) =>
    `${URL.ACCOUNT_URL}/api/account/statement/current/${codeLocalAccount}`;
//#endregion

//#region ACCOUNT
export const PUT_ACCOUNT_STATUS_API = (codeLocalAccount: string) =>
    `${URL.ACCOUNT_URL}/api/account/code/${codeLocalAccount}/status`;

export const PUT_ACCOUNT_BALANCE_API = (codeLocalAccount: string) =>
    `${URL.ACCOUNT_URL}/api/account/code/${codeLocalAccount}/balance`;

export const POST_ACCOUNT_API = () =>
    `${URL.ACCOUNT_URL}/api/account`;

export const GET_ACCOUNT_ID_API = (identificationType: string, identification: string) =>
    `${URL.ACCOUNT_URL}/api/account/id/${identificationType}/${identification}`;

export const GET_ACCOUNT_CODE_API = (codeLocalAccount: string) =>
    `${URL.ACCOUNT_URL}/api/account/code/${codeLocalAccount}`;
//#endregion

//#region ACCOUNT ASSOCIATED SERVICE
export const POST_ACCOUNT_ASSOCIATED_SERVICE = () =>
    `${URL.ACCOUNT_URL}/api/account/associated/service`;
//#endregion

//#region ACCOUNT SIGNATURE
export const PUT_ACCOUNT_SIGNATURE_API = (identificationType: string, identification: string, codeLocalAccount: string) =>
    `${URL.ACCOUNT_URL}/api/account/signature/${identificationType}/${identification}/${codeLocalAccount}`;

export const POST_ACCOUNT_SIGNATURE_API = () =>
    `${URL.ACCOUNT_URL}/api/account/signature`;

export const GET_ACCOUNT_SIGNATURE_API = (identificationType: string, identification: string) =>
    `${URL.ACCOUNT_URL}/api/account/signature/${identificationType}/${identification}`;

export const GET_ACCOUNT_SIGNATURE_CODE_API = (codeLocalAccount: string) =>
    `${URL.ACCOUNT_URL}/api/account/signature/code/${codeLocalAccount}`;
//#endregion