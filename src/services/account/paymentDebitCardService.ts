import axios from "axios";
import { GET_ACCOUNT_CONTROLLER_API, GET_INTEREST_CONTROLLER_API, GET_INVESTMENT_INTEREST_CONTROLLER_API } from "../../config/API";
import { ResponseFormat } from "../ResponseFormat";
import { PaymentDebitCard } from "./model/PaymentDebitCard";

export class PaymentDebitCardService {
    public static async getPaymentDebitCard(codeLocalAccount: string, from: string, to: string) {
        try {
            return await axios.get<ResponseFormat<PaymentDebitCard[]>>(GET_INTEREST_CONTROLLER_API(codeLocalAccount, from, to));
        } catch (error) {
            throw error;
        }
    }
}