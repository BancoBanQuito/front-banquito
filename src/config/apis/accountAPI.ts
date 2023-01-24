import URL from '../EnvManager';

//#region ACCOUNT STATEMENT
export const GET_ACCOUNT_STATEMENT_LIST_API = (accountCode: string, accountIntenationalCode: string) =>
    `${URL.ACCOUNT_URL}/api/account/statement/list/${accountCode}/${accountIntenationalCode}`;

export const GET_ACCOUNT_STATEMENT_CURRENT_API = (accountCode: string, accountIntenationalCode: string) =>
    `${URL.ACCOUNT_URL}/api/account/statement/current/${accountCode}/${accountIntenationalCode}`;

export const GET_ACCOUNT_STATEMENT_HISTORIC_API = (statementLog: string) =>
    `${URL.ACCOUNT_URL}/api/account/statement/historic/${statementLog}`;
//#endregion

//#region ACCOUNT
export const PUT_ACCOUNT_STATUS_API = (codeLocalAccount: string, codeInternationalAccount: string) =>
    `${URL.ACCOUNT_URL}/api/account/code/${codeLocalAccount}/${codeInternationalAccount}/status`;

export const PUT_ACCOUNT_BALANCE_API = (codeLocalAccount: string, codeInternationalAccount: string) =>
    `${URL.ACCOUNT_URL}/api/account/code/${codeLocalAccount}/${codeInternationalAccount}/balance`;

export const POST_ACCOUNT_API = () =>
    `${URL.ACCOUNT_URL}/api/account`;

export const GET_ACCOUNT_ID_API = (identificationType: string, identification: string) =>
    `${URL.ACCOUNT_URL}/api/account/id/${identificationType}/${identification}`;

export const GET_ACCOUNT_CODE_API = (codeLocalAccount: string, codeInternationalAccount: string) =>
    `${URL.ACCOUNT_URL}/api/account/code/${codeLocalAccount}/${codeInternationalAccount}`;

export const GET_ACCOUNT_SIMPLE_API = (codeLocalAccount: string) =>
    `${URL.ACCOUNT_URL}/api/account/code/${codeLocalAccount}`;
//#endregion

//#region ACCOUNT SIGNATURE
export const PUT_ACCOUNT_SIGNATURE_API = (identificationType: string, identification: string, codeLocalAccount: string, codeInternationalAccount: string) =>
    `${URL.ACCOUNT_URL}/api/account/signature/${identificationType}/${identification}/${codeLocalAccount}/${codeInternationalAccount}`;

export const POST_ACCOUNT_SIGNATURE_API = () =>
    `${URL.ACCOUNT_URL}/api/account/signature`;

export const GET_ACCOUNT_SIGNATURE_API = (identificationType: string, identification: string) =>
    `${URL.ACCOUNT_URL}/api/account/signature/${identificationType}/${identification}`;

export const GET_ACCOUNT_SIGNATURE_TEST_API = () =>
    `${URL.ACCOUNT_URL}/api/account/signature/test`;
//#endregion