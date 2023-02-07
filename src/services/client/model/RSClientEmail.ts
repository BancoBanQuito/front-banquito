export interface RSClientEmail {
    identificationType: string,
    identification: string,
    fullname: string,
    email: string,
    gender: string,
    career: string,
    phone: {
        phoneNumber: string,
        phoneType: string
    },
    address: {
        codeLocation: string,
        lineOne: string,
        lineTwo: string,
        latitude: string,
        longitude: string
    }
}