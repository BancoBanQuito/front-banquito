export interface RSAccountStatementList {
    code: string,
    currentCutOffDate: Date;
    credit: number;
    debit: number;
    interest: number;
    balance: number;
}