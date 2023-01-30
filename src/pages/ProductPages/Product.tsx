import { Typography, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import TableMolecule from "../../components/molecules/TableMolecule";
import EnvManager from "../../config/EnvManager";
import { ActivateDialog } from "./dialog/ActivateDialog";
import { CreateProduct } from "./dialog/CreateProduct";

const table: any = {
    headers: [
        <Typography>Producto</Typography>,
        <Typography>Estado</Typography>,
        <Typography>Tipo de producto</Typography>,
        <Typography>Habilitación</Typography>,
    ]
}

export const Product = () => {

    const [products, setProducts] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [id, setId] = useState("");
    const [status, setStatus] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenProduct = () => setOpenDialog(true);

    const getProducts = async () => {
        try {
            const response = await fetch(`${EnvManager.PRODUCT_URL}/api/products/products`);
            const data = await response.json();
            const product = data.map((product: any) => {
                return {
                    name: <Typography>{product.name}</Typography>,
                    status: <Typography>{product.status}</Typography>,
                    type: <Typography>{product.productType.name}</Typography>,
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
                rows.push([product.name, product.status, product.type, product.enable])
            })
            setProducts(rows);

        } catch (error) {
            console.log(error);
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
}
