import axios from "axios";
import { GET_ACCOUNT_CONTROLLER_API, GET_INVESTMENT_INTEREST_CONTROLLER_API } from "../../config/API";
import { ResponseFormat } from "./ResponseFormat";
import { InterestInvestmentPolicies } from "./model/InterestInvestmentPolicies";

export class InterestInvestmentPoliciesService {
    public static async getInterestInvestment(codeLocalAccount: string, days: number, capital: number, ear: number) {
        try {
            return await axios.get<ResponseFormat<InterestInvestmentPolicies[]>>(GET_INVESTMENT_INTEREST_CONTROLLER_API(codeLocalAccount, days, capital, ear));
        } catch (error) {
            throw error;
        }
    }
}