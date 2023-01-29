export interface RSAccountStatement {
    localCodeAccount: string;
    lastCutOffDate: Date;
    currentCutOffDate: Date;
    previousBalance: number;
    creditMovements: number;
    debitMovements: number;
    interest: number;
    currentBalance: number;
    averageBalance: number;
    transactions: RSAccountStatementTransaccion[];
}

export interface RSAccountStatementTransaccion {
    date: string;
    movement: string;
    concept: string;
    amount: number;
    balance: number;
}