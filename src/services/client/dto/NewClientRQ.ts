export interface NewClientRQ {
    identificationType: string,
    identification: string,
    lastname: string,
    firstname: string,
    email: string,
    birthDate: string,
    gender: string,
    career: string,
    companyName: string,
    companyType: string,
    createDateCompany: string,
    appLegalRepresent: string,
    articlesAssociatedDoc: string,
    basicServicesDocument: string,
    fingerPrint: string,
    incomeTaxDocument: string,
    lastStatusDate: string,
    maritalStatus: string,
    monthlyAvgIncome: string,
    nationality: string,
    signature: string,
    taxPaymentPlace: string,
    tinDocument: string,
    workStatus: string,
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
    },
    reference: {
        name: string,
        phone: string,
        related: string
    },
    relationship: {
        name: string,
        startDate: string,
        endDate: string
    },
    segment: {
        code: string,
        name: string,
        status: string
    }
}