import axios from "axios";
import InterestInvestmentPolicies from "../../pages/InterestInvestmentPolicies";
import { ResponseFormat } from "../ResponseFormat";
import { InterestInvestment } from "./model/InterestInvestment";
import { GET_INTEREST_INVESTMENT_API } from "../../config/API";

export class InterestInvestmentPoliciesService {
    public static async getInterestInvestment(codeLocalAccount: string, days: number, capital: number, ear: number) {
        try {
            return await axios.get<ResponseFormat<InterestInvestment[]>>(GET_INTEREST_INVESTMENT_API(codeLocalAccount, days, capital, ear));
        } catch (error) {
            throw error;
        }
    }
}