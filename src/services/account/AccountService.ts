import axios from "axios";
import { PUT_ACCOUNT_STATUS_API, PUT_ACCOUNT_BALANCE_API, POST_ACCOUNT_API, GET_ACCOUNT_ID_API, GET_ACCOUNT_CODE_API, GET_ACCOUNT_PRODUCT_API } from "../../config/apis/accountAPI";
import { ResponseFormat } from "../ResponseFormat";
import { RQAccountBalance } from "./dto/RQAccountBalance";
import { RSProductTypeAndClientName } from "./dto/RSProductTypeAndClientName";
import { RQAccountStatus } from "./dto/RQAccountStatus";
import { RQCreateAccount } from "./dto/RQCreateAccount";
import { RSAccount } from "./dto/RSAccount";
import { RSCreateAccount } from "./dto/RSCreateAccount";

export class AccountService {

    public static async putAccountStatus(codeLocalAccount: string, body: RQAccountStatus) {
        try {
            return await axios.put<ResponseFormat<string>>(PUT_ACCOUNT_STATUS_API(codeLocalAccount), body);
        } catch (error) {
            throw error;
        }
    }

    public static async putAccountBalance(codeLocalAccount: string, body: RQAccountBalance) {
        try {
            return await axios.put<ResponseFormat<string>>(PUT_ACCOUNT_BALANCE_API(codeLocalAccount), body);
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

    public static async getAccountByCode(codeLocalAccount: string) {
        try {
            return await axios.get<ResponseFormat<RSAccount>>(GET_ACCOUNT_CODE_API(codeLocalAccount));
        } catch (error) {
            throw error;
        }
    }

    public static async getAccountProductByCode(codeLocalAccount: string) {
        try {
            return await axios.get<ResponseFormat<RSProductTypeAndClientName>>(GET_ACCOUNT_PRODUCT_API(codeLocalAccount));
        } catch (error) {
            throw error;
        }
    }
}