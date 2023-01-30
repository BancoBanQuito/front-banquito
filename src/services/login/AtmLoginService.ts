import axios from "axios";
import { GET_ATM_CREDENTIALS } from "../../config/apis/atmAPI";
import { RSAtmLogin } from "./dto/RSAtmLogin";

export class AtmLoginService {

    public static async getLoginCredentials(identification: string) {
        try {
            return await axios.get<RSAtmLogin>(GET_ATM_CREDENTIALS(identification));
        } catch (error) {
            throw error;
        }
    }
}