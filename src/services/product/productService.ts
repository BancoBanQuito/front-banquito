import productJSON from './product.json';

export class ProductService {
    public static async getProducts(id: string) {
        const productType = productJSON.find(product => product.codeProductType === id);
        return productType?.products;
    }
}