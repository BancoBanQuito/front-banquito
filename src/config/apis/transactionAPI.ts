import EnvManager from "../EnvManager";

//#region TRANSACTION
export const PUT_TRANSACTION = (codeUniqueTransaction: string) =>
    `${EnvManager.TRANSACTION_URL}/api/transaction/${codeUniqueTransaction}`;

export const POST_TRANSACTION = () =>
    `${EnvManager.TRANSACTION_URL}/api/transaction`;

export const GET_TRANSACTION_FROM_TO_API = (codeLocalAccount: string, from: string, to: string) =>
    `${EnvManager.TRANSACTION_URL}/api/transaction/${codeLocalAccount}/${from}/${to}`;
//#endregion

//#region INTEREST
export const POST_INTEREST_API = () =>
    `${EnvManager.TRANSACTION_URL}/api/transaction/interest`;

export const GET_INTEREST_FROM_TO_API = (codeLocalAccount: string, from: string, to: string) =>
    `${EnvManager.TRANSACTION_URL}/api/transaction/interest/${codeLocalAccount}/${from}/${to}`;

export const GET_INTEREST_INVESTMENT_API = (codeLocalAccount: string, days: number, capital: number, ear: number) =>
    `${EnvManager.TRANSACTION_URL}/api/transaction/interest/investment/${codeLocalAccount}/${days}/${capital}/${ear}`;
//#endregion
