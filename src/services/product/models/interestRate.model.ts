
export default interface IInterestRate {
    id: string,
    name: string,
    type: string,
    value: number,
    calcBase: string,
    status: string,
}

export default interface SelectInterestRate {
    id: string,
    name: string
}

export default interface IInterestRateValue {
    id: string,
    value: number
}

export default interface IInterestRateAdd {
    name: string,
    type: string,
    calcBase: string
}

export default interface IInterestRateStatus{
    id: string,
    status: string
}