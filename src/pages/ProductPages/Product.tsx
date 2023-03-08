import { Typography, Button, Stack } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import TableMolecule from "../../components/molecules/TableMolecule";
import EnvManager from "../../config/EnvManager";
import { ActivateDialog } from "./dialog/ActivateDialog";
import { CreateProduct } from "./dialog/CreateProduct";
import axios from "axios";
import { Spinner } from "../../components/atoms/Spinner";
import { AlertColor } from "@mui/material";
import SnackBarMolecule from "../../components/molecules/SnackBarMolecule";

const table: any = {
    headers: [
        <Typography>Producto</Typography>,
        <Typography>Estado</Typography>,
        <Typography>Tipo de producto</Typography>,
        <Typography>Servicio asociado</Typography>,
        <Typography>Habilitación</Typography>,
    ]
}

export const Product = () => {

    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');
    
    const [products, setProducts] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [id, setId] = useState("");
    const [status, setStatus] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenProduct = () => setOpenDialog(true);
    const [activateSpinner, setActivateSpinner] = useState(false);
    const getProducts = async () => {
        try {
            setActivateSpinner(true);
            const response = await axios.get(`${EnvManager.PRODUCT_URL}/api/products/products`);
            const data = response.data;
            const product = data.map((product: any) => {
                const services: any = []
                product.associatedService.forEach((service: any) => {
                    services.push(service.name, "\n")
                })
                return {
                    name: <Typography>{product.name}</Typography>,
                    status: <Typography>{product.status}</Typography>,
                    type: <Typography>{product.productType.name}</Typography>,
                    service: <Typography>{services}</Typography>,
                    enable: <Button
                        variant="contained"
                        color={product.status.toUpperCase() === 'ACT' ? "error" : "primary"}
                        onClick={() => handleOpenDialog(product.name, product.status)}>
                        {product.status.toUpperCase() === 'ACT' ? "Deshabilitar" : "Habilitar"}
                    </Button>
                }
            })

            const rows: any = [];
            product.forEach((product: any) => {
                rows.push([product.name, product.status, product.type, product.service, product.enable])
            })
            setProducts(rows);
            setActivateSpinner(false);
            settitleSnack("Productos");
            setmessageSnack("Productos obtenidos correctamente");
            setcolorSnack('success');
            setopenSnack(true);
        } catch (error) {
            setActivateSpinner(false);
            console.log(error);
            settitleSnack("Productos");
            setmessageSnack("Error al obtener los productos");
            setcolorSnack('error');
            setopenSnack(true);
        }
    }

    const handleOpenDialog = (id: string, status: string) => {
        setOpen(true);
        setId(id);
        setStatus(status);
    }

    useEffect(() => {
        getProducts();
    }, [])


    useEffect(() => {
        const interval = setInterval(() => {
            getProducts();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (open) {
            handleOpen();
        }
        setOpen(false);

    }, [open]);

    useEffect(() => {
        if (openDialog) {
            handleOpenProduct();
        }
        setOpenDialog(false);
    }, [openDialog]);

    return (
        <Stack direction="row" spacing={2} >
            <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
            {activateSpinner ? <Spinner /> : null}
            <Stack direction="column" spacing={2} sx={{ width: "100%", margin: '4rem' }} alignItems='center'>
                <Typography variant="h4" align="center">Productos</Typography>

                <Stack direction="row" spacing={2} sx={{ width: "80%" }}>
                    <TableMolecule headers={table.headers} rows={products} />
                </Stack>
                <Stack direction="column" spacing={2} sx={{ width: "100%" }} alignItems='center'>
                    <Button variant="contained" onClick={handleOpenProduct}>Crear Nuevo Producto</Button>
                </Stack>
            </Stack>
            <ActivateDialog
                openDialog={open}
                name={id}
                state={status}
            />
            <CreateProduct
                openDialog={openDialog}
            />
        </Stack >
    )
};
