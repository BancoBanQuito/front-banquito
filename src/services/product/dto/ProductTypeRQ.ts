export interface ProductTypeRQ {
    name: string,
    type: string,
    allowEarnInterest: string,
    allowGenAccState: string,
    temporalyInterest: string,
    products: [
        {
            id: string,
            name: string,
            status: string
        }
    ]
}