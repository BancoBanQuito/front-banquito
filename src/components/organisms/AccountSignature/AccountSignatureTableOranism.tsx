import { Typography } from '@mui/material'
import React from 'react'
import { ButtonStyle } from '../../../style/ButtonStyle'
import { ColorPalette } from '../../../style/ColorPalette'
import { SizeButton } from '../../atoms/SizeButton'
import TableMolecule from '../../molecules/TableMolecule'
import { AccountSignature } from '../../../services/account/model/AccountSignature'

interface AccountSignatureTableOranismProps {
    accountSignature: AccountSignature[],
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