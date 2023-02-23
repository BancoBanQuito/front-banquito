import { Search, Visibility } from '@mui/icons-material';
import { Typography, Box, TextField, InputAdornment } from '@mui/material';
import React, { FormEvent, useEffect, useState } from 'react';
import { AccountStatementService } from '../../../services/account/AccountStatementService';
import { RSAccountStatement } from '../../../services/account/dto/RSAccountStatement';
import { RSAccountStatementList } from '../../../services/account/dto/RSAccountStatementList';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import ButtonIcon from '../../atoms/ButtonIcon';
import { SizeButton } from '../../atoms/SizeButton';
import TableMolecule from '../../molecules/TableMolecule';

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

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [activeAccountStatement, setactiveAccountStatement] = useState<boolean>(false);
    const [activeAccountStatementTable, setactiveAccountStatementTable] = useState<boolean>(false);
    const [selectedAccountStatement, setselectedAccountStatement] = useState<RSAccountStatement>();
    const [codeLocalAccount, setcodeLocalAccount] = useState<string>("");
    const [accounts, setaccounts] = useState<{ name: string, value: string }[]>([]);

    useEffect(() => {
        setactualArrayState(props.data);
        return () => { }
    }, [props.data])


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

    const generateAccountStatement = async () => {
        setisLoading(true);
        try {
            const data: RSAccountStatement | undefined = (await AccountStatementService.getStatementCurrent(codeLocalAccount)).data.data;
            if (data) {
                setactiveAccountStatementTable(false);
                setselectedAccountStatement(data);
                setactiveAccountStatement(true);
            } else {
                setactiveErrorModal(true);
                seterrorMessage("No se han encontrado datos");
            }
        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
        } finally {
            setisLoading(false);
        }
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
                mb={2}
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

            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <SizeButton
                    text={'Ver Estado de Cuenta'}
                    style={ButtonStyle.BIG}

                    onClick={() => generateAccountStatement()}
                    palette={{
                        backgroundColor: ColorPalette.PRIMARY
                    }} />
            </div>
            <Box sx={{ height: 10 }}>
            </Box>
            <TableMolecule color={ColorPalette.SECONDARY}
                headers={headers}
                rows={actualArrayState.map(accountStatement => getRow(accountStatement))} />
        </div >
    )
}

export default AccountStatementTable
