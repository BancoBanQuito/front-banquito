import axios from "axios";
import { POST_TRANSACTION_API } from "../../config/API";
import { CheckDepositPost } from "./model/CheckDepositPost";

export class CheckDepositService {
    public static async postEfectiveDeposit(checkDeposit: CheckDepositPost) {
        try {
            return await axios.post(POST_TRANSACTION_API(), checkDeposit);
        } catch (error) {
            throw error;
        }
    }
}