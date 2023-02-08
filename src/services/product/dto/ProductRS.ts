export interface ProductRS {
    id: string,
    name: string,
    status: string,
    productType: {
        id: string,
        name: string
    },
    associatedService: [
        {
            id: string,
            name: string,
            allowPayment: string,
            paymentMethod: string,
            chargeVat: string,
            fee: number
        }
    ]
}