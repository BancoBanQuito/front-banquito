import { AlertColor, Box, Card, CardContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateUserForm from '../../components/organisms/Login/CreateUserForm'
import ProgressButtonMolecule from '../../components/molecules/ProgressButtonMolecule'
import { ColorPalette } from '../../style/ColorPalette'
import { UserRQ } from '../../services/client/dto/UserRQ'
import SnackBarMolecule from '../../components/molecules/SnackBarMolecule'
import LoadOrganism from '../../components/organisms/LoadOrganism'
import { ClientService } from '../../services/client/ClientService.service'
import AccountFormBank from '../../components/organisms/Account/AccountFormBank'
import { RQCreateAccount } from '../../services/account/dto/RQCreateAccount'
import { AccountService } from '../../services/account/AccountService'
import { useNavigate } from 'react-router-dom'
import { CIUtils } from '../../utils/CIUtils'
import moment from 'moment'
import BanQuitoIcon from '../../components/atoms/BanQuitoIcon'
import CreateClientForm from '../../components/organisms/Login/CreateClientForm'
import { NewClientRQ } from '../../services/client/dto/NewClientRQ'
import { ProductTypeService } from '../../services/product/ProductTypeService.service'
import { ProductTypeRS } from '../../services/product/dto/ProductTypeRS'

const CreateUser = () => {

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [messageLoading, setmessageLoading] = useState<string | undefined>();

    const [openSnack, setopenSnack] = useState<boolean>(false)
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const [products, setproducts] = useState<ProductTypeRS>();

    const [identification, setidentification] = useState<string | undefined>();
    const [identificationType, setidentificationType] = useState<string | undefined>();
    const [email, setemail] = useState<string | undefined>();

    const navigate = useNavigate();

    useEffect(() => {
        retriveAllProducts("6c24027751bc43c5b232242e307880a7");
        return () => { }
    }, [])


    const retriveAllProducts = async (id: string) => {
        setisLoading(true);
        try {
            const productsAsync: ProductTypeRS | undefined = (await ProductTypeService.getProductTypes())[0];
            settitleSnack("Exito");
            setcolorSnack('success');
            setmessageSnack("Productos obtenidos con exito");
            setopenSnack(true);
            
            if (productsAsync) {
                setproducts(productsAsync);
            }
        } catch (error: any) {
            setmessageSnack(error.message);
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }

    }

    const handleClientSubmit = async (client: NewClientRQ) => {
        if (!CIUtils.checkIdentification(client.identification)) {
            setmessageSnack("Cedula incorrecta");
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
            return;
        }
        setisLoading(true);
        try {
            await ClientService.postClient(client);
            setidentification(client.identification);
            setidentificationType(client.identificationType);
            setemail(client.email);
            setCurrentIndex(1);
            settitleSnack("Exito");
            setcolorSnack('success');
            setmessageSnack("Cliente creado con exito");
            setopenSnack(true);

        } catch (error: any) {
            setmessageSnack(error.message);
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const handleUserSubmit = async (user: UserRQ) => {
        setisLoading(true);
        try {
            await ClientService.postClientSignUp(user);
            setCurrentIndex(2);
            settitleSnack("Exito");
            setcolorSnack('success');
            setmessageSnack("Usuario creado con exito");
            setopenSnack(true);
        } catch (error: any) {
            setmessageSnack(error.message);
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const handleAccountSubmit = async (account: RQCreateAccount) => {
        setisLoading(true);
        try {
            await AccountService.postAccount(account);
            navigate('/cliente/login');
            settitleSnack("Cuenta creada");
            setcolorSnack('success');
            setopenSnack(true);

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
                        top: '2rem'
                    }}>
                    <BanQuitoIcon />
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0
                    }}>
                    <ProgressButtonMolecule
                        color={ColorPalette.PRIMARY}
                        itemsCount={3}
                        spotSize={15}
                        current={currentIndex} />
                </div>
                <Card sx={{
                    width: '100%',
                    maxWidth: 500,
                    padding: '1rem',
                }}
                    variant='outlined'>
                    <CardContent>
                        {currentIndex === 0 && <CreateClientForm
                            title='Hagamos que seas cliente'
                            onSubmit={handleClientSubmit} />}
                        {currentIndex === 1 && <CreateUserForm
                            username={email?.split("@")[0]}
                            title='Creemos tu nueva cuenta'
                            onSubmit={(value) => {
                                handleUserSubmit({
                                    email: email || '',
                                    identification: identification || '',
                                    identificationType: identificationType || '',
                                    user: {
                                        userName: value.username,
                                        password: value.password,
                                        type: "client",
                                        status: "INA",
                                        creationDate: moment(new Date()).format("YYYY-MM-DDThh:mm:ss"),
                                        lastLoginDate: moment(new Date()).format("YYYY-MM-DDThh:mm:ss")
                                    }
                                })
                            }} />}
                        {currentIndex === 2 && <AccountFormBank
                            defaultProduct={products?.id || ''}
                            onSubmit={handleAccountSubmit}
                            products={products ? [products] : []}
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