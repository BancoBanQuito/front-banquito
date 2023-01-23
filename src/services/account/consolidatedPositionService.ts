import axios from "axios";
import { GET_ACCOUNT_CONTROLLER_API } from "../../config/API";
import { ResponseFormat } from "./ResponseFormat";
import { ConsolidatedPositionGet } from "./model/ConsolidatedPositionGet";

export class ConsolidatedPositionService {
    public static async getConsolidatedPosition(typeIdentification: string, identification: string) {
        try {
            return await axios.get<ResponseFormat<ConsolidatedPositionGet[]>>(GET_ACCOUNT_CONTROLLER_API(typeIdentification, identification));
        } catch (error) {
            throw error;
        }
    }
}