import axios from "axios";
import { AccountPost } from "./model/AccountPost";
import { GET_ACCOUNT_CODE_API, GET_ACCOUNT_ID_API, POST_ACCOUNT_API, PUT_ACCOUNT_BALANCE_API, PUT_ACCOUNT_STATUS_API } from "../../config/API";
import { ResponseFormat } from "../ResponseFormat";
import { ConsolidatedPosition } from "./model/ConsolidatedPosition";


export class AccountService {

    public static async putAccountStatus(codeLocalAccount: string, codeInternationalAccount: string, body: { status: string }) {
        try {
            return await axios.put(PUT_ACCOUNT_STATUS_API(codeLocalAccount, codeInternationalAccount), body);
        } catch (error) {
            throw error;
        }
    }

    public static async putAccountBalance(codeLocalAccount: string, codeInternationalAccount: string, body: { presentBalance: number, availableBalance: number }) {
        try {
            return await axios.put(PUT_ACCOUNT_BALANCE_API(codeLocalAccount, codeInternationalAccount), body);
        } catch (error) {
            throw error;
        }
    }

    public static async postAccount(account: AccountPost) {
        try {
            return await axios.post(POST_ACCOUNT_API(), account);
        } catch (error) {
            throw error;
        }
    }

    public static async getAccountsById(identificationType: string, identification: string) {
        try {
            return await axios.get<ResponseFormat<ConsolidatedPosition[]>>(GET_ACCOUNT_ID_API(identificationType, identification));
        } catch (error) {
            throw error;
        }
    }

    public static async getAccountsByCode(codeLocalAccount: string, codeInternationalAccount: string) {
        try {
            return await axios.get(GET_ACCOUNT_CODE_API(codeLocalAccount, codeInternationalAccount));
        } catch (error) {
            throw error;
        }
    }
}