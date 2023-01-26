
// import { GET_ACCOUNT_CONTROLLER_API, GET_INTEREST_CONTROLLER_API, GET_INVESTMENT_INTEREST_CONTROLLER_API } from "../../config/API";
import { GET_TRANSACTION_FROM_TO_API, POST_TRANSACTION, PUT_TRANSACTION } from "../../config/API";
import { TransactionPost } from "./model/TransactionPost";
import axios from "axios";

export class TransactionService {
    public static async putTransaction(codeUniqueTransaction: string, body: { status: string }) {
        try {
            return await axios.put(PUT_TRANSACTION(codeUniqueTransaction), body);
        } catch (error) {
            throw error;
        }
    }

    public static async postTransaction(body: TransactionPost) {
        try {
            return await axios.post(POST_TRANSACTION(), body);
        } catch (error) {
            throw error;
        }
    }

    public static async getTransaction(codeLocalAccount: string, from: Date, to: Date) {
        try {
            return await axios.get(GET_TRANSACTION_FROM_TO_API(codeLocalAccount, from.toISOString(), to.toISOString()));
        } catch (error) {
            throw error;
        }
    }
}