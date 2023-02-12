export interface ClientRS {
    id: string,
    identificationType: string,
    identification: string,
    lastname: string,
    firstname: string,
    fullname: string,
    status: string,
    email: string,
    birthDate: Date,
    gender: string,
    career: string,
    companyName: string,
    companyType: string,
    createDateCompany: Date,
    appLegalRepresent: string,
    articlesAssociatedDoc: string,
    basicServicesDocument: string,
    fingerPrint: string,
    incomeTaxDocument: string,
    lastStatusDate: Date,
    maritalStatus: string,
    monthlyAvgIncome: string,
    nationality: string,
    signature: string,
    taxPaymentPlace: string,
    tinDocument: string,
    workStatus: string,
    creationDate: Date,
    user: {
        userName: string,
        password: string,
        type: string,
        status: string,
        creationDate: Date,
        lastLoginDate: Date
    },
    relationship: {
        name: string,
        startDate: Date,
        endDate: Date
    },
    reference: {
        name: string,
        phone: string,
        related: string
    },
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
    },
    segment: {
        code: string,
        name: string,
        status: string
    }
}