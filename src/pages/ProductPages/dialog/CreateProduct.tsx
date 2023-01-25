import { useState, useEffect } from "react";
import { Dialog, Stack, Typography, Divider, Button, TextField, Select, MenuItem } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import DatePickerAtom from "/src/components/atoms/DatePicker";

interface Props {
    openDialog: boolean;
}

export const CreateProduct = ({ openDialog }: Props) => {
    const [open, setOpen] = useState(openDialog);
    const [products, setProducts] = useState<any[]>([]);
    const [interest, setInterest] = useState<any[]>([]);
    const [associatedServices, setAssociatedServices] = useState<any[]>([]);
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
            const response = await fetch(`http://localhost:8087/api/interest-rate`, {
                method: 'GET',
            });
            const data = await response.json();
            setInterest(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAssociatedServices = async () => {
        try {
            const response = await fetch(`http://localhost:8087/api/associatedServices`, {
                method: 'GET',
            });
            const data = await response.json();
            setAssociatedServices(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getProductTypes = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8087/api/product-types/types`, {
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
            await fetch(`http://127.0.0.1:8087/api/products/product`, {
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
        getProductTypes();
        getInterest();
        getAssociatedServices();
    }, [])

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
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
                                            <MenuItem value={"ACT"}>Activo</MenuItem>
                                            <MenuItem value={"INC"}>Inactivo</MenuItem>
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
                                            <MenuItem value={"DAI"}>Diario</MenuItem>
                                            <MenuItem value={"MOM"}>Mensual</MenuItem>
                                            <MenuItem value={"BIM"}>Bimestral</MenuItem>
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
                                            <MenuItem id="Y" value="Y">Si</MenuItem>
                                            <MenuItem id="N" value="N">No</MenuItem>
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
                                            <MenuItem id="Y" value="Y">Si</MenuItem>
                                            <MenuItem id="N" value="N">No</MenuItem>
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
                                            <MenuItem value={"NAT"}>Natural</MenuItem>
                                            <MenuItem value={"BUS"}>Empresarial</MenuItem>
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