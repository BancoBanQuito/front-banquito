import React, { useState, useEffect } from 'react';
import { Dropdown } from '../../atoms/Dropdown';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import { ContainerButtons, ContainerForm, ContentForm } from '../interestrate/FormInterestRate';
import { Container } from '../interestrate/InteresRate';
import RequestServiceService from '../../../services/product/asociatedServices/asociatedServices.service';
import styled from 'styled-components';
import { SizeButton } from '../../atoms/SizeButton';
import { ColorPalette } from '../../../style/ColorPalette';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { Spinner } from '../../atoms/Spinner';
interface AddParamProps {
    account: string;
    action: () => void;
    name: string;
}

const AddValueParam = ({ account, action, name }: AddParamProps) => {

    const [type, setType] = useState('');
    const [valueParams, setValueParams] = useState<any>([]);
    const [isCharge, setIsCharge] = useState(false);
    const [params, setParams] = useState([]);

    const addValueParam = (value: string, nameParam: string) => {
        let param = {
            name: nameParam,
            value: value
        }
        let newParams = [...valueParams, param];
        setValueParams(newParams);
    }


    const getParams = async () => {
        setIsCharge(true);
        try {
            setIsCharge(true);
            let response = await RequestServiceService.getAsociatedServices();
            // filter by name
            console.log(response);
            let filter = response.filter((item: any) => item.name.toLowerCase() == name.toLowerCase());
            console.log(filter);
            
            let params = filter[0].params;
            console.log(params);
            setParams(params);

            setIsCharge(false);

        } catch (error) {
            setIsCharge(false);
            console.log(error);
        }
        setIsCharge(false);
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

    useEffect(() => {
        getParams();
    }, []);


    return (
        <ContainerForm>
            {isCharge ? <Spinner /> : null}
            <ContentForm>
                <h1>Agregar Datos</h1>
                {params.map((item: any) => {
                    return (
                        <ContentInput>
                            <Span>{item.name}:</Span>
                            <TextFieldAtom value={item.value} action={(e) => addValueParam(e.target.value, item.name)}
                                variant="standard" color="primary" type="text" label="Valor del parametro" id="name" />
                        </ContentInput>
                    )
                })
                }

                <ContainerButtons>
                    <Span>
                        <SizeButton palette={{ backgroundColor: ColorPalette.TERNARY }}
                            icon=''
                            onClick={() => { }}
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

export default AddValueParam;