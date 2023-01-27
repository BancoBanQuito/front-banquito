import { Typography, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import TableMolecule from "../../components/molecules/TableMolecule";
import { CreateTypeProduct } from "./dialog/CreateTypeProduct";

const table: any = {
    headers: [
        <Typography>Tipo de Producto</Typography>,
        <Typography>Tipo</Typography>,
        <Typography>Temmporalidad de interes</Typography>,
    ]
}


export const ProductType = () => {

    const [products, setProducts] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const getTypeProducts = async () => {
        try {
            const response = await fetch('http://localhost:8087/api/product-types/types');
            const data = await response.json();
            const product = data.map((product: any) => {
                return {
                    name: <Typography>{product.name}</Typography>,
                    type: <Typography>{product.type}</Typography>,
                    temporalyInterest: <Typography>{product.temporalyInterest}</Typography>,
                }
            })

            const rows: any = [];
            product.forEach((product: any) => {
                rows.push([product.name, product.type, product.temporalyInterest])
            })
            setProducts(rows);

        } catch (error) {
            console.log(error);
        }
    }
   

    useEffect(() => {
        getTypeProducts();
    }, [])
    
    useEffect(() => {
        if (open) {
            handleOpen();
        }
        setOpen(false);
    }, [open]);

    return (
        <Stack direction="row" spacing={2} >
            <Stack direction="column" spacing={2} sx={{ width: "100%" }} alignItems='center'>
                <Typography variant="h4" align="center">Tipos de Productos</Typography>

                <Stack direction="row" spacing={2} sx={{ width: "80%" }}>
                    <TableMolecule headers={table.headers} rows={products} />
                </Stack>
                <Stack direction="column" spacing={2} sx={{ width: "100%" }} alignItems='center'>
                    <Button variant="contained" onClick={handleOpen}>Crear Nuevo tipo de producto</Button>
                </Stack>
            </Stack>
            <CreateTypeProduct
                openDialog={open}
            />
        </Stack >
    )
}