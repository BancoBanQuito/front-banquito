export interface Transference {
    identification: string,
    identificationType: string,
    accountNumber: string,
    transferAmount: number,
    date: string,
    recipient: {
        accountNumber: string,
        identification: string,
        identificationType: string,
    }
}