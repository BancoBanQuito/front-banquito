import axios from "axios";
import { GET_PRODUCT_TYPE, GET_PRODUCT_TYPES, POST_PRODUCT_TYPES } from "../../config/apis/productAPI";
import { ProductTypeRS } from "./dto/ProductTypeRS";
import { ProductTypeRQ } from "./dto/ProductTypeRQ";

export class ProductTypeService {

    public static async getProductTypes() {
        try {
            return (await axios.get<ProductTypeRS[]>(GET_PRODUCT_TYPES())).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postProductTypes(body: ProductTypeRQ) {
        try {
            return (await axios.post<string>(POST_PRODUCT_TYPES(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getProductType() {
        try {
            return (await axios.get<ProductTypeRS>(GET_PRODUCT_TYPE())).data;
        } catch (error: any) {
            throw error;
        }
    }
}