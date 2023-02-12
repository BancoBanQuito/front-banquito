export interface ClientRQ {
    email: string,
    gender: string,
    career: string,
    address: {
        codeLocation: string,
        lineOne: string,
        lineTwo: string,
        latitude: string,
        longitude: string
    },
    phone: {
        phoneNumber: string,
        phoneType: string
    }
}