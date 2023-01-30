export interface IRelationship {
    name: string,
    startDate: Date,
    endDate: Date
}

export interface IReference {
    name: string,
    phone: string,
    related: string
}

export interface IPhone {
    phoneNumber: string,
    phoneType: string
}

export interface IAddress {
    codeLocation: string,
    lineOne: string,
    lineTwo: string,
    latitude: string,
    longitude: string
}

export interface ISegment {
    code: string,
    name: string,
    status: string
}

export interface IUser {
    userName: string,
    password: string,
    type: string,
    creationDate: Date,
    lastLoginDate: Date
}

export interface Client {
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
    relationship: IRelationship[],
    reference: IReference[],
    phone: IPhone[],
    address: IAddress[],
    segment: ISegment,
    user: IUser
}