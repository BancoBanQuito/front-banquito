import { Snackbar, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import InterestRateService from '../../../services/product/interestrate/interestRate.service';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import ButtonIcon from '../../atoms/ButtonIcon';
import { Dropdown } from '../../atoms/Dropdown';
import { NumberField } from '../../atoms/NumberField';
import { SizeButton } from '../../atoms/SizeButton';
import { ContentForm, ContainerForm, ContainChild, ContainChild2, ContainChild3, ContainChild4 } from './FormInterestRate';
import { ReturnButton } from './InteresRate';
import { KeyboardBackspace } from '@mui/icons-material';
import { Spinner } from '../../atoms/Spinner';

const ContentFormLog = styled(ContentForm)`
    justify-content: flex-end;
`;
interface FormInterestRateLogProps {
    action: () => void;
    setVal: (value: boolean) => void;
    isCreate: boolean;
}

export const ParentContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 2rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    `;




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
        <ContainerForm>
            {activateSpinner ? <Spinner /> : null}
            <ContentForm>
                <ReturnButton>
                    <ButtonIcon color={ColorPalette.PRIMARY} icon={<KeyboardBackspace />} onClick={() => action()} top={true} />
                </ReturnButton>
                <h1>Formulario de Registro Tasa de Interes</h1>
                <ParentContainer>
                    <ContainChild>
                        <span>Seleccionar Nombre:</span>
                    </ContainChild>
                    <ContainChild2>
                        <Dropdown label='Seleccionar' items={itemsSelect} width={200} height={40}
                            onChange={(value: string) => setNameSelect(value)}
                            selectedTextColor={ColorPalette.TERNARY}
                        />

                    </ContainChild2>
                    <ContainChild3>
                        <span>Valor:</span>
                    </ContainChild3>
                    <ContainChild4>
                        <NumberField
                            label="Valor"
                            value={value}
                            action={(value: number) => setValue(value)}

                        />
                    </ContainChild4>

                    <SizeButton palette={{ backgroundColor: ColorPalette.TERNARY }}
                        icon=''
                        onClick={() => createInterestRateLog()}
                        text='Crear'
                        style={ButtonStyle.BIG}
                    />

                    <SizeButton palette={{ backgroundColor: ColorPalette.PRIMARY }}
                        icon=''
                        onClick={() => action()}
                        text='Cancelar'
                        style={ButtonStyle.BIG}
                    />

                </ParentContainer>

            </ContentForm>
            <Snackbar open={open} autoHideDuration={5000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </ContainerForm>
    )
}

export default FormInterestRateLog
