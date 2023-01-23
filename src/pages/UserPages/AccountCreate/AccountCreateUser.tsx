import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ColorPalette } from '../../../style/ColorPalette';
import { ProductService } from '../../../services/product/productService';
import { AccountService } from '../../../services/account/accountService';
import { Avatar, Card, CardContent } from '@mui/material';
import StripeAtom from '../../../components/atoms/StripeAtom';
import BanQuitoLogo from '../../../assets/BanQuito-Logo.svg'
import AccountFormBank from '../../../components/organisms/AccountFormBank';

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
            navigate('/cliente', { replace: true });
        } catch (error) {
            console.log("Something went wrong");
        }

    }

    const saveAccount = async (data: any) => {
        await AccountService.createAccount(data);
    }
    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%",
                height: "90vh"
            }}>
                <StripeAtom x={'calc(73% - 5px/2)'} y={'0'} width={'5px'} height={'100%'} color={ColorPalette.PRIMARY} />
                <StripeAtom x={'calc(72% - 10px/2)'} y={'0'} width={'10px'} height={'100%'} color={'#EEEEEE'} />
                <StripeAtom x={'calc(70% - 20px/2)'} y={'0'} width={'20px'} height={'100%'} color={ColorPalette.SECONDARY} />

                <StripeAtom x={'calc(50% - 250px/2)'} y={'0'} width={'250px'} height={'100%'} color={'#D9D9D9'} />

                <StripeAtom x={'calc(30% - 20px/2)'} y={'0'} width={'20px'} height={'100%'} color={ColorPalette.SECONDARY} />
                <StripeAtom x={'calc(28% - 10px/2)'} y={'0'} width={'10px'} height={'100%'} color={'#EEEEEE'} />
                <StripeAtom x={'calc(27% - 5px/2)'} y={'0'} width={'5px'} height={'100%'} color={ColorPalette.PRIMARY} />
                <Card variant="elevation"
                    elevation={10}
                    sx={{
                        width: 500,
                        borderRadius: 5,
                        position: 'relative'
                    }}>
                    <CardContent>
                        <AccountFormBank
                            onSubmit={handleSubmit}
                            products={products ? products : []} />
                    </CardContent>
                    <div style={{ margin: '0.5rem', position: 'absolute', bottom: 0, right: 0 }}>
                        <Avatar src={BanQuitoLogo} variant="square" />
                    </div>
                </Card>
            </div>
        </>
    )
}

export default AccountCreateUser