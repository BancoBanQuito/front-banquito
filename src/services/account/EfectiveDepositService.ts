import axios from "axios";
import { POST_TRANSACTION_API } from "../../config/API";
import { EfectiveDepositPost } from "./model/EfectiveDepositPost";

export class EfectiveDepositService {
    public static async postEfectiveDeposit(efectiveDeposit: EfectiveDepositPost) {
        try {
            return await axios.post(POST_TRANSACTION_API(), efectiveDeposit);
        } catch (error) {
            throw error;
        }
    }
}