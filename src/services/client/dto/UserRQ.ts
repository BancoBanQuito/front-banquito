export interface UserRQ {
    identificationType: string,
    identification: string,
    email: string,
    user: {
        userName: string,
        password: string,
        type: string,
        status: string,
        creationDate: string,
        lastLoginDate: string
    }
}