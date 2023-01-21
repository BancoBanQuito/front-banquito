import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ProductService } from '../services/product/productService';
import { AccountService } from '../services/account/accountService';
import AccountFormBank from '../components/organisms/AccountFormBank';

const AccountCreateUser = () => {
    const [products, setproducts] = useState<any[] | undefined>([]);

    const navigate = useNavigate();

    useEffect(() => {
        getProducts("2");
        return () => { }
    })


    const getProducts = async (id: string) => {
        const productsAsync = await ProductService.getProducts(id);
        setproducts(productsAsync);
    }

    const handleSubmit = (data: any) => {
        const account = {
            ...data,
            codeProductType: "2"
        }
        try {
            saveAccount(account);
            navigate('/client', { replace: true });
        } catch (error) {
            console.log("Something went wrong");
        }

    }

    const saveAccount = async (data: any) => {
        await AccountService.createAccount(data);
    }
    return (
        <>
            <AccountFormBank
                onSubmit={handleSubmit}
                products={products ? products : []} />
        </>
    )
}

export default AccountCreateUser