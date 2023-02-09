import axios from "axios";
import { POST_CLIENT_LOGIN } from "../../config/apis/clientAPI";

export class ClientService {
    public static async logClient(username: string, password: string) {
        try {
            return axios.post(POST_CLIENT_LOGIN(), { userName: username, password: password });
        } catch (error: any) {
            throw error;
        }
    }
}