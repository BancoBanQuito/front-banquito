export interface CantonRSRQ {
    cantonName: string,
    parishes: [
        {
            parishName: string,
            zipCode: string
        }
    ]
}