import React from 'react'
import { Typography } from '@mui/material'
import { SizeButton } from '/src/components/atoms/SizeButton';
import TableMolecule from '/src/components/molecules/TableMolecule';
import { RSSignature } from '/src/services/account/dto/RSSignature';
import { ButtonStyle } from '/src/style/ButtonStyle';
import { ColorPalette } from '/src/style/ColorPalette';
import { RSProductTypeAndClientName } from '/src/services/account/dto/RSProductTypeAndClientName';
import { RSAccount } from '/src/services/account/dto/RSAccount';
import { RSAccountCancelTable } from '/src/services/account/dto/RSAccountCancelTable';

interface CancelAccountTableOranismProps {
    account: RSAccount
    onClick?: (data: any) => void;
}

const CancelAccountTableOranism = (props: CancelAccountTableOranismProps) => {
    // const getRows = (account: any) => {
    //     return [
    //         <Typography>{account.codeLocalAccount}</Typography>,
    //         <Typography>{account.product}</Typography>,
    //         <Typography>{account.status}</Typography>,
    //         <Typography>{account.presentBalance}</Typography>,
    //         <Typography>{account.availableBalance}</Typography>,
    //         <SizeButton
    //             text={"Agregar"}
    //             style={ButtonStyle.MEDIUM}
    //             palette={{
    //                 backgroundColor: ColorPalette.PRIMARY,
    //             }}
    //             onClick={() => props.onClick?.(account)} />
    //     ]
    // }

    return (
        <div style={{ textTransform: 'uppercase' }}>
            <TableMolecule
                headers={[
                    <Typography>Nro. Cuenta</Typography>,
                    <Typography>Producto</Typography>,
                    <Typography>Estado</Typography>,
                    <Typography>Saldo Contable</Typography>,
                    <Typography>Saldo Disponible</Typography>,
                    <Typography></Typography>,
                ]}
                rows={
                    [
                        [<Typography>{props.account.codeLocalAccount}</Typography>,
                        <Typography>{props.account.product}</Typography>,
                        <Typography>{props.account.status}</Typography>,
                        <Typography>{props.account.presentBalance}</Typography>,
                        <Typography>{props.account.availableBalance}</Typography>,
                        <SizeButton
                            text={"Agregar"}
                            style={ButtonStyle.MEDIUM}
                            palette={{
                                backgroundColor: ColorPalette.PRIMARY,
                            }}
                            onClick={() => props.onClick?.(props.account)} />
                        ]]
                }
            />
        </div>
    ) 
}

export default CancelAccountTableOranism