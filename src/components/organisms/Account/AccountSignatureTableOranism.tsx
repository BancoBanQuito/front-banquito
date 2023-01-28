import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { RSSignature } from '../../../services/account/dto/RSSignature';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import { SizeButton } from '../../atoms/SizeButton';
import TableMolecule from '../../molecules/TableMolecule';

interface AccountSignatureTableOranismProps {
    accountSignature: RSSignature[],
    onClick?: (data: RSSignature) => void;
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