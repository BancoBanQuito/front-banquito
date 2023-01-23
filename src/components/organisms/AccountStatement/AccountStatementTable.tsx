import React, { FormEvent, useEffect, useState } from 'react'
import { AccountStament } from '../../../services/account/model/AccountStatement'
import TableMolecule from '../../molecules/TableMolecule'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import { ColorPalette } from '../../../style/ColorPalette'
import ButtonIcon from '../../atoms/ButtonIcon'
import { Search, Visibility } from '@mui/icons-material'
import { SizeButton } from '../../atoms/SizeButton'
import { ButtonStyle } from '../../../style/ButtonStyle'

interface AccountStatementTableProps {
    data: AccountStament[],
    onSelection: (data: AccountStament) => void;
}

const headers = [
    <Typography>fecha</Typography>,
    <Typography>debito/creditos</Typography>,
    <Typography>credito/retiros</Typography>,
    <Typography>balance</Typography>,
    <Typography>interes</Typography>,
    <Typography>abrir</Typography>
]

const AccountStatementTable = (props: AccountStatementTableProps) => {


    const [searchString, setsearchString] = useState<string>("");
    const [hasSearch, sethasSearch] = useState<boolean>(false);
    const [lastArrayState, setlastArrayState] = useState<AccountStament[]>([])
    const [actualArrayState, setactualArrayState] = useState<AccountStament[]>(props.data);

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sethasSearch(true);
        setlastArrayState(actualArrayState);
        setactualArrayState([]);
        const searchResult: AccountStament[] = actualArrayState.filter(data => searchString === data.actualCutOffDate)
        setactualArrayState(searchResult);
    }

    const restoreAccountStatements = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sethasSearch(false);
        setactualArrayState(lastArrayState);
        setlastArrayState([]);
        setsearchString("");
    }

    const getRow = (data: AccountStament) => {
        return [
            <Typography>{data.actualCutOffDate}</Typography>,
            <Typography>{1}</Typography>,
            <Typography>{1}</Typography>,
            <Typography>{data.presentBalance}</Typography>,
            <Typography>{data.interestRate}</Typography>,
            <Typography><ButtonIcon color={ColorPalette.PRIMARY}
                icon={<Visibility />}
                onClick={() => props.onSelection(data)} /></Typography>
        ]
    }

    return (
        <div style={{
            width: '100%'
        }}>
            <Box
                mb={5}
                component='form'
                onSubmit={!hasSearch ? handleSearch : restoreAccountStatements}
                style={{
                    width: '100%'
                }}>
                <TextField
                    label="Buscar por fecha"
                    variant="outlined"
                    onChange={(value) => setsearchString(value.target.value)}
                    value={searchString}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <SizeButton
                                    submit
                                    style={ButtonStyle.SMALL}
                                    palette={{
                                        backgroundColor: ColorPalette.SECONDARY
                                    }} text={!hasSearch ? 'Buscar' : 'Resetear'} />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
            <TableMolecule color={ColorPalette.SECONDARY}
                headers={headers}
                rows={actualArrayState.map(accountStatement => getRow(accountStatement))} />
        </div >
    )
}

export default AccountStatementTable