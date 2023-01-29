export interface RSTransaction {
    codeUniqueTransaction: string;
    movement: string;
    codeLocalAccount: string;
    type: string;
    concept: string;
    executeDate: Date;
    value: number;
    presentBalance: number;
    availableBalance: number;
}