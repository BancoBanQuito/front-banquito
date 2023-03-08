import React, { useEffect, useState } from 'react'
import OnConstructionMolecule from '../../../components/molecules/OnConstructionMolecule'
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule'
import LoadOrganism from '../../../components/organisms/LoadOrganism'
import { AlertColor, Box, Grid, IconButton, Typography } from '@mui/material'
import { ProductRS } from '../../../services/product/dto/ProductRS'
import { ProductTypeRS } from '../../../services/product/dto/ProductTypeRS'
import { ProductTypeService } from '../../../services/product/ProductTypeService.service'
import { ProductService } from '../../../services/product/ProductService.service'
import CardMolecule from '../../../components/molecules/CardMolecule'
import { Close } from '@mui/icons-material'
import AccountCancelForm from '../../../components/organisms/Account/AccountCancelForm'
import ApplicationCardOrganism from '../../../components/organisms/ApplicationCardOrganism'
import { RSAccount } from '../../../services/account/dto/RSAccount'
import { AccountService } from '../../../services/account/AccountService'
import AccountFormBank from '../../../components/organisms/Account/AccountFormBank'
import { useUser } from '../../../context/UserContext'
import { RQCreateAccount } from '../../../services/account/dto/RQCreateAccount'
import { DataToDropdownUtils } from '../../../utils/DataToDropdownUtils'


interface AccountApplicationPageProps {
    accounts: RSAccount[]
}

const AccountApplicationPage = (props: AccountApplicationPageProps) => {

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [messageLoading, setmessageLoading] = useState<string | undefined>();

    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

    const [productTypes, setproductTypes] = useState<ProductTypeRS[]>([]);
    const [selectedProduct, setselectedProduct] = useState<{
        type: string,
        product: string
    }>();

    const [openApplicationForm, setopenApplicationForm] = useState<boolean>(false);
    const [openAccountCancel, setopenAccountCancel] = useState<boolean>(false);

    const user = useUser();

    useEffect(() => {
        retriveAllProductTypes();
        return () => { }
    }, []);


    const retriveAllProductTypes = async () => {
        setisLoading(true);
        try {
            const data: ProductTypeRS[] = (await ProductTypeService.getProductTypes()) || [];
            setproductTypes(data);
            settitleSnack("Éxito");
            setmessageSnack("Se han cargado los productos");
            setcolorSnack('success');
            setopenSnack(true);

        } catch (error) {
            setmessageSnack("Ha ocurrido un error");
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const handleAccountCloseSubmit = async (id: string) => {
        setisLoading(true);
        try {
            await AccountService.putAccountStatus(id, {
                status: 'INA'
            })
            settitleSnack("Éxito");
            setmessageSnack("Se ha cerrado la cuenta");
            setcolorSnack('success');
            setopenSnack(true);
        } catch (error) {
            setmessageSnack("Ha ocurrido un error");
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
            window.location.reload();
            settitleSnack("Éxito");
            setmessageSnack("Se ha creado la cuenta");
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
            <>
                <Typography
                    variant='h5'
                    fontWeight='bold'
                    textTransform='uppercase'
                    color='secondary'
                    marginBottom={1}>Solicitudes</Typography>
                {!openApplicationForm ? <div style={{
                    width: '100%',
                    marginLeft: '1rem',
                    marginRight: '1rem'
                }}>
                    <Grid container spacing={5}>
                        <Grid item sm={4}>
                            <ApplicationCardOrganism
                                product={{
                                    id: '',
                                    name: 'Cancelar Cuenta',
                                }}
                                onClick={() => {
                                    setopenApplicationForm(true);
                                    setopenAccountCancel(true);
                                }} />
                        </Grid>
                    </Grid>
                    {
                        productTypes.map(type => {
                            return <>
                                {
                                    type.products.length > 0 &&
                                    <>
                                        <Typography
                                            variant='h6'
                                            fontWeight='bold'
                                            textTransform='uppercase'
                                            color='secondary'
                                            marginBottom={1}
                                            marginTop={5}>{type.name}</Typography>
                                        <Grid container spacing={5}>
                                            {
                                                type.products.map(product => {
                                                    return <>
                                                        {
                                                            product.status === 'INA' ? null :
                                                                <Grid item sm={4}>
                                                                    <ApplicationCardOrganism
                                                                        product={{
                                                                            id: product.id,
                                                                            name: product.name
                                                                        }}
                                                                        onClick={() => {
                                                                            setopenApplicationForm(true);
                                                                            setopenAccountCancel(false);
                                                                            setselectedProduct({
                                                                                product: product.id,
                                                                                type: type.id
                                                                            });
                                                                        }} />
                                                                </Grid>
                                                        }
                                                    </>
                                                })
                                            }
                                        </Grid>
                                    </>
                                }
                            </>
                        })
                    }
                </div>
                    : <CardMolecule
                        maxWidth={700}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginBottom: '0.25rem',
                            width: '100%'
                        }}>
                            <IconButton onClick={() => {
                                setopenApplicationForm(false);
                                setopenAccountCancel(false);
                            }}>
                                <Close />
                            </IconButton>
                        </div>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            {
                                openAccountCancel ?
                                    <AccountCancelForm
                                        onSubmit={handleAccountCloseSubmit}
                                        accounts={props.accounts} /> :
                                    <AccountFormBank
                                        onSubmit={handleAccountSubmit}
                                        products={productTypes}
                                        identification={user.identification}
                                        identificationType={user.identificationType}
                                        defaultProduct={`${selectedProduct?.type}-${selectedProduct?.product}`}
                                    />
                            }
                        </Box>
                    </CardMolecule>}
            </>
            <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                autoHideDuration={3000}
                onClose={() => setopenSnack(false)} />
            <LoadOrganism
                active={isLoading}
                text={messageLoading} />
        </>
    )
}

export default AccountApplicationPage