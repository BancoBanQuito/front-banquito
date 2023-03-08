import { Typography, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Spinner } from "../../components/atoms/Spinner";
import TableMolecule from "../../components/molecules/TableMolecule";
import EnvManager from "../../config/EnvManager";
import { CreateTypeProduct } from "./dialog/CreateTypeProduct";
import axios from "axios";
import { AlertColor } from "@mui/material";
import SnackBarMolecule from "../../components/molecules/SnackBarMolecule";

const table: any = {
    headers: [
        <Typography>Tipo de Producto</Typography>,
        <Typography>Tipo</Typography>,
        <Typography>Temporalidad de interes</Typography>,
    ]
}


export const ProductType = () => {

    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');
    
    const [products, setProducts] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(true);}
    const [activateSpinner, setActivateSpinner] = useState(false);
    const getTypeProducts = async () => {
        try {
            setActivateSpinner(true);

            const response = await axios(`${EnvManager.PRODUCT_URL}/api/product-types/types`);
            const data = await response.data;
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
            setActivateSpinner(false);
            settitleSnack("Exito");
            setmessageSnack("Tipos de productos cargados correctamente");
            setcolorSnack('success');
            setopenSnack(true);


        } catch (error) {
            setActivateSpinner(false);
            console.log(error);
            settitleSnack("Error");
            setmessageSnack("Error al cargar los tipos de productos");
            setcolorSnack('error');
            setopenSnack(true);
            
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
        getTypeProducts();
    }, [open]);

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
