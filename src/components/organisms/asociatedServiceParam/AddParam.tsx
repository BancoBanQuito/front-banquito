import React, { useState } from 'react';
import { Dropdown } from '../../atoms/Dropdown';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import { ContainerButtons, ContainerForm, ContentForm } from '../interestrate/FormInterestRate';
import { Container } from '../interestrate/InteresRate';
import RequestServiceService from '../../../services/product/asociatedServices/asociatedServices.service';
import styled from 'styled-components';
import { SizeButton } from '../../atoms/SizeButton';
import { ColorPalette } from '../../../style/ColorPalette';
import { ButtonStyle } from '../../../style/ButtonStyle';
interface AddParamProps {
    id: string;
    action: () => void;
}

const AddParam = ({ id, action }: AddParamProps) => {

    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [isCharge, setIsCharge] = useState(false);

    const createParam = async () => {
        let param = {
            valueType: type,
            name: name
        }
        setIsCharge(true);
        try {
        let response = await RequestServiceService.createParam(param, id);
        console.log(param);
        console.log(response);
        action();
        } catch (error) {
            console.log(error);
        }
        // let response = await ParamService.createParam(param);
        // console.log(response);
    }

    const Span = styled.span`
    margin-inline: 1rem;
    width: 200px;
`;
    const ContentInput = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 3rem;
    align-items: center;
`;
    return (
        <ContainerForm>

            <ContentForm>
                <h1>Agregar Parametro</h1>

                <ContentInput>
                    <Span>Seleccionar tipo de dato:</Span>
                    <Dropdown
                        items={[
                            { value: 'TXT', name: 'Texto' },
                            { value: 'NUM', name: 'Numero' },
                            { value: 'DAT', name: 'Fecha' },
                        ]}
                        label="Tipo de dato"
                        selectedTextColor={ColorPalette.TERNARY}
                        height={50}
                        width={200}
                        onChange={(value: string) => setType(value)}
                        inputLabelColor={ColorPalette.TERNARY}
                    />
                </ContentInput>
                <ContentInput>
                    <Span>Nombre del parametro:</Span>
                    <TextFieldAtom value={name} action={(e) => setName(e.target.value)}
                        variant="standard" color="primary" type="text" label="Nombre del parametro" id="name" />
                </ContentInput>

                <ContainerButtons>
                    <Span>
                        <SizeButton palette={{ backgroundColor: ColorPalette.TERNARY }}
                            icon=''
                            onClick={() => createParam()}
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
        </ContainerForm>
    );
};

export default AddParam;