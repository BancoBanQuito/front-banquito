import axios from "axios";
import { DELETE_LOCATION_CANTON_BY_NAME, DELETE_LOCATION_PARISH_BY_NAME, DELETE_LOCATION_PROVINCE_BY_NAME, GET_LOCATION, GET_LOCATION_BY_PROVINCE_CANTON_PARISH, GET_LOCATION_CANTONS, GET_LOCATION_CANTON_BY_NAME, GET_LOCATION_PARISHES, GET_LOCATION_PARISH_BY_NAME, GET_LOCATION_PROVINCES, GET_LOCATION_PROVINCE_BY_NAME, POST_LOCATION_CANTON, POST_LOCATION_PARISH, POST_LOCATION_PROVINCE, PUT_LOCATION_CANTON_BY_NAME, PUT_LOCATION_PARISH_BY_NAME, PUT_LOCATION_PROVINCE_BY_NAME } from "../../config/apis/settingAPI";
import { AdditionalProps } from "./dto/AdditionalProps";
import { ProvinceRSRQ } from "./dto/ProvinceRSRQ";
import { ParishRSRQ } from "./dto/ParishRSRQ";
import { CantonRSRQ } from "./dto/CantonRSRQ";

export class LocationService {

    public static async getLocationProvinceByName(name: string) {
        try {
            return (await axios.get<ProvinceRSRQ>(GET_LOCATION_PROVINCE_BY_NAME(name))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async putLocationProvinceByName(name: string, body: AdditionalProps) {
        try {
            return (await axios.put<any>(PUT_LOCATION_PROVINCE_BY_NAME(name), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async deleteLocationProvinceByName(name: string) {
        try {
            return (await axios.delete<any>(DELETE_LOCATION_PROVINCE_BY_NAME(name))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getLocationParishByName(name: string) {
        try {
            return (await axios.get<ParishRSRQ>(GET_LOCATION_PARISH_BY_NAME(name))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async putLocationParishByName(name: string, body: AdditionalProps) {
        try {
            return (await axios.put<any>(PUT_LOCATION_PARISH_BY_NAME(name))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async deleteLocationParishByName(name: string) {
        try {
            return (await axios.delete<any>(DELETE_LOCATION_PARISH_BY_NAME(name))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getLocationCantonByName(name: string) {
        try {
            return (await axios.get<CantonRSRQ>(GET_LOCATION_CANTON_BY_NAME(name))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async putLocationCantonByName(name: string, body: AdditionalProps) {
        try {
            return (await axios.put<any>(PUT_LOCATION_CANTON_BY_NAME(name), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async deleteLocationCantonByName(name: string) {
        try {
            return (await axios.delete<any>(DELETE_LOCATION_CANTON_BY_NAME(name))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postLocationProvince(body: AdditionalProps) {
        try {
            return (await axios.post<any>(POST_LOCATION_PROVINCE(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postLocationParish(body: AdditionalProps) {
        try {
            return (await axios.post<any>(POST_LOCATION_PARISH(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postLocationCanton(body: AdditionalProps) {
        try {
            return (await axios.post<any>(POST_LOCATION_CANTON(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }


    public static async getLocations() {
        try {
            return (await axios.get<any>(GET_LOCATION())).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getLocationProvinces() {
        try {
            return (await axios.get<ProvinceRSRQ[]>(GET_LOCATION_PROVINCES())).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getLocationByProvinceAndCantonAndParish(province: string, canton: string, parish: string) {
        try {
            return (await axios.get<any>(GET_LOCATION_BY_PROVINCE_CANTON_PARISH(province, canton, parish))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getLocationParishes() {
        try {
            return (await axios.get<ParishRSRQ[]>(GET_LOCATION_PARISHES())).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getLocationCantons() {
        try {
            return (await axios.get<CantonRSRQ[]>(GET_LOCATION_CANTONS())).data;
        } catch (error: any) {
            throw error;
        }
    }
}