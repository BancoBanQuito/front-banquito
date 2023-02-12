export interface UpdateReferenceRQ {
    identificationType: string,
    identification: string,
    reference: {
        name: string,
        phone: string,
        related: string
    }
}