import React from 'react'
import { Typography } from '@mui/material'
import { SizeButton } from '/src/components/atoms/SizeButton';
import TableMolecule from '/src/components/molecules/TableMolecule';
import { ButtonStyle } from '/src/style/ButtonStyle';
import { ColorPalette } from '/src/style/ColorPalette';

interface AccountConfigurationTableOranismProps {
    accountConfiguration: {
        NoCuenta: string,
        tipoCuenta: string,
        status: string,
        saldoContable: string,
        saldoDisponible: string
    }[],
    onClick?: (data: any) => void;
}

const AccountConfigurationTableOranism = (props: AccountConfigurationTableOranismProps) => {
    const getRows = (data: any) => {
        return [
            <Typography>{data.NoCuenta}</Typography>,
            <Typography>{data.tipoCuenta}</Typography>,
            <Typography>{data.status}</Typography>,
            <Typography>{data.saldoContable}</Typography>,
            <Typography>{data.saldoDisponible}</Typography>,
            <SizeButton
                text={"Configurar"}
                style={ButtonStyle.MEDIUM}
                palette={{
                    backgroundColor: ColorPalette.PRIMARY,
                }}
                onClick={() => props.onClick?.(null)} />
        ]
    }

    return (
        <div style={{ textTransform: 'uppercase' }}>
            <TableMolecule
                headers={[
                    <Typography>No. Cuenta</Typography>,
                    <Typography>Tipo Cuenta</Typography>,
                    <Typography>Nombre</Typography>,
                    <Typography>Saldo Contable</Typography>,
                    <Typography>Saldo Disponible</Typography>,
                    <Typography></Typography>,
                ]}
                rows={props.accountConfiguration.map(signature => getRows(signature))}
            />
        </div>
    )
}

export default AccountConfigurationTableOranism