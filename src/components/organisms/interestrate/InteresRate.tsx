import { TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import TableMolecule from '../../molecules/TableMolecule';
import ButtonIcon from '../../atoms/ButtonIcon';
// search icon
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
// icon keyboar backspace
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ColorPalette } from '../../../style/ColorPalette';
// Add icon
import AddIcon from '@mui/icons-material/Add';
import { SizeButton } from '../../atoms/SizeButton';
import { ButtonStyle } from '../../../style/ButtonStyle';
import FormInterestRate from './FormInterestRate';
import FormInterestRateLog from './FormInterestRateLog';
// add circle icon

// Styles
export const Container = styled.div`
display: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-top: 3rem;
    `;

export const Content = styled.div`
    margin-left: 9rem;`;

// Container for the search
export const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 20px;
    max-width: 360px;
    margin-bottom: 2rem;
    margin-top: 2rem;
    `;

// content button add position Right
export const ContentButtonAddRight = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1rem;
    `;

// returnButton
export const ReturnButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: left;
    position: absolute;
    margin: 1rem;
    margin-top: 4rem;
    left: 0;
    top: 0;
    `;


const InteresRate = () => {

    const [interesRate, setInteresRate] = useState('');



    const headers = [
        <Typography>Nombre</Typography>,
        <Typography>Tipo</Typography>,
        <Typography>Calculo Base</Typography>,
        <Typography>Acción</Typography>,]

    const rows = [
        [<Typography>Cell 1</Typography>,
        <Typography>Cell 2</Typography>,
        <Typography>Cell 3</Typography>,
        <Typography>Cell 4</Typography>],
    ]

    useEffect(() => {
        console.log('interesRate', interesRate);
    }, [interesRate])


    return (
        <Container>
            <Content>
                <ReturnButton>
                    <ButtonIcon color={ColorPalette.PRIMARY} icon={<KeyboardBackspaceIcon />} onClick={() => console.log('Buscar')} top={true} />
                </ReturnButton>
                <div>
                    <h1>Tasas de Interés</h1>
                </div>
                {/* Buscar tasa de interes */}
                <div>
                    <SearchContainer>

                        <span>Nombre: </span>
                        <TextFieldAtom
                            id="id"
                            label="Nombre tasa de interes"
                            color="primary"
                            type="text"
                            placeholder="id"
                            variant="standard"
                            action={(event) => setInteresRate(event.target.value)}
                            value={interesRate}
                        />
                        <SizeButton palette={{ backgroundColor: ColorPalette.PRIMARY }}
                            icon={<SearchIcon />}
                            onClick={() => console.log('Buscar')}
                            text="Buscar"
                            style={ButtonStyle.MEDIUM}
                        />
                    </SearchContainer>
                    <div>
                        <TableMolecule headers={headers} rows={rows} />
                    </div>

                    <ContentButtonAddRight>
                        <SizeButton palette={{ backgroundColor: ColorPalette.TERNARY }}
                            icon={<AddIcon />}
                            onClick={() => console.log('Buscar')}
                            text="Agregar"
                            style={ButtonStyle.BIG}
                        />
                    </ContentButtonAddRight>
                </div>
            </Content>
        </Container>
    )
}

export default InteresRate;
