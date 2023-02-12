import axios from "axios";
import { AdditionalProps } from "./dto/AdditionalProps";
import { GET_ASSOCIATED_SERVICES, GET_ASSOCIATED_SERVICE_BY_SERVICE_NAME, POST_ASSOCIATED_SERVICE, PUT_ASSOCIATED_SERVICE } from "../../config/apis/productAPI";
import { AssociatedServiceParamRSRQ } from "./dto/AssociatedServiceParamRSRQ";

export class AssociatedService {

    public static async putAssociatedService(body: AdditionalProps) {
        try {
            return (await axios.put<string>(PUT_ASSOCIATED_SERVICE(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postAssociatedService(body: AssociatedService) {
        try {
            return (await axios.post<string>(POST_ASSOCIATED_SERVICE(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getAssociatedServiceParams(associatedServiceName: string) {
        try {
            return (await axios.get<AssociatedServiceParamRSRQ[]>(GET_ASSOCIATED_SERVICE_BY_SERVICE_NAME(associatedServiceName))).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getAssociatedServices() {
        try {
            return (await axios.get<AssociatedService[]>(GET_ASSOCIATED_SERVICES())).data;
        } catch (error: any) {
            throw error;
        }
    }

}