import { Snackbar, Alert, TextField, Box, Typography, Card } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components';
import InterestRateService from '../../../services/product/interestrate/interestRate.service';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import ButtonIcon from '../../atoms/ButtonIcon';
import { Dropdown } from '../../atoms/Dropdown';
import { SizeButton } from '../../atoms/SizeButton';
import { KeyboardBackspace } from '@mui/icons-material';
import { Spinner } from '../../atoms/Spinner';
import TextFieldAtom from '../../atoms/TextFieldAtom';

interface FormInterestRateLogProps {
    action: () => void;
    setVal: (value: boolean) => void;
    isCreate: boolean;
}

const FormInterestRateLog = ({ action, setVal, isCreate }: FormInterestRateLogProps) => {

    const [value, setValue] = useState<number>(0);
    const [nameSelect, setNameSelect] = useState<string>('');
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<any>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [items, setItems] = useState<any>([]);
    const [itemsSelect, setItemsSelect] = useState<any>([]);
    const [activateSpinner, setActivateSpinner] = useState(false);
    const getItems = async () => {
        setActivateSpinner(true);
        let data = await InterestRateService.getInterestRateAll();
        setItems(data);
        setActivateSpinner(false);
        let itemsDropdown = data.map((item: any) => {
            return {
                name: item.name,
                value: item.id
            }
        }
        )
        setItemsSelect(itemsDropdown);
    }


    useEffect(() => {
        getItems();
    }, [])


    useEffect(() => {
        if (value != 0 && nameSelect != '') {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [value, nameSelect])

    const createInterestRateLog = async () => {
        if (isDisabled) {
            setMessage('Debe llenar todos los campos');
            setSeverity('error');
            setOpen(true);
        } else {
            // buscar id por la posicion del array
            let data = {
                id: nameSelect,
                value: value,
                name: '',
                type: '',
                calcBase: '',
                status: ''
            }
            setActivateSpinner(true);
            let response = await InterestRateService.addInterestRateValue(data);
            console.log(response);
            if (response.status == 200) {
                setActivateSpinner(false);
                setMessage('Registro exitoso');
                setSeverity('success');
                setOpen(true);
                setVal(!isCreate)
                // setear los valores a 0
                setValue(0);
                setNameSelect('');

            } else {
                setActivateSpinner(false);
                setMessage('Error al registrar');
                setSeverity('error');
                setOpen(true);
            }
        } 
    }

    return (
        <>
            {activateSpinner ? <Spinner /> : null}
            <Box sx={{ height: 50 }}>
            </Box>
            <Card sx={{
                width: '100%',
                height: '100%',
                padding: 2,
                maxWidth: 600,
                maxHeight: 400
            }}
                variant='outlined'>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography variant='h5' sx={{ p: 5}}>
                        Formulario de Registro Tasa de Interes
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={createInterestRateLog}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                        <Dropdown
                            label={'Seleccionar interés'}
                            items={itemsSelect}
                            width={'100%'}
                            height={'auto'}
                            required
                            onChange={(value: string) => setNameSelect(value)}
                            selectedTextColor={ColorPalette.TERNARY}
                        />
                        <TextFieldAtom
                            type='number'
                            name="value-field"
                            color='primary'
                            label="Valor"
                            value={value}
                            required
                            fullWidth
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value as unknown as number)}
                        />
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            marginTop: '1.5rem'
                        }}>
                            <SizeButton palette={{ backgroundColor: ColorPalette.TERNARY }}
                                submit
                                text='Crear'
                                style={ButtonStyle.BIG}
                            />
                            <div style={{ margin: '0.5rem' }} />
                            <SizeButton palette={{ backgroundColor: ColorPalette.PRIMARY }}
                                onClick={() => action()}
                                text='Cancelar'
                                style={ButtonStyle.BIG}
                            />
                        </div>


                    </Box>

                </Box>
            </Card>


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

export default FormInterestRateLog
