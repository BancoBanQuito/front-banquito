import axios from "axios";
import { ResponseFormat } from "../ResponseFormat";
import { InterestInvestment } from "./model/InterestInvestment";
import { GET_INTEREST_FROM_TO_API } from "../../config/API";

export class InterestSavingAccountService {
    public static async getInterestSavingAccount(codeLocalAccount: string, from: string, to: string) {
        try {
            return await axios.get<ResponseFormat<InterestInvestment[]>>(GET_INTEREST_FROM_TO_API(codeLocalAccount, from, to));
        } catch (error) {
            throw error;
        }
    }
}