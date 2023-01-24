import { useState, useEffect } from "react";
import { Dialog, Stack, Typography, Divider, Button, TextField, Select, MenuItem } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

interface Props {
    openDialog: boolean;
}

export const CreateTypeProduct = ({ openDialog }: Props) => {
    const [open, setOpen] = useState(openDialog);
    const [products, setProducts] = useState<any[]>([]);
    const methods = useForm();
    const { register, handleSubmit } = methods;

    const handleClose = () => {
        methods.reset({ name: "", type: "", products: "" }, { keepValues: false });
        setOpen(false);
    }

    const getProduct = async (name: string) => {
        try {
            console.log(name)
            const response = await fetch(`http://localhost:8087/api/products/name-product?name=${name}`, {
                method: 'GET',
            });
            const data = await response.json();
            const productTyp = {
                id: data.id,
                name: data.name,
                status: data.status
            }
            console.log(productTyp)
            if (productTyp.id === undefined) {
                return [];
            }
            return [productTyp]
        } catch (error) {
            console.log(error);
        }
    }

    const getProducts = async () => {
        try {
            const response = await fetch(`http://localhost:8087/api/products/products`, {
                method: 'GET',
            });
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitForm = async (data: any) => {
        try {
            const productTyp = await getProduct(data.products);
            const typeProduct = {
                name: data.name,
                type: data.type,
                allowEarnInterest: data.allowEarnInterest,
                allowGenAccState: data.allowGenAccState,
                temporalyInterest: data.temporalyInterest,
                products: productTyp

            }
            await fetch(`http://localhost:8087/api/product-types/types`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(typeProduct)
            })
            handleClose();
        } catch (error) {
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
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2, margin: 5 }}>
                <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
                    <Typography variant="h5">Crear Producto</Typography>
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
                                    <Button variant="contained" type="submit">Crear</Button>
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