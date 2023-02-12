import axios from "axios";
import { GET_PRODUCTS, GET_PRODUCTS_STATUS, GET_PRODUCT_ID, GET_PRODUCT_NAME_PRODUCT, POST_PRODUCTS, PUT_PRODUCTS, PUT_PRODUCTS_LINK } from "../../config/apis/productAPI";
import { ProductRQ } from "./dto/ProductRQ";
import { AdditionalProps } from "./dto/AdditionalProps";
import { ProductRS } from "./dto/ProductRS";

export class ProductService {

    public static async putProduct() {
        try {
            return (await axios.put<string>(PUT_PRODUCTS())).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async postProduct(body: ProductRQ) {
        try {
            return (await axios.post<string>(POST_PRODUCTS(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async putProductAdditionalProps(body: AdditionalProps) {
        try {
            return (await axios.put<string>(PUT_PRODUCTS_LINK(), body)).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getProductByStatus() {
        try {
            return (await axios.get<ProductRS[]>(GET_PRODUCTS_STATUS())).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getProducts() {
        try {
            return (await axios.get<ProductRS[]>(GET_PRODUCTS())).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getProductByName() {
        try {
            return (await axios.get<ProductRS>(GET_PRODUCT_NAME_PRODUCT())).data;
        } catch (error: any) {
            throw error;
        }
    }

    public static async getProductById() {
        try {
            return (await axios.get<ProductRS>(GET_PRODUCT_ID())).data;
        } catch (error: any) {
            throw error;
        }
    }

}