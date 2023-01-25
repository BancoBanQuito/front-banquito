import React, { useEffect, useState } from 'react'
import { Alert, ContainChild, ContainChild2, ContainChild3, ContainChild4, ContainChild5, ContainChild6, ContainerButtons, ContainerForm, ContainParent, ContentForm } from './FormInterestRate';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import styled from 'styled-components';
import Snackbar from '@mui/material/Snackbar';
import ButtonIcon from 'src/components/atoms/ButtonIcon';
import { Dropdown } from 'src/components/atoms/Dropdown';
import { NumberField } from 'src/components/atoms/NumberField';
import { SizeButton } from 'src/components/atoms/SizeButton';
import InterestRateService from 'src/services/product/interestrate/interestRate.service';
import { ButtonStyle } from 'src/style/ButtonStyle';
import { ColorPalette } from 'src/style/ColorPalette';
import { ReturnButton } from './InteresRate';

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

    const getItems = async () => {
        let data = await InterestRateService.getInterestRateAll();
        setItems(data);
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
            let response = await InterestRateService.addInterestRateValue(data);
            console.log(response);
            if (response.status == 200) {
                setMessage('Registro exitoso');
                setSeverity('success');
                setOpen(true);
                setVal(!isCreate)
                // setear los valores a 0
                setValue(0);
                setNameSelect('');

            } else {
                setMessage('Error al registrar');
                setSeverity('error');
                setOpen(true);
            }
        }
    }

    return (
        <ContainerForm>
            <ContentForm>
                <ReturnButton>
                    <ButtonIcon color={ColorPalette.PRIMARY} icon={<KeyboardBackspaceIcon />} onClick={() => action()} top={true} />
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
