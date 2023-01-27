import axios from "axios";
import { POST_ACCOUNT_ASSOCIATED_SERVICE } from "../../config/apis/accountAPI";
import { RQAccountAssociatedService } from "./dto/RQAccountAssociatedService";

export class AccountAssociatedService {
    public static async postAccount(body: RQAccountAssociatedService) {
        try {
            return await axios.post(POST_ACCOUNT_ASSOCIATED_SERVICE(), body);
        } catch (error) {
            throw error;
        }
    }
}