import { AlertColor, Box, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SizeButton } from '../../atoms/SizeButton'
import { ButtonStyle } from '../../../style/ButtonStyle'
import { ColorPalette } from '../../../style/ColorPalette'
import { RSAccountStatementList } from '../../../services/account/dto/RSAccountStatementList'
import AccountStatementItemMolecule from '../../molecules/AccountStatementItemMolecule'
import { AccountStatementService } from '../../../services/account/AccountStatementService'
import SnackBarMolecule from '../../molecules/SnackBarMolecule'
import LoadOrganism from '../LoadOrganism'

interface AccountStatementOrganismProps {
    codeLocalAccount: string;
    onClick?: () => void;
    onSelect?: (id: string) => void;
}

const AccountStatementPage = (props: AccountStatementOrganismProps) => {

    const [accountStatements, setaccountStaments] = useState<RSAccountStatementList[]>([]);

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [messageLoading, setmessageLoading] = useState<string | undefined>();

    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

    useEffect(() => {
        retriveAccountStatementList(props.codeLocalAccount);
        return () => { }
    }, [props.codeLocalAccount])


    const retriveAccountStatementList = async (id: string) => {
        setisLoading(true);
        try {
            const data: RSAccountStatementList[] = (await AccountStatementService.getStatementList(id)).data.data || [];
            setaccountStaments(data);
        } catch (error) {
            setmessageSnack("Ha ocurrido un error");
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const openInNewTab = (id: string) => {
        window.open(`/cliente/cuenta/estado/${id}`, '_blank');
    }

    return (
        <>
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem'
            }}
                variant='outlined'>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                    <SizeButton
                        text={'Ver estado de cuenta'}
                        style={ButtonStyle.BIG}
                        onClick={() => openInNewTab(`1-${props.codeLocalAccount}`)}
                        palette={{
                            backgroundColor: ColorPalette.PRIMARY
                        }} />
                </div>
                <hr style={{ width: "100%" }} />
                {
                    accountStatements.length <= 0 ?
                        <>
                            <Typography variant='h6' color='secondary'>Lo sentimos</Typography>
                            <Typography variant='body1'>Parece que aun no has generado un estado de cuenta</Typography>

                        </> :
                        <Box sx={{ width: '100%', marginLeft: '1rem' }}>
                            {
                                accountStatements.map(accountStatementItem => {
                                    return <AccountStatementItemMolecule accountStatementList={accountStatementItem} onClick={() => openInNewTab(accountStatementItem.code)} />;
                                })
                            }
                        </Box>
                }
            </Card>
            <LoadOrganism
                active={isLoading}
                text={messageLoading} />
            <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
        </>
    )
}

export default AccountStatementPage