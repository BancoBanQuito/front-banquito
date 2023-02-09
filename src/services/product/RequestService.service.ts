import axios from "axios";
import { GET_REQUEST_SERVICE, GET_REQUEST_SERVICE_BY_CODE, POST_REQUEST_SERVICE, PUT_REQUEST_SERVICE } from "../../config/apis/productAPI";

export class RequestService {
    public static async putRequestService(codeRequest: string, status: string) {
        try {
            return (await axios.put<string>(PUT_REQUEST_SERVICE(codeRequest, status))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getRequestService() {
        try {
            return (await axios.get<RequestService[]>(GET_REQUEST_SERVICE())).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postRequestService(body: RequestServiceRQ) {
        try {
            return (await axios.post<RequestService>(POST_REQUEST_SERVICE(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getRequestServiceByCode(codeRequest: string) {
        try {
            return (await axios.get<RequestService>(GET_REQUEST_SERVICE_BY_CODE(codeRequest))).data;
        } catch (error: any) {
            throw error;
        }
    }
}