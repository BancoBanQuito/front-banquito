import axios from "axios";
import { ResponseFormat } from "../ResponseFormat";
import { RSAccountStatementList } from "./dto/RSAccountStatementList";
import { GET_ACCOUNT_STATEMENT_CURRENT_API, GET_ACCOUNT_STATEMENT_HISTORIC_API, GET_ACCOUNT_STATEMENT_LIST_API } from "../../config/apis/accountAPI";
import { RSAccountStatement } from "./dto/RSAccountStatement";

export class AccountStatementService {

    public static async getStatementList(codeLocalAccount: string, codeInternationalAccount: string) {
        try {
            return await axios.get<ResponseFormat<RSAccountStatementList[]>>(GET_ACCOUNT_STATEMENT_LIST_API(codeLocalAccount, codeInternationalAccount));
        } catch (error) {
            throw error;
        }
    }

    public static async getStatementCurrent(codeLocalAccount: string) {
        try {
            return await axios.get<ResponseFormat<RSAccountStatement>>(GET_ACCOUNT_STATEMENT_CURRENT_API(codeLocalAccount, ''));
        } catch (error) {
            throw error;
        }
    }

    public static async getStatementHistoric(codeAccountStamentLog: string) {
        try {
            return await axios.get<ResponseFormat<RSAccountStatement>>(GET_ACCOUNT_STATEMENT_HISTORIC_API(codeAccountStamentLog));
        } catch (error) {
            throw error;
        }
    }

}