import { AlertProps, Box, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import { Dropdown } from '../../atoms/Dropdown';
import { SizeButton } from '../../atoms/SizeButton';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import { Spinner } from '../../atoms/Spinner';

const interestTypes: { name: string, value: string }[] = [{ name: 'Activo', value: 'ACT' }, { name: 'Pasivo', value: 'PAS' }]

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface FormInterestRateProps {
    action: () => void;
    setValue: (value: boolean) => void;
    isCreate: boolean;
}

const FormInterestRate = ({ action, setValue, isCreate }: FormInterestRateProps) => {

    const [type, setType] = useState<string>('');
    const [calcBase, setCalcBase] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [severity, setSeverity] = React.useState<any>('success');
    const [activateSpinner, setActivateSpinner] = useState(false);
    const createInterestRate = async () => {
        /* if (isDisabled) {
            setMessage('Debe llenar todos los campos');
            setSeverity('error');
            setOpen(true);
        } else {
            console.log('createInterestRate')
            let data = {
                name: name,
                type: type,
                calcBase: calcBase,
                id: "",
                value: 0,
                status: ""
            }
            setActivateSpinner(true);
            let response = await InterestRateService.addInterestRate(data);
            if (response.status === 200) {
                setActivateSpinner(false);
                setMessage('Tasa de interes creada correctamente');
                setSeverity('success');
                setOpen(true);
                setValue(!isCreate);
                // setear los valores
                setType('');
                setCalcBase('');
                setName('');

            } else {
                setActivateSpinner(false);
                setMessage('Error al crear la tasa de interes');
                setSeverity('error');
                setOpen(true);
            }

        } */
    }
    useEffect(() => {
        if (type !== '' && calcBase !== '' && name !== '') {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [type, calcBase, name]);


    return (
        <>
            {activateSpinner ? <Spinner /> : null}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h1>Formulario de Tasa de Interes</h1>
                <Box
                    component='form'
                    onSubmit={createInterestRate}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <TextFieldAtom
                        value={name}
                        label="Nombre tasa de interes"
                        color="primary"
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                        required
                        fullWidth
                        name={'interest-rate'} />
                    <TextFieldAtom
                        value={name}
                        label="Nombre tasa de interes"
                        color="primary"
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                        required
                        fullWidth
                        name={'interest-rate'} />
                    <TextFieldAtom
                        value={name}
                        label="Nombre tasa de interes"
                        color="primary"
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                        required
                        fullWidth
                        name={'interest-rate'} />
                    <Dropdown
                        label='Seleccionar'
                        required
                        items={interestTypes} width={'100%'} height={'auto'}
                        onChange={(value: string) => setType(value)}
                        backgroundColor={ColorPalette.SECONDARY}
                    />
                    <TextFieldAtom
                        required
                        fullWidth
                        value={calcBase}
                        label="Base de Cálculo"
                        color="primary"
                        type="text"
                        onChange={(event) => setCalcBase(event.target.value)}
                        name={'calc-base'} />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                        <SizeButton
                            palette={{ backgroundColor: ColorPalette.TERNARY }}
                            submit
                            text='Crear'
                            style={ButtonStyle.BIG}
                        />
                        <SizeButton palette={{ backgroundColor: ColorPalette.PRIMARY }}
                            onClick={() => action()}
                            text='Cancelar'
                            style={ButtonStyle.BIG}
                        />
                    </Box>
                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default FormInterestRate
