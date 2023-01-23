export interface AccountStament {
    localCodeAccount: string
    lastCutOffDate: Date,
    currentCutOffDate: Date,
    creditMovements: number,
    debitMovements: number,
    interest: number,
    previousBalance: number,
    currentBalance: number,
    averageBalance: number,
    transactions: {
        date: Date,
        movement: string,
        concept: string,
        amount: number,
        balance: number
    }[]
}