export interface ILocation {
    provinceName: string;
    cantonName: string;
    parishName: string;
}

export interface IBranch {
    name: string;
    phoneNumber: number;
    address: string;
    mondayToFriday: string;
    saturday: string;
    location: ILocation;
}