import axios from 'axios';
import IAssociatedServices from '../models/asociatedServices.model';
import EnvManager from '../../../config/EnvManager'

const baseUrl = `${EnvManager.PRODUCT_URL}/api/request-service`;

export default class RequestServiceService {
    public static async getRequestServices(): Promise<IAssociatedServices[]> {
        const response = await axios.get(baseUrl);
        return response.data;
    }

}
