import axios from "axios";
import { GET_BANK_ENTITY, POST_BANK_ENTITY, PUT_BANK_ENTITY } from "../../config/apis/settingAPI";
import { BankEntityRQ } from "./dto/BankEntityRQ";

export class BankEntityService {
    public static async getBankEntity() {
        try {
            return (await axios.get<any>(GET_BANK_ENTITY())).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async putBankEntity(body: BankEntityRQ) {
        try {
            return (await axios.put<string>(PUT_BANK_ENTITY(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postBankEntity(body: BankEntityRQ) {
        try {
            return (await axios.post<string>(POST_BANK_ENTITY(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }
}