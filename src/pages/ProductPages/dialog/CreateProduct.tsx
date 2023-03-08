import { Dialog, Stack, Typography, Divider, TextField, Select, MenuItem, Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import DatePickerAtom from "../../../components/atoms/DatePickerAtom";
import Swal from 'sweetalert2'
import EnvManager from "../../../config/EnvManager";
import { Spinner } from "../../../components/atoms/Spinner";
import axios from "axios";

interface Props {
    openDialog: boolean;
}

export const CreateProduct = ({ openDialog }: Props) => {
    const [open, setOpen] = useState(openDialog);
    const [products, setProducts] = useState<any[]>([]);
    const [interest, setInterest] = useState<any[]>([]);
    const [associatedServices, setAssociatedServices] = useState<any[]>([]);
    const [activateSpinner, setActivateSpinner] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
        dayjs('2022-08-18'),
    );
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(
        dayjs('2022-08-18'),
    );

    const handleChange = (newValue: Dayjs | null) => {
        setSelectedDate(newValue);
    };
    const handleChangeEnd = (newValue: Dayjs | null) => {
        setSelectedEndDate(newValue);
    };

    const methods = useForm();
    const { register, handleSubmit } = methods;

    const handleClose = () => {
        methods.reset();
        setOpen(false);
    }

    const getInterest = async () => {
        try {
            setActivateSpinner(true);
            const response = await axios(`${EnvManager.PRODUCT_URL}/api/interest-rate`, {
                method: 'GET',
            });
            const data = await response.data;
            setInterest(data);
            setActivateSpinner(false);
        } catch (error) {
            setActivateSpinner(false);
            console.log(error);
        }
    }

    const getAssociatedServices = async () => {
        try {
            setActivateSpinner
            const response = await axios(`${EnvManager.PRODUCT_URL}/api/associatedServices`, {
                method: 'GET',
            });
            const data = await response.data;
            setAssociatedServices(data);
            setActivateSpinner(false);
        } catch (error) {
            setActivateSpinner(false);
            console.log(error);
        }
    }

    const getProductTypes = async () => {
        try {
            setActivateSpinner(true);
            const response = await axios(`${EnvManager.PRODUCT_URL}/api/product-types/types`, {
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
            console.log(data.interestRate, data.productType, data.associatedService)
            const interest = data.interestRate.split("/")

            const prepareInterest = {
                id: interest[0],
                name: interest[1],
                type: interest[2],
            }

            const typeP = data.productType.split("/")

            const prepareType = {
                id: typeP[0],
                name: typeP[1],
            }

            const associated = data.associatedService.split("/")
            const prepareAssociated = {
                id: associated[0],
                name: associated[1],
                allowPayment: associated[2],
                paymentMethod: associated[3],
                chargeVat: associated[4],
                fee: associated[5],
            }

            const typeProduct = {
                name: data.name,
                status: data.status,
                startDate: selectedDate?.format('YYYY-MM-DD'),
                endDate: selectedEndDate?.format('YYYY-MM-DD'),
                temporalyAccountState: data.temporalyAccountState,
                useCheckbook: data.useCheckbook,
                allowTransference: data.allowTransference,
                typeClient: data.typeClient,
                minOpeningBalance: data.minOpeningBalance,
                interestRate: { ...prepareInterest },
                associatedService: [{ ...prepareAssociated }],
                productType: { ...prepareType },

            }

            console.log(typeProduct)
            setActivateSpinner(true);
            const response = await axios(`${EnvManager.PRODUCT_URL}/api/products/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(typeProduct)
            })
            handleClose();
            setActivateSpinner(false);
            if (response.status !== 200) {
                Swal.fire({
                    title: 'Error al crear el producto',
                    icon: 'error',
                    showConfirmButton: true,
                })
                return;
            }
            Swal.fire({
                title: 'Producto creado',
                icon: 'success',
                showConfirmButton: true,
            })
        } catch (error) {
            setActivateSpinner(false);
            console.log(error);
            Swal.fire({
                title: 'Error al crear el producto',
                icon: 'error',
                showConfirmButton: true,
            })
        }
    }

    useEffect(() => {
        if (openDialog) {
            setOpen(true);
        }
    }, [openDialog])

    useEffect(() => {
        getProductTypes();
        getInterest();
        getAssociatedServices();
    }, [])

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
            {activateSpinner ? <Spinner /> : null}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2, margin: 3 }}>
                <Stack direction="column" spacing={2} sx={{ width: "100%" }} >
                    <Typography variant="h5">Crear Tipo de Producto</Typography>
                    <Divider sx={{ margin: 1, color: "black" }} />
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
                            <Stack direction="column" spacing={2} sx={{ width: "100%" }} alignItems='center'>
                                <Stack direction="row" spacing={2} sx={{ width: "100%" }} justifyContent="center">

                                    <Stack direction="column" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Producto</Typography>
                                        <TextField {...register("name", { required: true })} label="Nombre del producto" variant="outlined" />
                                    </Stack>

                                    <Stack direction="column" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Estado</Typography>
                                        <Select
                                            label="status"
                                            placeholder="status"
                                            variant="outlined"
                                            defaultValue={"ACT"}
                                            {...register("status", { required: true })}
                                        >
                                            <MenuItem value={"ACT"} key={"ACT"}>Activo</MenuItem>
                                            <MenuItem value={"INC"} key={"INC"}>Inactivo</MenuItem>
                                        </Select>
                                    </Stack>

                                    <Stack direction="column" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Fecha inicio</Typography>
                                        <DatePickerAtom
                                            label="Fecha inicio"
                                            value={selectedDate}
                                            {...register("startDate", { required: false })}
                                            onChange={(date) => handleChange(date)}

                                        />
                                    </Stack>

                                </Stack>


                                <Stack direction="row" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                    <Stack direction="column" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Fecha Final</Typography>
                                        <DatePickerAtom
                                            label="Fecha final"
                                            value={selectedEndDate}
                                            {...register("endDate", { required: false })}
                                            onChange={(date) => handleChangeEnd(date)}
                                        />
                                    </Stack>

                                    <Stack direction="column" spacing={3} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Estado de cuenta</Typography>
                                        <Select
                                            label="Estado de cuenta"
                                            placeholder="Estado de cuenta "
                                            variant="outlined"
                                            defaultValue={""}
                                            {...register("temporalyAccountState", { required: false })}
                                            onChange={(e) => e.target.value}
                                        >
                                            <MenuItem value={"DAI"} key={"DAI"}>Diario</MenuItem>
                                            <MenuItem value={"MOM"} key={"MOM"}>Mensual</MenuItem>
                                            <MenuItem value={"BIM"} key={"BIM"}>Bimestral</MenuItem>
                                        </Select>
                                    </Stack>

                                    <Stack direction="column" spacing={3} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Uso de Chequera</Typography>
                                        <Select
                                            label="Uso de Chequera"
                                            placeholder="Uso de Chequera"
                                            variant="outlined"
                                            defaultValue={""}
                                            {...register("useCheckbook", { required: false })}
                                            onChange={(e) => e.target.value}
                                        >
                                            <MenuItem id="Y" value="Y" key={"Y"}>Si</MenuItem>
                                            <MenuItem id="N" value="N" key={"N"}>No</MenuItem>
                                        </Select>
                                    </Stack>
                                </Stack>


                                <Stack direction="row" spacing={3} sx={{ width: "100%" }} justifyContent="center">

                                    <Stack direction="column" spacing={3} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Transferencias</Typography>
                                        <Select
                                            label="Permite transferencias"
                                            placeholder="Permite transferencias"
                                            variant="outlined"
                                            defaultValue={""}
                                            {...register("allowTransference", { required: false })}
                                            onChange={(e) => e.target.value}
                                        >
                                            <MenuItem id="Y" value="Y" key={"Y"}>Si</MenuItem>
                                            <MenuItem id="N" value="N" key={"N"}>No</MenuItem>
                                        </Select>
                                    </Stack>

                                    <Stack direction="column" spacing={3} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Tipo de Cliente</Typography>
                                        <Select
                                            label="Tipo de Cliente"
                                            placeholder="Tipo de Cliente"
                                            variant="outlined"
                                            defaultValue={""}
                                            {...register("typeClient", { required: false })}
                                            onChange={(e) => e.target.value}
                                        >
                                            <MenuItem value={"NAT"} key={"NAT"}>Natural</MenuItem>
                                            <MenuItem value={"BUS"} key={"BUS"}>Empresarial</MenuItem>
                                        </Select>
                                    </Stack>

                                    <Stack direction="column" spacing={3} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Saldo de apertura</Typography>
                                        <TextField label="Saldo de apertura" variant="outlined" {...register("minOpeningBalance", { required: false })} type='number' />
                                    </Stack>
                                </Stack>


                                <Stack direction="row" spacing={3} sx={{ width: "100%" }} justifyContent="center">
                                    <Stack direction="column" spacing={3} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Interes temporal</Typography>
                                        <Select
                                            label="Interes temporal"
                                            placeholder="Interes temporal"
                                            variant="outlined"
                                            defaultValue={""}
                                            {...register("interestRate", { required: false })}
                                            onChange={(e) => e.target.value}
                                        >
                                            {interest.map((inter: any) => (
                                                <MenuItem
                                                    id={inter.id}
                                                    key={inter.id}
                                                    value={inter.id + "/" + inter.name + "/" + inter.type + "/" + inter.calcBase}
                                                >
                                                    {inter.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Stack>
                                    <Stack direction="column" spacing={3} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Tipo de producto</Typography>
                                        <Select
                                            label="Tipo de producto"
                                            placeholder="Tipo de Producto"
                                            variant="outlined"
                                            defaultValue={""}
                                            {...register("productType", { required: false })}
                                            onChange={(e) => e.target.value}
                                        >
                                            {products.map((product: any) => (
                                                <MenuItem
                                                    id={product.id}
                                                    key={product.id}
                                                    value={product.id + "/" + product.name}
                                                >
                                                    {product.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Stack>
                                    <Stack direction="column" spacing={3} sx={{ width: "100%" }} justifyContent="center">
                                        <Typography variant="body1">Servicios asociados</Typography>
                                        <Select
                                            label="Servicios asociados"
                                            placeholder="Servicios asociados"
                                            variant="outlined"
                                            defaultValue={""}
                                            {...register("associatedService", { required: false })}
                                            onChange={(e) => e.target.value}
                                        >
                                            {associatedServices.map((service: any) => (
                                                <MenuItem
                                                    id={service.id}
                                                    key={service.id}
                                                    value={service.id + "/" + service.name + "/" + service.allowPayment + "/"
                                                        + service.paymentMethod + "/" + service.chargeVat + "/" + service.fee}>
                                                    {service.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Stack>

                                </Stack>
                                <Stack direction="row" spacing={3} sx={{ width: "100%" }} justifyContent="center">
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
