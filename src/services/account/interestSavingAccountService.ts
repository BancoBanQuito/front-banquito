import axios from "axios";
import { GET_ACCOUNT_CONTROLLER_API, GET_INTEREST_CONTROLLER_API, GET_INVESTMENT_INTEREST_CONTROLLER_API } from "../../config/API";
import { ResponseFormat } from "./ResponseFormat";
import { InterestSavingAccount } from "./model/InterestSavingAccount";

export class InterestSavingAccountService {
    public static async getInterestSavingAccount(codeLocalAccount: string, from: string, to: string) {
        try {
            return await axios.get<ResponseFormat<InterestSavingAccount[]>>(GET_INTEREST_CONTROLLER_API(codeLocalAccount, from, to));
        } catch (error) {
            throw error;
        }
    }
}