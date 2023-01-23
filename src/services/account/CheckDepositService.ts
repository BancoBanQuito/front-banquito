import axios from "axios";
import { CheckDepositPost } from "./model/CheckDepositPost";
import { POST_ACCOUNT_API } from "../../config/API";

export class CheckDepositService {
    public static async postEfectiveDeposit(checkDeposit: CheckDepositPost) {
        try {
            return await axios.post(POST_ACCOUNT_API(), checkDeposit);
        } catch (error) {
            throw error;
        }
    }
}