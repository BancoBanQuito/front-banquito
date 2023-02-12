import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import ButtonIcon from '../../atoms/ButtonIcon';
import { SizeButton } from '../../atoms/SizeButton';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import TableMolecule from '../../molecules/TableMolecule';
import { Add, KeyboardBackspace, Search } from '@mui/icons-material';

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
                    <ButtonIcon color={ColorPalette.PRIMARY} icon={<KeyboardBackspace />} onClick={() => console.log('Buscar')} top={true} />
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
                            onChange={(event) => setInteresRate(event.target.value)}
                            value={interesRate}
                        />
                        <SizeButton palette={{ backgroundColor: ColorPalette.PRIMARY }}
                            icon={<Search />}
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
                            icon={<Add />}
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
