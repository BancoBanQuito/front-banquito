import axios from "axios";
import { AccountStament } from "./model/AccountStatement";
import { ResponseFormat } from "../ResponseFormat";
import { GET_ACCOUNT_STATEMENT_CURRENT_API, GET_ACCOUNT_STATEMENT_HISTORIC_API, GET_ACCOUNT_STATEMENT_LIST_API } from "../../config/API";

export class AccountStatementService {

    public static async getStatementList(codeLocalAccount: string, codeInternationalAccount: string) {
        try {
            return await axios
                .get<ResponseFormat<AccountStament[]>>(GET_ACCOUNT_STATEMENT_LIST_API(codeLocalAccount, codeInternationalAccount));
        } catch (error) {
            throw error;
        }
    }

    public static async getStatementCurrent(codeLocalAccount: string) {
        try {
            return await axios
                .get<ResponseFormat<AccountStament>>(GET_ACCOUNT_STATEMENT_CURRENT_API(codeLocalAccount, ''));
        } catch (error) {
            throw error;
        }
    }

    public static async getStatementHistoric(codeAccountStamentLog: string) {
        try {
            return await axios.get<ResponseFormat<AccountStament>>(GET_ACCOUNT_STATEMENT_HISTORIC_API(codeAccountStamentLog));
        } catch (error) {
            throw error;
        }
    }

}