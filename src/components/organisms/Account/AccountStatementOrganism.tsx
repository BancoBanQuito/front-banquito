import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import { SizeButton } from '../../atoms/SizeButton'
import { ButtonStyle } from '../../../style/ButtonStyle'
import { ColorPalette } from '../../../style/ColorPalette'
import { RSAccountStatementList } from '../../../services/account/dto/RSAccountStatementList'
import AccountStatementItemMolecule from '../../molecules/AccountStatementItemMolecule'

interface AccountStatementOrganismProps {
    accountStatements: RSAccountStatementList[];
    onClick?: () => void;
    onSelect?: (id: string) => void;
}

const AccountStatementOrganism = (props: AccountStatementOrganismProps) => {
    return (
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
                    onClick={props.onClick}
                    palette={{
                        backgroundColor: ColorPalette.PRIMARY
                    }} />
            </div>
            <hr style={{ width: "100%" }} />
            {
                props.accountStatements.length <= 0 ?
                    <>
                        <Typography variant='h6' color='secondary'>Lo sentimos</Typography>
                        <Typography variant='body1'>Parece que aun no has generado un estado de cuenta</Typography>

                    </> :
                    <Box sx={{ width: '100%', marginLeft: '1rem' }}>
                        {
                            props.accountStatements.map(accountStatementItem => {
                                return <AccountStatementItemMolecule accountStatementList={accountStatementItem} onClick={props.onSelect} />;
                            })
                        }
                    </Box>
            }
        </Card>
    )
}

export default AccountStatementOrganism