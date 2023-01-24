const HOST_ACCOUNT = "https://916e-190-63-97-92.ngrok.io"
const HOST_TRANSACTION = "https://c2a6-190-63-97-92.ngrok.io/"


//#region ACCOUNT STATEMENT
export const GET_ACCOUNT_STATEMENT_LIST_API = (accountCode: string, accountIntenationalCode: string) =>
    `${HOST_ACCOUNT}/api/account/statement/list/${accountCode}/${accountIntenationalCode}`;

export const GET_ACCOUNT_STATEMENT_CURRENT_API = (accountCode: string, accountIntenationalCode: string) =>
    `${HOST_ACCOUNT}/api/account/statement/current/${accountCode}/${accountIntenationalCode}`;

export const GET_ACCOUNT_STATEMENT_HISTORIC_API = (statementLog: string) =>
    `${HOST_ACCOUNT}/api/account/statement/historic/${statementLog}`;
//#endregion

//#region ACCOUNT
export const PUT_ACCOUNT_STATUS_API = (codeLocalAccount: string, codeInternationalAccount: string) =>
    `${HOST_ACCOUNT}/api/account/code/${codeLocalAccount}/${codeInternationalAccount}/status`;

export const PUT_ACCOUNT_BALANCE_API = (codeLocalAccount: string, codeInternationalAccount: string) =>
    `${HOST_ACCOUNT}/api/account/code/${codeLocalAccount}/${codeInternationalAccount}/balance`;

export const POST_ACCOUNT_API = () =>
    `${HOST_ACCOUNT}/api/account`;

export const GET_ACCOUNT_ID_API = (identificationType: string, identification: string) =>
    `${HOST_ACCOUNT}/api/account/id/${identificationType}/${identification}`;

export const GET_ACCOUNT_CODE_API = (codeLocalAccount: string, codeInternationalAccount: string) =>
    `${HOST_ACCOUNT}/api/account/code/${codeLocalAccount}/${codeInternationalAccount}`;

export const GET_ACCOUNT_SIMPLE_API = (codeLocalAccount: string) =>
    `${HOST_ACCOUNT}/api/account/code/${codeLocalAccount}`;
//#endregion

//#region ACCOUNT SIGNATURE
export const PUT_ACCOUNT_SIGNATURE_API = (identificationType: string, identification: string, codeLocalAccount: string, codeInternationalAccount: string) =>
    `${HOST_ACCOUNT}/api/account/signature/${identificationType}/${identification}/${codeLocalAccount}/${codeInternationalAccount}`;

export const POST_ACCOUNT_SIGNATURE_API = () =>
    `${HOST_ACCOUNT}/api/account/signature`;

export const GET_ACCOUNT_SIGNATURE_API = (identificationType: string, identification: string) =>
    `${HOST_ACCOUNT}/api/account/signature/${identificationType}/${identification}`;

export const GET_ACCOUNT_SIGNATURE_TEST_API = () =>
    `${HOST_ACCOUNT}/api/account/signature/test`;
//#endregion

//#region TRANSACTION
export const PUT_TRANSACTION = (codeUniqueTransaction: string) =>
    `${HOST_TRANSACTION}/api/transaction/${codeUniqueTransaction}`;

export const POST_TRANSACTION = () =>
    `${HOST_TRANSACTION}/api/transaction`;

export const GET_TRANSACTION_FROM_TO_API = (codeLocalAccount: string, from: string, to: string) =>
    `${HOST_TRANSACTION}/api/transaction/${codeLocalAccount}/${from}/${to}`;
//#endregion

//#region INTEREST
export const POST_INTEREST_API = () =>
    `${HOST_TRANSACTION}/api/transaction/interest`;

export const GET_INTEREST_FROM_TO_API = (codeLocalAccount: string, from: string, to: string) =>
    `${HOST_TRANSACTION}/api/transaction/interest/${codeLocalAccount}/${from}/${to}`;

export const GET_INTEREST_INVESTMENT_API = (codeLocalAccount: string, days: number, capital: number, ear: number) =>
    `${HOST_TRANSACTION}/api/transaction/interest/investment/${codeLocalAccount}/${days}/${capital}/${ear}`;
//#endregion