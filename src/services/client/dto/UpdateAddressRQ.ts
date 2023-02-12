export interface UpdateAddressRQ {
    identificationType: string,
    identification: string,
    address: {
        codeLocation: string,
        lineOne: string,
        lineTwo: string,
        latitude: string,
        longitude: string
    }
}