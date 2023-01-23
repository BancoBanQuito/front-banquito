const HOST = "http://localhost:9002"


//#region ACCOUNT STATEMENT
export const GET_ACCOUNT_STATEMENT_LIST_API = (accountCode: string, accountIntenationalCode: string) =>
    `${HOST}/api/account/statement/list/${accountCode}/${accountIntenationalCode}`;

export const GET_ACCOUNT_STATEMENT_CURRENT_API = (accountCode: string, accountIntenationalCode: string) =>
    `${HOST}/api/account/statement/current/${accountCode}/${accountIntenationalCode}`;

export const GET_ACCOUNT_STATEMENT_HISTORIC_API = (statementLog: string) =>
    `${HOST}/api/account/statement/historic/${statementLog}`;
//#endregion

//#region ACCOUNT
export const PUT_ACCOUNT_STATUS_API = (codeLocalAccount: string, codeInternationalAccount: string) =>
    `${HOST}/api/account/code/${codeLocalAccount}/${codeInternationalAccount}/status`;

export const PUT_ACCOUNT_BALANCE_API = (codeLocalAccount: string, codeInternationalAccount: string) =>
    `${HOST}/api/account/code/${codeLocalAccount}/${codeInternationalAccount}/balance`;

export const POST_ACCOUNT_API = () =>
    `${HOST}/api/account`;

export const GET_ACCOUNT_ID_API = (identificationType: string, identification: string) =>
    `${HOST}/api/account/id/${identificationType}/${identification}`;

export const GET_ACCOUNT_CODE_API = (codeLocalAccount: string, codeInternationalAccount: string) =>
    `${HOST}/api/account/code/${codeLocalAccount}/${codeInternationalAccount}`;

export const GET_ACCOUNT_SIMPLE_API = (codeLocalAccount: string) =>
    `${HOST}/api/account/code/${codeLocalAccount}`;
//#endregion

//#region ACCOUNT SIGNATURE
export const PUT_ACCOUNT_SIGNATURE_API = (identificationType: string, identification: string, codeLocalAccount: string, codeInternationalAccount: string) =>
    `${HOST}/api/account/signature/${identificationType}/${identification}/${codeLocalAccount}/${codeInternationalAccount}`;

export const POST_ACCOUNT_SIGNATURE_API = () =>
    `${HOST}/api/account/signature`;

export const GET_ACCOUNT_SIGNATURE_API = (identificationType: string, identification: string) =>
    `${HOST}/api/account/signature/${identificationType}/${identification}`;

export const GET_ACCOUNT_SIGNATURE_TEST_API = () =>
    `${HOST}/api/account/signature/test`;
//#endregion

//#region TRANSACTION
export const PUT_TRANSACTION = (codeUniqueTransaction: string) =>
    `${HOST}/api/transaction/${codeUniqueTransaction}`;

export const POST_TRANSACTION = () =>
    `${HOST}/api/transaction`;

export const GET_TRANSACTION_FROM_TO_API = (codeLocalAccount: string, from: string, to: string) =>
    `${HOST}/api/transaction/${codeLocalAccount}/${from}/${to}`;
//#endregion

//#region INTEREST
export const POST_INTEREST_API = () =>
    `${HOST}/api/transaction/interest`;

export const GET_INTEREST_FROM_TO_API = (codeLocalAccount: string, from: string, to: string) =>
    `${HOST}/api/transaction/interest/${codeLocalAccount}/${from}/${to}`;

export const GET_INTEREST_INVESTMENT_API = (codeLocalAccount: string, days: number, capital: number, ear: number) =>
    `${HOST}/api/transaction/interest/investment/${codeLocalAccount}/${days}/${capital}/${ear}`;
//#endregion