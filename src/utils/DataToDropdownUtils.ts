import { RSAccount } from "../services/account/dto/RSAccount"
import { ProductRS } from "../services/product/dto/ProductRS"
import { ProductTypeRS } from "../services/product/dto/ProductTypeRS"

export class DataToDropdownUtils {

    public static accountToDropdown(accounts: RSAccount[]) {
        return accounts.map(account => {
            return {
                name: account.codeLocalAccount,
                value: account.codeLocalAccount,
            }
        })
    }

    public static productToDropdow(products: ProductTypeRS[]) {
        const data = products.map(type => {
            return type.products.map(product => {
                return {
                    name: product.name,
                    value: `${type.id}-${product.id}`
                }
            })
        });

        return data.reduce((prev, curr) => prev.concat(curr));
    }
}