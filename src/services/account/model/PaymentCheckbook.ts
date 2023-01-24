export interface PaymentCheckbook{
    date: string;
    movements: string;
    concept: string;
    value: number;
    availableBalance: number;
    beneficiary : string;
    detail: string;
}