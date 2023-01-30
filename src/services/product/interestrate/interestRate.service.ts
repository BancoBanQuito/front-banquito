import axios from 'axios';
import EnvManager from '../../../config/EnvManager';
import IInterestRate from '../models/interestRate.model';
import SelectInterestRate from '../models/interestRate.model';
import IInterestRateValue from '../models/interestRate.model';
import IInterestRateAdd from '../models/interestRate.model';
import IInterestRateStatus from '../models/interestRate.model';

const baseUrl = `${EnvManager.PRODUCT_URL}/api/interest-rate`;

export default class InterestRateService {
    public static async getInterestRates(): Promise<IInterestRate[]> {
        const response = await axios.get(baseUrl);
        return response.data;
    }

    public static async getInterestRatesByName(name: string): Promise<IInterestRate[]> {
        const response = await axios.get(`${baseUrl}/name/${name}`);
        return response.data;
    }

    public static async getInterestRateAll(): Promise<SelectInterestRate[]> {
        return await axios.get(`${baseUrl}/all`).then(response => response.data);
    }

    public static async addInterestRateValue(IInterestRateValue: IInterestRateValue): Promise<any> {
        return await axios.post(`${baseUrl}/add-interest-rate-log`, IInterestRateValue).then(response => response);
    }

    public static async addInterestRate(IInterestRateAdd: IInterestRateAdd): Promise<any> {
        return await axios.post(baseUrl, IInterestRateAdd).then(response => response);
    }

    public static async updateInterestRateStatus(IInterestRateStatus: IInterestRateStatus): Promise<any> {
        return await axios.put(`${baseUrl}/update-status`, IInterestRateStatus).then(response => response);
    }

}
