import axios from "axios";
import { GET_CLIENT_BY_EMAIL, POST_CLIENT_LOGIN } from "../../config/apis/clientAPI";
import { RSClientEmail } from "./model/RSClientEmail";

export class ClientService {
    public static async logClient(username: string, password: string) {
        try {
            return axios.post(POST_CLIENT_LOGIN(), { userName: username, password: password });
        } catch (error: any) {
            throw error;
        }
    }

    public static async getClientByEmail(email: string) {
        try {
            return axios.get<RSClientEmail>(GET_CLIENT_BY_EMAIL(email));
        } catch (error: any) {
            throw error;
        }
    }
}
