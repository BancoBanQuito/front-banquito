import axios from "axios";
import { EfectiveDepositPost } from "./model/EfectiveDepositPost";
import { POST_TRANSACTION } from "../../config/API";

export class EfectiveDepositService {
    public static async postEfectiveDeposit(efectiveDeposit: EfectiveDepositPost) {
        try {
            return await axios.post(POST_TRANSACTION(), efectiveDeposit);
        } catch (error) {
            throw error;
        }
    }
}