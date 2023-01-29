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
import UserCard from '../../molecules/UserCard';
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



    return (
        <Container>
            <Content>
                <UserCard
                    name="Interes Rate"
                    accountNumber='123456789'
                    saldo={1000000}
                    accountType='Savings'
                />
            </Content>
        </Container>
    )
}

export default InteresRate;
