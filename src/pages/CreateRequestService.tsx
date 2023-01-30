import { Button, CardActionArea, CardContent, Dialog, Divider, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TextFieldAtom from "../components/atoms/TextFieldAtom";

import ButtonIcon from "../components/atoms/ButtonIcon";

// search icon
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
// icon keyboar backspace
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ColorPalette } from "../style/ColorPalette";
// Add icon
import { SizeButton } from "../components/atoms/SizeButton";
import { ButtonStyle } from "../style/ButtonStyle";
//data
import Card from "@mui/material/Card";
import EnvManager from '../config/EnvManager';
import { useForm, FormProvider } from "react-hook-form";

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

type account = {
    codeLocalAccount: String,
    name: String,
    typeProduct: String,
    product: String
};

type nameProduct = {

    nameProductType: String,

};

interface Props {
    openDialog: boolean;
};

const CreateRequestService = ({ openDialog }: Props) => {


    const [open, setOpen] = useState(openDialog);
    const methods = useForm();
    const { register, handleSubmit } = methods;
    const [accountdata, setAccountData] = useState<account>();
    const [product, setProduct] = useState<any[]>([]);
    const [id, setId] = useState("");
    const [nameProduct, setNameProduct] = useState<nameProduct>();

    const handleClose = () => {
        methods.reset({ name: "" }, { keepValues: false });
        setOpen(false);
    }

    const getAccount = async (id: String) => {
        try {
            const response = await fetch(`${EnvManager.ACCOUNT_URL}/api/account/code/${id}/type`, {
                method: 'GET',
            });
            const { data } = await response.json();
            const account = {
                codeLocalAccount: data.codeLocalAccount,
                name: data.name,
                typeProduct: data.productType,
                product: data.product
            }
            
            if (account.codeLocalAccount === undefined) {
                return [];
            } setAccountData(account)
            return [account]
        } catch (error) {
            console.log("Error", error);

        }
    }

    const getnameProduct = async () => {
        try {
            const response = await fetch(`${EnvManager.PRODUCT_URL}/api/product-types/type?id=63cf1f424afc455eb703d48f`, {
                method: 'GET',
            });
            const data = await response.json();
            const account = {
                nameProductType: data.name,
            }

            setNameProduct(account);
            return [account]
        } catch (error) {
            console.log("Error", error);

        }
    }



    const getProduct = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8087/api/products/id-product?id=63cf21444afc455eb703d492`, {
                method: 'GET',
            });
            const data = await response.json();
            const account = data.associatedService.map(
                (service: any) => service.name
            )
            setProduct(account);

        } catch (error) {
            console.log(error);
        }
    }



    const handleSubmitForm = async (data: any) => {
        try {

            const requestService = {
                accountNumber: accountdata?.codeLocalAccount,
                fullName: accountdata?.name,
                nameAssociatedService: data.requestService,
            }

            await fetch(`http://localhost:8087/api/request-service`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(requestService)
            })


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
        getAccount(id);
        getProduct();
        getnameProduct();
    }, [id])

    const handleOpenProduct = () => setOpen(true);

    return (
        <Container>
            <Content>
                <ReturnButton>
                    <ButtonIcon
                        color={ColorPalette.PRIMARY}
                        icon={<KeyboardBackspaceIcon />}
                        //onClick={() => }
                        top={true}
                    />
                </ReturnButton>
                <div>
                    <h1 style={{ textAlign: "center" }}>Solicitar un servicio del Banco</h1>
                </div>
                <div>
                    <SearchContainer>
                        <span>Cuenta: </span>
                        <TextField
                            id="id"
                            label="Número cuenta"
                            color="primary"
                            type="text"
                            placeholder=""
                            variant="standard"
                            onChange={(value) => setId(value.target.value)}
                        />
                        <SizeButton palette={{ backgroundColor: ColorPalette.PRIMARY }}
                            icon={<SearchIcon />}
                            onClick={() => getAccount(id)}
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
                                        {nameProduct?.nameProductType}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1" component="h2" color="common.white">
                                        {accountdata.codeLocalAccount}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1" component="h2" color="common.white">
                                        {accountdata.name}
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
                                                        {product?.map((service: any) => (<MenuItem value={service}>{service}</MenuItem>))}

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



