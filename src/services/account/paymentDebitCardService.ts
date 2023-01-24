import axios from "axios";
import { ResponseFormat } from "../ResponseFormat";
import { PaymentDebitCard } from "./model/PaymentDebitCard";
import { GET_INTEREST_FROM_TO_API } from "../../config/API";

export class PaymentDebitCardService {
    public static async getPaymentDebitCard(codeLocalAccount: string, from: string, to: string) {
        try {
            return await axios.get<ResponseFormat<PaymentDebitCard[]>>(GET_INTEREST_FROM_TO_API(codeLocalAccount, from, to));
        } catch (error) {
            throw error;
        }
    }
}