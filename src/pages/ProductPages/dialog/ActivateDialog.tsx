import { Dialog, Button, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Spinner } from "../../../components/atoms/Spinner";
import EnvManager from "../../../config/EnvManager";
import axios from "axios";

interface Props {
    openDialog: boolean;
    name: string;
    state: string;
}


export const ActivateDialog = ({ openDialog, name, state }: Props) => {

    const [open, setOpen] = useState(openDialog);
    const [newState, setNewState] = useState('');
    
    const [activateSpinner, setActivateSpinner] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    const deleteProduct = async () => {
        try {
            let newState = 'INC';
            if (state === 'INC') {
                newState = 'ACT';
            }
            setActivateSpinner(true);
            await axios(`${EnvManager.PRODUCT_URL}/api/products/product?name=${name}&status=${newState}`, {
                method: 'PUT',
            }
            );
            setActivateSpinner(false);
            setOpen(false);
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
        if (state === 'INC') {
            setNewState('Habilitar');
        } else {
            setNewState('Deshabilitar');
        }
    }, [state])

    return (
        <Dialog open={open} fullWidth maxWidth="sm" >
            {activateSpinner ? <Spinner /> : null}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
                <Stack direction="column" spacing={2} sx={{ width: "100%" }} alignItems='center'>
                    <Typography variant="h5">{`Desea ${newState} el producto`}</Typography>
                    <Stack direction="row" spacing={2} sx={{ width: "100%" }} justifyContent="center">
                        <Button variant="contained" onClick={() => deleteProduct()}>Aceptar</Button>
                        <Button variant="contained" onClick={handleClose} color="error">Cancelar</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Dialog>
    )
}
