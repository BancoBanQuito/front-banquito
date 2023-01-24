import axios from "axios";
import { ConsolidatedPositionGet } from "./model/ConsolidatedPositionGet";
import { ResponseFormat } from "../ResponseFormat";
import { GET_ACCOUNT_ID_API } from "../../config/API";

export class ConsolidatedPositionService {
    public static async getConsolidatedPosition(typeIdentification: string, identification: string) {
        try {
            return await axios.get<ResponseFormat<ConsolidatedPositionGet[]>>(GET_ACCOUNT_ID_API(typeIdentification, identification));
        } catch (error) {
            throw error;
        }
    }
}