import { Card, CardActionArea, CardContent, Typography, Dialog, Stack, Divider, Select, MenuItem, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import ButtonIcon from '../components/atoms/ButtonIcon';
import { SizeButton } from '../components/atoms/SizeButton';
import TextFieldAtom from '../components/atoms/TextFieldAtom';
import { ButtonStyle } from '../style/ButtonStyle';
import { ColorPalette } from '../style/ColorPalette';
import { KeyboardBackspace, Search } from '@mui/icons-material';
import EnvManager from '../config/EnvManager';

// Styles
export const Container = styled.div`
  display: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 20px;
`;

export const Content = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  `;

// returnButton
export const ReturnButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: left;
  position: absolute;
  margin: 1rem;
  left: 0;
  top: 0;
`;


export const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 20px;
    max-width: 500px;
    margin-bottom: 2rem;
    margin-top: 2rem;
    `;

export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'white',
    border: '1px solid #000',
    boxShadow: 24,
    p: 3,
};

interface Props {
    openDialog: boolean;
}

const CreateRequestService = ({ openDialog }: Props) => {


    const [open, setOpen] = useState(openDialog);
    const [associtedService, setAssociatedService] = useState<any[]>([]);
    const methods = useForm();
    const { register, handleSubmit } = methods;
    const [accountdata, setAccountData] = useState(false);
    const [product, setProduct] = useState<any[]>([]);

    const handleClose = () => {
        methods.reset({ name: "" }, { keepValues: false });
        setOpen(false);
    }

    const getAccount = async (id: string) => {
        try {
            const response = await fetch(`${EnvManager.PRODUCT_URL}/api/product-types/type?id=${id}`, {
                method: 'GET',
            });
            const data = await response.json();
            const account = {
                accountNumber: data.accountNumber,
                fullName: data.fullName,
            }
            console.log(account)
            if (account.accountNumber === undefined) {
                return [];
            } setAccountData(true);
            return [account]
        } catch (error) {
            console.log(error);
        }
    }

    const getAssociatedService = async () => {
        try {
            const response = await fetch(`${EnvManager.PRODUCT_URL}/api/associatedServices`, {
                method: 'GET',
            });
            const data = await response.json();
            setAssociatedService(data);

        } catch (error) {
            console.log(error);
        }
    }

    const getProduct = async () => {
        try {
            const response = await fetch(`${EnvManager.PRODUCT_URL}/api/products/products`, {
                method: 'GET',
            });
            const data = await response.json();
            setProduct(data);

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitForm = async (data: any) => {
        try {

            const requestService = {
                accountNumber: "22265622",
                fullName: "prueba 2",
                nameAssociatedService: data.requestService,
            }

            await fetch(`${EnvManager.PRODUCT_URL}/api/request-service`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                //body: '{"accountNumber": "2258954863","fullName": "Jileidy zamora","nameAssociatedService": "pepe1"}'
                body: JSON.stringify(requestService)
            })
            console.log(requestService)

            handleClose();
        } catch (error) {
            console.log("estas mal")
            console.log(error);
        }
    }

    useEffect(() => {
        if (openDialog) {
            setOpen(false);
        }
    }, [openDialog])

    useEffect(() => {
        getAssociatedService();
        getProduct();
    }, [])

    const handleOpenProduct = () => setOpen(true);

    return (
        <Container>
            <Content>
                <ReturnButton>
                    <ButtonIcon
                        color={ColorPalette.PRIMARY}
                        icon={<KeyboardBackspace />}
                        onClick={() => console.log(product)}
                        top={true}
                    />
                </ReturnButton>
                <div>
                    <h1 style={{ textAlign: "center" }}>Solicitar un servicio del Banco</h1>
                </div>
                <div>
                    <SearchContainer>
                        <span>Cuenta: </span>
                        <TextFieldAtom
                            id="id"
                            label="Número cuenta"
                            color="primary"
                            type="number"
                            placeholder=""
                            variant="standard"
                        />
                        <SizeButton palette={{ backgroundColor: ColorPalette.PRIMARY }}
                            icon={<Search />}
                            onClick={() => setAccountData(true)}
                            text="Buscar"
                            style={ButtonStyle.MEDIUM}
                        />
                    </SearchContainer>
                </div>
                {accountdata ?
                    <div id="card">
                        <Card style={{ flex: 3, backgroundColor: '#81ecec' }}>
                            <CardActionArea onClick={handleOpenProduct} >
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2" color="common.white">
                                        Cuenta ahorros
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1" component="h2" color="common.white">
                                        2265987412
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1" component="h2" color="common.white">
                                        Steven Leiva
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div> : <h5>No hay cuenta</h5>}
                <div>
                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2, margin: 5 }}>
                            <Stack direction="column" spacing={2} sx={{ width: "100%" }} alignItems='center'>
                                <Typography variant="h5">Solicitar un servicio asociado</Typography>
                                <Divider sx={{ margin: 1, color: "black" }} />
                                <FormProvider {...methods}>
                                    <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
                                        <Stack direction="column" spacing={2} sx={{ width: "100%" }} alignItems='center'>
                                            <Stack direction="row" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                                <Stack direction="column" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                                    <Typography variant="body1">Servicios disponibles</Typography>
                                                    <Select
                                                        label="requestService"
                                                        placeholder="requestService"
                                                        variant="outlined"
                                                        defaultValue={""}
                                                        {...register("requestService", { required: false })}
                                                        onChange={(e) => e.target.value}
                                                    >
                                                        {associtedService.map((service: any) => (
                                                            <MenuItem id={service.id} value={service.name}>{service.name}</MenuItem>

                                                        ))}
                                                    </Select>
                                                </Stack>
                                            </Stack>
                                            <Stack direction="row" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                                <Button variant="contained" type="submit">Solicitar</Button>
                                            </Stack>
                                        </Stack>
                                    </form>
                                </FormProvider>
                            </Stack>
                        </Stack>
                    </Dialog>
                </div>
            </Content>
        </Container>

    );
};

export default CreateRequestService;



