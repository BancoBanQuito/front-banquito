import axios from "axios";
import { RQAccountAssociatedService } from "./dto/RQAccountAssociatedService";

export class AccountAssociatedService {
    public static async postAccount(body: RQAccountAssociatedService) {
        try {
            // return await axios.post<ResponseFormat<RSAccountAssociatedService[]>>();
        } catch (error) {
            throw error;
        }
    }
}