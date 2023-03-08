import { useState, useEffect } from "react";
import { Dialog, Stack, Typography, Divider, Button, TextField, Select, MenuItem } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import EnvManager from "../../../config/EnvManager";
import { Spinner } from "../../../components/atoms/Spinner";
import axios from "axios";
import { ColorPalette } from '../../../style/ColorPalette';

interface Props {
    openDialog: boolean;
}

export const CreateTypeProduct = ({ openDialog }: Props) => {
    const [open, setOpen] = useState(openDialog);
    const [products, setProducts] = useState<any[]>([]);
    const methods = useForm();
    const { register, handleSubmit } = methods;
    const [activateSpinner, setActivateSpinner] = useState(false);
    const handleClose = () => {
        methods.reset({ name: "", type: "", products: "" }, { keepValues: false });
        setOpen(false);
    }

    const getProduct = async (name: string) => {
        try {
            console.log(name)
            setActivateSpinner(true);
            const response = await axios(`${EnvManager.PRODUCT_URL}/api/products/name-product?name=${name}`, {
                method: 'GET',
            });
            const data = await response.data;
            const productTyp = {
                id: data.id,
                name: data.name,
                status: data.status
            }
            setActivateSpinner(false);
            console.log(productTyp)
            if (productTyp.id === undefined) {
                return [];
            }
            return [productTyp]
        } catch (error) {
            setActivateSpinner(false);
            console.log(error);
        }
    }

    const getProducts = async () => {
        try {
            setActivateSpinner(true);
            const response = await axios(`${EnvManager.PRODUCT_URL}/api/products/products`, {
                method: 'GET',
            });
            const data = await response.data;
            setProducts(data);
            setActivateSpinner(false);
        } catch (error) {
            setActivateSpinner(false);
            console.log(error);
        }
    }

    const handleSubmitForm = async (data: any) => {
        try {
            setActivateSpinner(true);
            const productTyp = await getProduct(data.products);
            const typeProduct = {
                name: data.name,
                type: data.type,
                allowEarnInterest: data.allowEarnInterest,
                allowGenAccState: data.allowGenAccState,
                temporalyInterest: data.temporalyInterest,
                products: productTyp

            }
            await axios(`${EnvManager.PRODUCT_URL}/api/product-types/types`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(typeProduct)
            })
            handleClose();
            setActivateSpinner(false);
        } catch (error) {
            setActivateSpinner(false);
            console.log(error);
        }
    }

    useEffect(() => {
        if (openDialog) {
            setOpen(true);
        }
    }, [openDialog])

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            {activateSpinner? <Spinner /> : null}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2, margin: 5 }}>
                <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
                    <Typography variant="h5">Crear Tipo de Producto</Typography>
                    <Divider sx={{ margin: 1, color: "black" }} />
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
                            <Stack direction="column" spacing={2} sx={{ width: "100%" }} alignItems='center'>
                                <Stack direction="row" spacing={2} sx={{ width: "100%" }} justifyContent="center">

                                    <Stack direction="column" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Nombre del producto</Typography>
                                        <TextField {...register("name", { required: true })} label="Nombre del producto" variant="outlined" />
                                    </Stack>

                                    <Stack direction="column" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Tipo</Typography>
                                        <TextField {...register("type", { required: true })} label="Tipo" variant="outlined" />
                                    </Stack>

                                    <Stack direction="column" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Permite ganar intereses</Typography>
                                        <Select
                                            label="allowEarnInterest"
                                            placeholder="Permite ganar intereses"
                                            variant="outlined"
                                            defaultValue={"Y"}
                                            {...register("allowEarnInterest", { required: true })}
                                        >
                                            <MenuItem value={"Y"}>Si</MenuItem>
                                            <MenuItem value={"N"}>No</MenuItem>
                                        </Select>
                                    </Stack>

                                </Stack>


                                <Stack direction="row" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                    <Stack direction="column" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Estado de cuenta</Typography>
                                        <Select
                                            label="Estado de cuenta"
                                            placeholder="Estado de cuenta"
                                            variant="outlined"
                                            defaultValue={"Y"}
                                            {...register("allowGenAccState", { required: true })}
                                        >
                                            <MenuItem value={"Y"}>Si</MenuItem>
                                            <MenuItem value={"N"}>No</MenuItem>
                                        </Select>
                                    </Stack>

                                    <Stack direction="column" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Interes temporal</Typography>
                                        <Select
                                            label="temporalyInterest"
                                            placeholder="temporalyInterest"
                                            variant="outlined"
                                            defaultValue={"Y"}
                                            {...register("temporalyInterest", { required: true })}
                                        >
                                            <MenuItem value={"Diario"}>Diario</MenuItem>
                                            <MenuItem value={"Mensual"}>Mensual</MenuItem>
                                        </Select>
                                    </Stack>

                                    <Stack direction="column" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Productos asociados</Typography>
                                        <Select
                                            label="products"
                                            placeholder="products"
                                            variant="outlined"
                                            defaultValue={""}
                                            {...register("products", { required: false })}
                                            onChange={(e) => e.target.value}
                                        >
                                            {products.map((product: any) => (
                                                <MenuItem id={product.id} value={product.name}> {product.name} </MenuItem>
                                            ))}
                                        </Select>
                                    </Stack>

                                </Stack>


                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <Button variant="contained" type="submit"
                                    color="secondary"
                                        
                                    >Crear</Button>
                                    <Button variant="contained" onClick={handleClose} color="error">Cancelar</Button>
                                </Stack>
                            </Stack>
                        </form>
                    </FormProvider>
                </Stack>
            </Stack>
        </Dialog>
    )
}
