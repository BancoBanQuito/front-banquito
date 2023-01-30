import axios from 'axios';
import IAssociatedServices from '../models/asociatedServices.model';

const baseUrl = 'http://localhost:8087/api/request-service';

export default class RequestServiceService {
    public static async getRequestServices(): Promise<IAssociatedServices[]> {
        const response = await axios.get(baseUrl);
        return response.data;
    }

}