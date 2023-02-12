import axios from "axios";
import { DELETE_HOLIDAY, GET_HOLIDAY, GET_HOLIDAY_BY_CODE, GET_HOLIDAY_BY_DATE, GET_HOLIDAY_BY_NAME, POST_HOLIDAY, POST_HOLIDAY_BY_YEAR, PUT_HOLIDAY } from "../../config/apis/settingAPI";
import { HolidayRQ } from "./dto/HolidayRQ";

export class HolidayService {
    public static async getHoliday() {
        try {
            return (await axios.get<any>(GET_HOLIDAY())).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async putHoliday(body: HolidayRQ) {
        try {
            return (await axios.put<any>(PUT_HOLIDAY(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postHolidayByYear(year: number) {
        try {
            return (await axios.post<any>(POST_HOLIDAY_BY_YEAR(year), {})).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postHoliday(body: HolidayRQ) {
        try {
            return (await axios.post<any>(POST_HOLIDAY(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async deleteHoliday() {
        try {
            return (await axios.delete<any>(DELETE_HOLIDAY())).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getHolidayByName(name: string) {
        try {
            return (await axios.get<any>(GET_HOLIDAY_BY_NAME(name))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getHolidayByDate(date: string) {
        try {
            return (await axios.get<any>(GET_HOLIDAY_BY_DATE(date))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getHolidayByCode(code: string) {
        try {
            return (await axios.get<any>(GET_HOLIDAY_BY_CODE(code))).data;
        } catch (error: any) {
            throw error;
        }
    }
}