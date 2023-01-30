import EnvManager from "../EnvManager";

//#region ACCOUNT STATEMENT
export const GET_ACCOUNT_STATEMENT_LIST_API = (codeLocalAccount: string) =>
    `${EnvManager.ACCOUNT_URL}/api/account/statement/list/${codeLocalAccount}`;

export const GET_ACCOUNT_STATEMENT_HISTORIC_API = (statementLog: string) =>
    `${EnvManager.ACCOUNT_URL}/api/account/statement/historic/${statementLog}`;

export const GET_ACCOUNT_STATEMENT_CURRENT_API = (codeLocalAccount: string) =>
    `${EnvManager.ACCOUNT_URL}/api/account/statement/current/${codeLocalAccount}`;
//#endregion

//#region ACCOUNT
export const PUT_ACCOUNT_STATUS_API = (codeLocalAccount: string) =>
    `${EnvManager.ACCOUNT_URL}/api/account/code/${codeLocalAccount}/status`;

export const PUT_ACCOUNT_BALANCE_API = (codeLocalAccount: string) =>
    `${EnvManager.ACCOUNT_URL}/api/account/code/${codeLocalAccount}/balance`;

export const POST_ACCOUNT_API = () =>
    `${EnvManager.ACCOUNT_URL}/api/account`;

export const GET_ACCOUNT_ID_API = (identificationType: string, identification: string) =>
    `${EnvManager.ACCOUNT_URL}/api/account/id/${identificationType}/${identification}`;

export const GET_ACCOUNT_CODE_API = (codeLocalAccount: string) =>
    `${EnvManager.ACCOUNT_URL}/api/account/code/${codeLocalAccount}`;

export const GET_ACCOUNT_PRODUCT_API = (codeLocalAccount: string) =>
    `${EnvManager.ACCOUNT_URL}/api/account/code/${codeLocalAccount}/type`;
//#endregion

//#region ACCOUNT ASSOCIATED SERVICE
export const POST_ACCOUNT_ASSOCIATED_SERVICE = () =>
    `${EnvManager.ACCOUNT_URL}/api/account/associated/service`;
//#endregion

//#region ACCOUNT SIGNATURE
export const PUT_ACCOUNT_SIGNATURE_API = (identificationType: string, identification: string, codeLocalAccount: string) =>
    `${EnvManager.ACCOUNT_URL}/api/account/signature/${identificationType}/${identification}/${codeLocalAccount}`;

export const POST_ACCOUNT_SIGNATURE_API = () =>
    `${EnvManager.ACCOUNT_URL}/api/account/signature`;

export const GET_ACCOUNT_SIGNATURE_API = (identificationType: string, identification: string) =>
    `${EnvManager.ACCOUNT_URL}/api/account/signature/id/${identificationType}/${identification}`;

export const GET_ACCOUNT_SIGNATURE_CODE_API = (codeLocalAccount: string) =>
    `${EnvManager.ACCOUNT_URL}/api/account/signature/code/${codeLocalAccount}`;
//#endregion
