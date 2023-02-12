export interface AssociatedServiceParamRSRQ {
    valueType: string,
    name: string,
    account: [
        {
            codeAccount: string,
            status: string,
            textValue: string,
            dateValue: Date,
            numberValue: 0,
            createDate: Date,
            endDate: Date
        }
    ]
}