export interface UpdatePhoneRQ {
    identificationType: string,
    identification: string,
    phone: {
        phoneNumber: string,
        phoneType: string
    }
}