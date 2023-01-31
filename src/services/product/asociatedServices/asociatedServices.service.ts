import axios from 'axios';
import EnvManager from '../../../config/EnvManager';
import IAssociatedServices from '../models/asociatedServices.model';

const baseUrl = `${EnvManager.PRODUCT_URL}/api/request-service`;
const baseUrl2 = `${EnvManager.PRODUCT_URL}/api/associatedServices`;
const baseUrl3 = `${EnvManager.PRODUCT_URL}/api/associatedServiceParam`;

export default class RequestServiceService {
    public static async getRequestServices(): Promise<IAssociatedServices[]> {
        const response = await axios.get(baseUrl);
        return await response.data;
    }

    public static async createParam(param:any,id:string): Promise<any> {
        const response = await axios.post(`${baseUrl3}/addparam/${id}`,param);
        return await response.data;
    }

    public static async getAsociatedServices(): Promise<any> {
        const response = await axios.get(baseUrl2);
        return await response.data;
    }


}