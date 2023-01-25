import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Card, CardContent } from '@mui/material';
import StripeAtom from '/src/components/atoms/StripeAtom';
import AccountFormBank from '/src/components/organisms/Account/AccountFormBank';
import ErrorModalOrganism from '/src/components/organisms/ErrorModalOrganism';
import LoadOrganism from '/src/components/organisms/LoadOrganism';
import { AccountService } from '/src/services/account/AccountService';
import { RQCreateAccount } from '/src/services/account/dto/RQCreateAccount';
import { ProductService } from '/src/services/product/productService';
import { ColorPalette } from '/src/style/ColorPalette';
import BanQuitoLogo from '/src/assets/BanQuito-Logo.svg';


const AccountCreateUser = () => {
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [products, setproducts] = useState<any[] | undefined>([]);
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [accountData, setaccountData] = useState<RQCreateAccount>();

    const navigate = useNavigate();

    useEffect(() => {
        getProducts("6c24027751bc43c5b232242e307880a7");
        return () => { }
    })


    const getProducts = async (id: string) => {
        const productsAsync = await ProductService.getProducts(id);
        setproducts(productsAsync);
    }

    const handleSubmit = (data: any) => {
        const account: RQCreateAccount = {
            ...data,
            codeProductType: "2"
        };
        setaccountData(account);
        saveAccount(account);

    }

    const saveAccount = async (data: RQCreateAccount) => {
        setisLoading(true);
        try {
            await AccountService.postAccount(data);
        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
        } finally {
            setisLoading(false);
        }
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
            <LoadOrganism active={isLoading} />
            <ErrorModalOrganism
                active={activeErrorModal}
                onDeactive={() => { setactiveErrorModal(false); navigate('/cliente') }}
                text={`${errorMessage}. ¿Desea volver a intentar?`}
                enableButtonBox
                onConfirm={() => saveAccount(accountData as RQCreateAccount)}
                onReject={() => navigate('/cliente')}
            />
        </>
    )
}

export default AccountCreateUser