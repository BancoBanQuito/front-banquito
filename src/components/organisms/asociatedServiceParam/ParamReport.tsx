import React, { useEffect, useState } from 'react';
import { Dropdown } from '../../atoms/Dropdown';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import { ContainerButtons, ContainerForm, ContentForm } from '../interestrate/FormInterestRate';
import { Container, ReturnButton } from '../interestrate/InteresRate';
import RequestServiceService from '../../../services/product/asociatedServices/asociatedServices.service';
import styled from 'styled-components';
import { SizeButton } from '../../atoms/SizeButton';
import { ColorPalette } from '../../../style/ColorPalette';
import { ButtonStyle } from '../../../style/ButtonStyle';
import TableMolecule from '../../molecules/TableMolecule';
import { Typography } from '@mui/material';
import ButtonIcon from '../../atoms/ButtonIcon';
import { KeyboardBackspace } from '@mui/icons-material';

interface AddParamProps {
    id: string;
    action: () => void;
    name: string;
}

const ParamReport = ({ id, action, name }: AddParamProps) => {

    const [isCharge, setIsCharge] = useState(false);
    const [rows, setRows] = useState([]);
    const createParam = async () => {

        setIsCharge(true);
        try {
            let response = await RequestServiceService.getAsociatedServices();
            console.log(response);
            // filter by id
            let filter = response.filter((item: any) => item.id === id);
            let params = filter[0].params;
            let rowsList = params.map((item: any) => {
                return [
                    <Typography>{item.name}</Typography>,
                    <Typography>{item.valueType}</Typography>
                ]
            })
            setRows(rowsList);
            setIsCharge(false);
        } catch (error) {
            setIsCharge(false);
            console.log(error);
        }
        // let response = await ParamService.createParam(param);
        // console.log(response);
    }
    useEffect(() => {
        createParam();
    }, [])

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
            <ReturnButton>
                <ButtonIcon color={ColorPalette.PRIMARY} icon={<KeyboardBackspace />} onClick={() => action()} top={true} />
            </ReturnButton>
            <ContentForm>
                <h1>Parametros {name}</h1>

                <TableMolecule
                    headers={[<Typography>Nombre</Typography>
                        , <Typography>Tipo de dato</Typography>]}
                    rows={rows}
                />


            </ContentForm>
        </ContainerForm>
    );
};

export default ParamReport;