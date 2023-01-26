import axios from "axios";
import { GET_ACCOUNT_STATEMENT_LIST_API, GET_ACCOUNT_STATEMENT_CURRENT_API, GET_ACCOUNT_STATEMENT_HISTORIC_API } from "/src/config/apis/accountAPI";
import { ResponseFormat } from "../ResponseFormat";
import { RSAccountStatement } from "./dto/RSAccountStatement";
import { RSAccountStatementList } from "./dto/RSAccountStatementList";

export class AccountStatementService {

    public static async getStatementList(codeLocalAccount: string) {
        try {
            return await axios.get<ResponseFormat<RSAccountStatementList[]>>(GET_ACCOUNT_STATEMENT_LIST_API(codeLocalAccount));
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

    public static async getStatementCurrent(codeLocalAccount: string) {
        try {
            return await axios.get<ResponseFormat<RSAccountStatement>>(GET_ACCOUNT_STATEMENT_CURRENT_API(codeLocalAccount));
        } catch (error) {
            throw error;
        }
    }
}