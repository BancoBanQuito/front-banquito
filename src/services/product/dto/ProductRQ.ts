export interface ProductRQ {
    name: string,
    status: string,
    startDate: Date,
    endDate: Date,
    temporalyAccountState: string,
    useCheckbook: string,
    allowTransference: string,
    typeClient: string,
    minOpeningBalance: string,
    interestRate: {
        id: string,
        name: string,
        type: string,
        calcBase: string
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
    ],
    productType: {
        id: string,
        name: string
    }
}