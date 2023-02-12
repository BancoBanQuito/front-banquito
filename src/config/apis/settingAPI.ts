import EnvManager from "../EnvManager";

//#region LOCATION
export const GET_LOCATION_PROVINCE_BY_NAME = (provinceName: string) =>
    `${EnvManager.SETTINGS_URL}/api/location/province/${provinceName}`;

export const PUT_LOCATION_PROVINCE_BY_NAME = (provinceName: string) =>
    `${EnvManager.SETTINGS_URL}/api/location/province/${provinceName}`;

export const DELETE_LOCATION_PROVINCE_BY_NAME = (provinceName: string) =>
    `${EnvManager.SETTINGS_URL}/api/location/province/${provinceName}`;

export const GET_LOCATION_PARISH_BY_NAME = (parishName: string) =>
    `${EnvManager.SETTINGS_URL}/api/location/parish/${parishName}`;

export const PUT_LOCATION_PARISH_BY_NAME = (parishName: string) =>
    `${EnvManager.SETTINGS_URL}/api/location/parish/${parishName}`;

export const DELETE_LOCATION_PARISH_BY_NAME = (parishName: string) =>
    `${EnvManager.SETTINGS_URL}/api/location/parish/${parishName}`;

export const GET_LOCATION_CANTON_BY_NAME = (cantonName: string) =>
    `${EnvManager.SETTINGS_URL}/api/location/canton/${cantonName}`;

export const PUT_LOCATION_CANTON_BY_NAME = (cantonName: string) =>
    `${EnvManager.SETTINGS_URL}/api/location/canton/${cantonName}`;

export const DELETE_LOCATION_CANTON_BY_NAME = (cantonName: string) =>
    `${EnvManager.SETTINGS_URL}/api/location/canton/${cantonName}`;

export const POST_LOCATION_PROVINCE = () =>
    `${EnvManager.SETTINGS_URL}/api/location/province`;

export const POST_LOCATION_PARISH = () =>
    `${EnvManager.SETTINGS_URL}/api/location/parish`;

export const POST_LOCATION_CANTON = () =>
    `${EnvManager.SETTINGS_URL}/api/location/canton`;

export const GET_LOCATION = () =>
    `${EnvManager.SETTINGS_URL}/api/location`;

export const GET_LOCATION_PROVINCES = () =>
    `${EnvManager.SETTINGS_URL}/api/location/provinces`;

export const GET_LOCATION_BY_PROVINCE_CANTON_PARISH = (province: string, canton: string, parish: string) =>
    `${EnvManager.SETTINGS_URL}/api/location/province/${province}/${canton}/${parish}`;

export const GET_LOCATION_PARISHES = () =>
    `${EnvManager.SETTINGS_URL}/api/location/parishes`;

export const GET_LOCATION_CANTONS = () =>
    `${EnvManager.SETTINGS_URL}/api/location/cantons`;
//#endregion

//#region HOLIDAY
export const GET_HOLIDAY = () =>
    `${EnvManager.SETTINGS_URL}/api/holiday`;

export const PUT_HOLIDAY = () =>
    `${EnvManager.SETTINGS_URL}/api/holiday`;

export const POST_HOLIDAY_BY_YEAR = (year: number) =>
    `${EnvManager.SETTINGS_URL}/api/holiday/${year}`;

export const POST_HOLIDAY = () =>
    `${EnvManager.SETTINGS_URL}/api/holiday`;

export const DELETE_HOLIDAY = () =>
    `${EnvManager.SETTINGS_URL}/api/holiday`;

export const GET_HOLIDAY_BY_NAME = (name: string) =>
    `${EnvManager.SETTINGS_URL}/api/holiday/name/${name}`;

export const GET_HOLIDAY_BY_DATE = (date: string) =>
    `${EnvManager.SETTINGS_URL}/api/holiday/date/${date}`;

export const GET_HOLIDAY_BY_CODE = (code: string) =>
    `${EnvManager.SETTINGS_URL}/api/holiday/code/${code}`;
//#endregion

//#region BRANCH
export const GET_BRANCH_BY_NAME = (name: string) =>
    `${EnvManager.SETTINGS_URL}/api/branch/name/${name}`;

export const PUT_BRANCH_BY_NAME = (name: string) =>
    `${EnvManager.SETTINGS_URL}/api/branch/name/${name}`;

export const DELETE_BRANCH_BY_NAME = (name: string) =>
    `${EnvManager.SETTINGS_URL}/api/branch/name/${name}`;

export const GET_BRANCH = () =>
    `${EnvManager.SETTINGS_URL}/api/branch`;

export const POST_BRANCH = () =>
    `${EnvManager.SETTINGS_URL}/api/branch`;

export const GET_BRANCH_NAME_LIKE = (name: string) =>
    `${EnvManager.SETTINGS_URL}/api/branch/name/like/${name}`;
//#endregion

//#region BANK-ENTITY
export const GET_BANK_ENTITY = () =>
    `${EnvManager.SETTINGS_URL}/api/bank-entity`;

export const PUT_BANK_ENTITY = () =>
    `${EnvManager.SETTINGS_URL}/api/bank-entity`;

export const POST_BANK_ENTITY = () =>
    `${EnvManager.SETTINGS_URL}/api/bank-entity`;
//#endregion