export interface Client {
    identificationType: string,
    identification: string,
    lastname: string,
    firstname: string,
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
    relationship:
    {
        name: "Ninguna",
        startDate: "2013-10-01T00:00:00.000+00:00",
        endDate: "2013-10-01T00:00:00.000+00:00"
    }[],
    reference:
    {
        name: string,
        phone: string,
        related: string
    }[],
    phone:
    {
        phoneNumber: string,
        phoneType: string
    }[],
    address:
    {
        codeLocation: string,
        lineOne: string,
        lineTwo: string,
        latitude: string,
        longitude: string
    }[],
    segment:
    {
        code: string,
        name: string,
        status: string
    }[]
}
