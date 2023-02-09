import axios from "axios";
import { GET_ASSOCIATED_SERVICE_PARAM_BY_CODE, POST_ASSOCIATED_SERVICE_PARAM_ADD_PARAM, POST_ASSOCIATED_SERVICE_PARAM_ADD_PARAM_ACCOUNT, PUT_ASSOCIATED_SERVICE_PARAM } from "../../config/apis/productAPI";
import { AssociatedService } from "./associatedService.service";

export class AssociatedServiceParam {

    public static async putAssociatedServiceParam(code: string, name: string, body: AssociatedServiceParam) {
        try {
            return (await axios.put<string>(PUT_ASSOCIATED_SERVICE_PARAM(code, name), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postAssociatedServiceParam(id: string, body: AssociatedServiceParam) {
        try {
            return (await axios.post<string>(POST_ASSOCIATED_SERVICE_PARAM_ADD_PARAM(id), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postAssociatedServiceParamAccount(id: string, body: AssociatedServiceParam) {
        try {
            return (await axios.post<string>(POST_ASSOCIATED_SERVICE_PARAM_ADD_PARAM_ACCOUNT(id), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getAssociatedServiceParamByCode(code: string) {
        try {
            return (await axios.get<AssociatedService>(GET_ASSOCIATED_SERVICE_PARAM_BY_CODE(code))).data;
        } catch (error: any) {
            throw error;
        }
    }
}