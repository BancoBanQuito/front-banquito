import axios from "axios";
import { PUT_ACCOUNT_STATUS_API, PUT_ACCOUNT_BALANCE_API, POST_ACCOUNT_API, GET_ACCOUNT_ID_API, GET_ACCOUNT_CODE_API, GET_ACCOUNT_SIMPLE_API } from "src/config/apis/accountAPI";
import { ResponseFormat } from "../ResponseFormat";
import { RQCreateAccount } from "./dto/RQCreateAccount";
import { RSAccount } from "./dto/RSAccount";
import { RSAccountSimple } from "./dto/RSAccountSimple";
import { RSCreateAccount } from "./dto/RSCreateAccount";

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

    public static async postAccount(account: RQCreateAccount) {
        try {
            return await axios.post<ResponseFormat<RSCreateAccount>>(POST_ACCOUNT_API(), account);
        } catch (error) {
            throw error;
        }
    }

    public static async getAccountsById(identificationType: string, identification: string) {
        try {
            return await axios.get<ResponseFormat<RSAccount[]>>(GET_ACCOUNT_ID_API(identificationType, identification));
        } catch (error) {
            throw error;
        }
    }

    public static async getAccountByCode(codeLocalAccount: string, codeInternationalAccount: string) {
        try {
            return await axios.get<ResponseFormat<RSAccount>>(GET_ACCOUNT_CODE_API(codeLocalAccount, codeInternationalAccount));
        } catch (error) {
            throw error;
        }
    }

    public static async getAccountSimple(codeLocalAccount: string) {
        try {
            return await axios.get<ResponseFormat<RSAccountSimple>>(GET_ACCOUNT_SIMPLE_API(codeLocalAccount));
        } catch (error) {
            throw error;
        }
    }
}