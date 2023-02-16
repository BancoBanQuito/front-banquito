import React, { FormEvent } from 'react'
import { AssociatedServiceRSRQ } from '../../services/product/dto/AssociatedServiceRSRQ'
import { RSAccount } from '../../services/account/dto/RSAccount';
import { Box } from '@mui/material';
import { Dropdown } from '../atoms/Dropdown';
import { SizeButton } from '../atoms/SizeButton';
import { ButtonStyle } from '../../style/ButtonStyle';
import { ColorPalette } from '../../style/ColorPalette';

interface AssociateServiceFormProps {
    services: AssociatedServiceRSRQ[];
    accounts: RSAccount[];
    defaultService?: AssociatedServiceRSRQ;
    onSubmit?: () => void;
    onCancel?: () => void;
}

const servicesToDropdown = (services: AssociatedServiceRSRQ[]) => {
    return services.map(service => {
        return {
            name: service.name,
            value: service.id
        };
    })
}

const accountToDropdown = (accounts: RSAccount[]) => {
    return accounts.map(account => {
        return {
            name: account.codeLocalAccount,
            value: account.codeLocalAccount
        };
    })
}

const AssociateServiceForm = (props: AssociateServiceFormProps) => {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit?.();
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 500
            }}>
            <div style={{ margin: '0.5rem 0' }}>
                <Dropdown
                    label={'Servicios'}
                    items={servicesToDropdown(props.services)}
                    defaultValue={props.defaultService?.id || props.services[0].id}
                    width={'100%'}
                    height={'auto'}
                    backgroundColor='white' />
            </div>
            <div style={{ margin: '0.5rem 0' }}>
                <Dropdown
                    label={'Tus Cuentas'}
                    items={accountToDropdown(props.accounts)}
                    defaultValue={props.accounts[0].codeLocalAccount}
                    width={'100%'}
                    height={'auto'}
                    backgroundColor='white' />
            </div>
            <div style={{ margin: '0.5rem 0', display: 'flex', justifyContent: 'space-evenly' }}>
                {
                    props.onCancel && <SizeButton
                        text={'Cancelar'}
                        style={ButtonStyle.BIG}
                        onClick={props.onCancel}
                        palette={{
                            backgroundColor: ColorPalette.SECONDARY
                        }} />
                }
                <SizeButton
                    submit
                    text={'Solicitar'}
                    style={ButtonStyle.BIG} palette={{
                        backgroundColor: ColorPalette.PRIMARY
                    }} />
            </div>
        </Box>
    )
}

export default AssociateServiceForm