import React from 'react'
import { Container, Content, ReturnButton } from './InteresRate'

// icon keyboar backspace
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ButtonIcon from '../../atoms/ButtonIcon';
// search icon
import SearchIcon from '@mui/icons-material/Search';
import { ColorPalette } from '../../../style/ColorPalette';
import styled from 'styled-components';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import { Dropdown } from '../../atoms/Dropdown';
import { SizeButton } from '../../atoms/SizeButton';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { string } from 'prop-types';
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import InterestRateService from '../../../services/product/interestrate/interestRate.service';
import IInterestRateAdd from '../../../services/product/models/interestRate.model';
// ContainParent
export const ContainParent = styled.div`
display: grid;
grid-template-columns: 0.6fr 1fr;
grid-template-rows: repeat(3, 1fr);
grid-column-gap: 10px;
grid-row-gap: 2rem;
padding: 1rem;
justify-content: center;
align-items: center;

`;

const interestTypes: [{ name: string, value: string }] = [{ name: 'Activo', value: 'ACT' }, { name: 'Pasivo', value: 'PAS' }]

// ContainChild
export const ContainChild = styled.div`
grid-area: 1 / 1 / 2 / 2;`;

// ContainChild
export const ContainChild2 = styled.div`
grid-area: 1 / 2 / 2 / 3;
padding-bottom: 1rem;
`;

// ContainChild
export const ContainChild3 = styled.div`
grid-area: 2 / 1 / 3 / 2;
`;

// ContainChild
export const ContainChild4 = styled.div`
grid-area: 2 / 2 / 3 / 3;
padding-bottom: 1rem;
`;

// ContainChild
export const ContainChild5 = styled.div`
grid-area: 3 / 1 / 4 / 2;`;

// ContainChild
export const ContainChild6 = styled.div`
grid-area: 3 / 2 / 4 / 3;
padding-bottom: 1rem;`;

// ContainerButtons
export const ContainerButtons = styled.div`
display: flex;
flex-direction: row;
align-items: space-between;
padding: 20px;
max-width: 500px;
justify-content: space-evenly;
`;
export const ContentForm = styled.div`
    display: grid;
    justify-items: center;
    margin-top: 2rem;
`;

export const ContainerForm = styled.div`
    display: flex;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    align-items: center;
`;

export const Span = styled.span`
    margin-inline: 1rem;
`;
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface FormInterestRateProps {
    action: () => void;
    setValue: (value:boolean) => void;
    isCreate: boolean;
}

const FormInterestRate = ({
    action, setValue, isCreate
}: FormInterestRateProps) => {

    const [type, setType] = useState<string>('');
    const [calcBase, setCalcBase] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [severity, setSeverity] = React.useState<any>('success');
    const createInterestRate = async () => {
        if (isDisabled) {
            setMessage('Debe llenar todos los campos');
            setSeverity('error');
            setOpen(true);
        } else {
            console.log('createInterestRate')
            let data: IInterestRateAdd = {
                name: name,
                type: type,
                calcBase: calcBase
            }
            let response = await InterestRateService.addInterestRate(data);
            if (response.status === 200) {
                setMessage('Tasa de interes creada correctamente');
                setSeverity('success');
                setOpen(true);
                setValue(!isCreate);
                // setear los valores
                setType('');
                setCalcBase('');
                setName('');

            } else {
                setMessage('Error al crear la tasa de interes');
                setSeverity('error');
                setOpen(true);
            }

        }
    }
    useEffect(() => {
        if (type !== '' && calcBase !== '' && name !== '') {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [type, calcBase, name]);


    return (
        <ContainerForm>
            <ContentForm>
                <ReturnButton>
                    <ButtonIcon color={ColorPalette.PRIMARY} icon={<KeyboardBackspaceIcon />} onClick={() => action()} top={true} />
                </ReturnButton>
                <h1>Formulario de Tasa de Interes</h1>
                <ContainParent>
                    <ContainChild>
                        <span>Nombre:</span>
                    </ContainChild>
                    <ContainChild2>
                        <TextFieldAtom id="id" value={name} label="Nombre tasa de interes" color="primary" type="text" placeholder="id" variant="standard" action={(event) => setName(event.target.value)} />
                    </ContainChild2>
                    <ContainChild3>
                        <span>Tipo:</span>
                    </ContainChild3>
                    <ContainChild4>
                        <Dropdown label='Seleccionar' items={interestTypes} width={200} height={40}
                            onChange={(value: string) => setType(value)}
                            backgroundColor={ColorPalette.SECONDARY}
                        />
                    </ContainChild4>
                    <ContainChild5>
                        <span>Base de Cálculo:</span>
                    </ContainChild5>
                    <ContainChild6>
                        <TextFieldAtom id="id" value={calcBase} label="Base de Cálculo" color="primary" type="text" placeholder="id" variant="standard" action={(event) => setCalcBase(event.target.value)} />
                    </ContainChild6>
                </ContainParent>
                <ContainerButtons>
                    <Span>
                        <SizeButton palette={{ backgroundColor: ColorPalette.TERNARY }}
                            icon=''
                            onClick={() => createInterestRate()}
                            text='Crear'
                            style={ButtonStyle.BIG}
                        />
                    </Span>
                    <Span>
                        <SizeButton palette={{ backgroundColor: ColorPalette.PRIMARY }}
                            icon=''
                            onClick={() => action()}
                            text='Cancelar'
                            style={ButtonStyle.BIG}
                        />
                    </Span>
                </ContainerButtons>

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

export default FormInterestRate