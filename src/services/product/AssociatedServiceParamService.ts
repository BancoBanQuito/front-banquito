import axios from 'axios';
import { AssociatedService } from './Model/AssociatedService';

export async function  associatedServiceParamService(){

    return await axios.get<AssociatedService[]>("http://localhost:8081/api/product/associatedServices").then(response => response.data);
} 