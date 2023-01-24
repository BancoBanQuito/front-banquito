import axios from "axios";
import { RQAccountAssociatedService } from "./dto/RQAccountAssociatedService";
import { ResponseFormat } from "../ResponseFormat";
import { RSAccountAssociatedService } from "./dto/RSAccountAssociatedService";

export class AccountAssociatedService {
    public static async postAccount(body: RQAccountAssociatedService) {
        try {
            // return await axios.post<ResponseFormat<RSAccountAssociatedService[]>>();
        } catch (error) {
            throw error;
        }
    }
}