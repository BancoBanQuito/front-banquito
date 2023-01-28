import React, { useEffect } from 'react'
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
    const [rows, setRows] = React.useState<any[]>([]);
    useEffect(() => {
        setRows(props.accountSignature.map(signature => getRows(signature)))
    }, [props.accountSignature])

    

    const getRows = (data: RSSignature) => {
        return [
            <Typography>{data.identificationType}</Typography>,
            <Typography>{data.identification}</Typography>,
            <Typography>{data.name}</Typography>,
            <Typography>{data.role}</Typography>,
            <Typography>{data.status}</Typography>,
            <SizeButton
                text={"Editar"}
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
                    <Typography>Tipo Identificación</Typography>,
                    <Typography>Identificación</Typography>,
                    <Typography>Nombre</Typography>,
                    <Typography>Rol</Typography>,
                    <Typography>Estatus</Typography>,
                    <Typography></Typography>,
                ]}
                rows={rows}
            />
        </div>
    )
}

export default AccountSignatureTableOranism