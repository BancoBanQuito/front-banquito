export interface ProvinceRSRQ {
    provinceName: string,
    cantons: [
        {
            cantonName: string,
            parishes: [
                {
                    parishName: string,
                    zipCode: string
                }
            ]
        }
    ]
}