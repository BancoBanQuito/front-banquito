export interface TransactionPost {
    movement: string,
    type: string,
    codeLocalAccount: string,
    codeInternationalAccount: string,
    concept: string,
    description: string,
    value: number,
    recipientAccountNumber: string,
    recipientBank: string,
    recipientType: string
}