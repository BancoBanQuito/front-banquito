export interface BranchRQ {
    name: string,
    phoneNumber: number,
    address: string,
    branchOfficeHours: {
        openingTimeMondayFriday: {
            hour: number,
            minute: number,
            second: number,
            nano: number
        },
        closingTimeMondayFriday: {
            hour: number,
            minute: number,
            second: number,
            nano: number
        },
        openingTimeSaturday: {
            hour: number,
            minute: number,
            second: number,
            nano: number
        },
        closingTimeSaturday: {
            hour: number,
            minute: number,
            second: number,
            nano: number
        }
    },
    location: {
        additionalProp1: any,
        additionalProp2: any,
        additionalProp3: any
    }
}