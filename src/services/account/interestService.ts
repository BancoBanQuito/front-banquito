import axios from "axios";
// import { GET_ACCOUNT_CONTROLLER_API, GET_INVESTMENT_INTEREST_CONTROLLER_API, POST_INTEREST_API } from "../../config/API";
import { ResponseFormat } from "../ResponseFormat";
import { InterestPost } from "./model/InterestPost";
import { GET_INTEREST_FROM_TO_API, GET_INTEREST_INVESTMENT_API, POST_INTEREST_API } from "../../config/API";
import { InterestSavingsAccount } from "./model/InterestSavingsAccount";
import { InterestInvestment } from "./model/InterestInvestment";
// import { InterestInvestmentPolicies, InterestPost } from "./model/InterestPost";

export class InterestService {

    public static async postInterest(body: InterestPost) {
        try {
            return await axios.post(POST_INTEREST_API(), body);
        } catch (error) {
            throw error;
        }
    }

    public static async getInterest(codeLocalAccount: string, from: Date, to: Date) {
        try {
            return await axios.get<ResponseFormat<InterestSavingsAccount[]>>(GET_INTEREST_FROM_TO_API(codeLocalAccount, from.toISOString(), to.toISOString()));
        } catch (error) {
            throw error;
        }
    }

    public static async getInterestInvestment(codeLocalAccount: string, days: number, capital: number, ear: number) {
        try {
            return await axios.get<ResponseFormat<InterestInvestment>>(GET_INTEREST_INVESTMENT_API(codeLocalAccount, days, capital, ear));
        } catch (error) {
            throw error;
        }
    }
}