import React, { FormEvent, useState } from 'react'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import { Search, Visibility } from '@mui/icons-material'
import ButtonIcon from 'src/components/atoms/ButtonIcon';
import { SizeButton } from 'src/components/atoms/SizeButton';
import TableMolecule from 'src/components/molecules/TableMolecule';
import { RSAccountStatementList } from 'src/services/account/dto/RSAccountStatementList';
import { ButtonStyle } from 'src/style/ButtonStyle';
import { ColorPalette } from 'src/style/ColorPalette';

interface AccountStatementTableProps {
    data: RSAccountStatementList[],
    onSelection: (data: any) => void;
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
    const [lastArrayState, setlastArrayState] = useState<RSAccountStatementList[]>([])
    const [actualArrayState, setactualArrayState] = useState<RSAccountStatementList[]>(props.data);

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sethasSearch(true);
        setlastArrayState(actualArrayState);
        setactualArrayState([]);
        const searchResult: RSAccountStatementList[] = actualArrayState.filter(data => searchString === data.currentCutOffDate.toString())
        setactualArrayState(searchResult);
    }

    const restoreAccountStatements = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sethasSearch(false);
        setactualArrayState(lastArrayState);
        setlastArrayState([]);
        setsearchString("");
    }

    const getRow = (data: RSAccountStatementList) => {
        return [
            <Typography>{data.currentCutOffDate.toString()}</Typography>,
            <Typography>{1}</Typography>,
            <Typography>{1}</Typography>,
            <Typography>{data.balance}</Typography>,
            <Typography>{data.interest}</Typography>,
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
