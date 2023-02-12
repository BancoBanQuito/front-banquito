export interface AssociatedServiceRSRQ {
    id: string,
    name: string,
    allowPayment: string,
    paymentMethod: string,
    chargeVat: string,
    fee: number,
    params: [
        {
            valueType: string,
            name: string,
            account: [
                {
                    codeAccount: string,
                    status: string,
                    textValue: string,
                    dateValue: Date,
                    numberValue: number,
                    createDate: Date,
                    endDate: Date
                }
            ]
        }
    ],
    accounts: [
        {
            codeAccount: string,
            status: string,
            textValue: string,
            dateValue: Date,
            numberValue: number,
            createDate: Date,
            endDate: Date
        }
    ]
}