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
    account: RSAccountCancelTable
    onClick?: (data: any) => void;
}

const CancelAccountTableOranism = (props: CancelAccountTableOranismProps) => {
    /* const getRows = (product: any, account: any) => {
        return [
            <Typography>{data.identification}</Typography>,
            <Typography>{data.identifucationType}</Typography>,
            <Typography>{data.name}</Typography>,
            <Typography>{data.rol}</Typography>,
            <Typography>{data.status}</Typography>,
            <SizeButton
                text={"Agregar"}
                style={ButtonStyle.MEDIUM}
                palette={{
                    backgroundColor: ColorPalette.PRIMARY,
                }}
                onClick={() => props.onClick?.(data)} />
        ]
    }

    return (
        <div style={{ textTransform: 'uppercase' }}>
            <TableMolecule
                headers={[
                    <Typography>Identificación</Typography>,
                    <Typography>Tipo Identificación</Typography>,
                    <Typography>Nombre</Typography>,
                    <Typography>Rol</Typography>,
                    <Typography>Estatus</Typography>,
                    <Typography></Typography>,
                ]}
                rows={props.accountSignature.map(signature => getRows(signature))}
            />
        </div>
    ) */
}

export default CancelAccountTableOranism