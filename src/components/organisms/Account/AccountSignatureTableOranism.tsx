import React from 'react'
import { Typography } from '@mui/material'
import { SizeButton } from '/src/components/atoms/SizeButton';
import TableMolecule from '/src/components/molecules/TableMolecule';
import { RSSignature } from '/src/services/account/dto/RSSignature';
import { ButtonStyle } from '/src/style/ButtonStyle';
import { ColorPalette } from '/src/style/ColorPalette';

interface AccountSignatureTableOranismProps {
    accountSignature: RSSignature[],
    onClick?: (data: any) => void;
}

const AccountSignatureTableOranism = (props: AccountSignatureTableOranismProps) => {
    const getRows = (data: any) => {
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
    )
}

export default AccountSignatureTableOranism