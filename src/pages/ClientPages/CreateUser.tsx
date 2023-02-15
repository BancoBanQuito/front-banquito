import { AlertColor, Box, Card, CardContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateUserForm from '../../components/organisms/Login/CreateUserForm'
import ProgressButtonMolecule from '../../components/molecules/ProgressButtonMolecule'
import { ColorPalette } from '../../style/ColorPalette'
import { UserRQ } from '../../services/client/dto/UserRQ'
import SnackBarMolecule from '../../components/molecules/SnackBarMolecule'
import LoadOrganism from '../../components/organisms/LoadOrganism'
import { ClientService } from '../../services/client/ClientService.service'
import { ProductService } from '../../services/product/productService'
import AccountFormBank from '../../components/organisms/Account/AccountFormBank'
import { RQCreateAccount } from '../../services/account/dto/RQCreateAccount'
import { AccountService } from '../../services/account/AccountService'
import { useNavigate } from 'react-router-dom'
import { CIUtils } from '../../utils/CIUtils'
import moment from 'moment'

const entityBankCode = 'aef0fadf647c8d6f';
const internationalBankCode = 'c88c1afde4c3a564';
const codeBranch = '252';

const CreateUser = () => {

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [messageLoading, setmessageLoading] = useState<string | undefined>();

    const [openSnack, setopenSnack] = useState<boolean>(false)
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const [products, setproducts] = useState<any[] | undefined>([]);

    const [identification, setidentification] = useState<string | undefined>();
    const [identificationType, setidentificationType] = useState<string | undefined>();

    const navigate = useNavigate();

    useEffect(() => {
        retriveAllProducts("6c24027751bc43c5b232242e307880a7");
        return () => { }
    }, [])


    const retriveAllProducts = async (id: string) => {
        setisLoading(true);
        const productsAsync = await ProductService.getProducts(id);
        setproducts(productsAsync);
        setisLoading(false);
    }

    const handleUserSubmit = async (user: UserRQ) => {
        if(!CIUtils.checkIdentification(user.identification)) {
            setmessageSnack("Cedula incorrecta");
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
            return;
        }
        console.log(user);
        setisLoading(true);
        try {
            await ClientService.postClientSignUp(user);
            setidentification(user.identification);
            setidentificationType(user.identificationType);
            setCurrentIndex(1);
        } catch (error: any) {
            setmessageSnack(error.message);
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const handleAccountSubmit = async (data: any) => {
        setisLoading(true);
        try {
            const account: RQCreateAccount = {
                ...data,
                entityBankCode: entityBankCode,
                internationalBankCode: internationalBankCode,
                codeBranch: codeBranch,
                codeProductType: "6c24027751bc43c5b232242e307880a7",
            };
            await AccountService.postAccount(account);
            navigate('/cliente/login');

        } catch (error: any) {
            setmessageSnack(error.message);
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%'
                }}
                bgcolor='#f5f6f7'>
                <div
                    style={{
                        position: 'absolute',
                        top: 0
                    }}>
                    <ProgressButtonMolecule
                        color={ColorPalette.PRIMARY}
                        itemsCount={2}
                        spotSize={15}
                        current={currentIndex} />
                </div>
                <Card sx={{
                    width: '100%',
                    maxWidth: 500,
                    padding: '1rem'
                }}
                    variant='outlined'>
                    <CardContent>
                        {currentIndex === 0 && <CreateUserForm
                            title='Creemos tu nueva cuenta'
                            onSubmit={(value) => {
                                handleUserSubmit({
                                    email: value.email,
                                    identification: value.identification,
                                    identificationType: value.identificationType,
                                    user: {
                                        userName: value.username,
                                        password: value.password,
                                        type: "client",
                                        status: "INA",
                                        //2023-01-30T02:44:20.618Z
                                        creationDate: moment(new Date()).format("YYYY-MM-DDThh:mm:ss"),
                                        lastLoginDate: moment(new Date()).format("YYYY-MM-DDThh:mm:ss")
                                    }
                                })
                            }} />}
                        {
                            currentIndex === 1 && <AccountFormBank
                                onSubmit={handleAccountSubmit}
                                products={products ? products : []}
                                identification={identification}
                                identificationType={identificationType} />
                        }
                    </CardContent>
                </Card>
            </Box>
            <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                onClose={() => { setopenSnack(false) }}
                autoHideDuration={3000}
                title={titleSnack}
                severity={colorSnack} />
            <LoadOrganism
                active={isLoading}
                text={messageLoading} />
        </>
    )
}

export default CreateUser