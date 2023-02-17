import React, { FormEvent, useState } from 'react'
import { RSAccount } from '../../../services/account/dto/RSAccount'
import { Box, IconButton, Typography } from '@mui/material';
import { Dropdown } from '../../atoms/Dropdown';
import { DataToDropdownUtils } from '../../../utils/DataToDropdownUtils';
import { SizeButton } from '../../atoms/SizeButton';
import { ColorPalette } from '../../../style/ColorPalette';
import { ButtonStyle } from '../../../style/ButtonStyle';
import ModalOrganism from '../ModalOrganism';
import { Close } from '@mui/icons-material';

interface AccountCancelFormProps {
    accounts: RSAccount[];
    onSubmit?: (id: string) => void;
}

const AccountCancelForm = (props: AccountCancelFormProps) => {

    const [openConfirmModal, setopenConfirmModal] = useState<boolean>(false);
    const [selectedAccount, setselectedAccount] = useState<string>(props.accounts[0].codeLocalAccount);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setopenConfirmModal(true);
    }

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                component='form'
                onSubmit={handleSubmit}>
                <Typography
                    variant='h6'
                    color='secondary'
                    fontSize='0.9rem'
                    alignSelf='flex-start'
                    mb={3}>Que cuenta deseas cancelar?</Typography>
                <Dropdown
                    label={'Tus Cuentas'}
                    items={DataToDropdownUtils.accountToDropdown(props.accounts)}
                    backgroundColor='white'
                    width={'100%'}
                    height={'auto'}
                    defaultValue={props.accounts[0].codeLocalAccount}
                    onChange={(value) => setselectedAccount(value)} />
                <SizeButton
                    submit
                    text={'Cancelar Cuenta'}
                    style={ButtonStyle.MEDIUM}
                    palette={{
                        backgroundColor: ColorPalette.PRIMARY
                    }} />
            </Box>
            <ModalOrganism
                open={openConfirmModal}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '0.25rem',
                    width: '100%'
                }}>
                    <IconButton onClick={() => setopenConfirmModal(false)}>
                        <Close />
                    </IconButton>
                </div>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Typography
                        variant='h6'
                        color='secondary'
                        fontSize='0.9rem'
                        mb={3}>¿Seguro que desea cancelar la cuenta {`${selectedAccount}`}?</Typography>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.25rem',
                        alignSelf: 'flex-end'
                    }}>
                        <SizeButton
                            text={'Cancelar'}
                            style={ButtonStyle.MEDIUM}
                            palette={{
                                backgroundColor: ColorPalette.SECONDARY
                            }}
                            onClick={() => setopenConfirmModal(false)} />
                        <SizeButton
                            text={'Aceptar'}
                            style={ButtonStyle.MEDIUM}
                            palette={{
                                backgroundColor: ColorPalette.PRIMARY
                            }}
                            onClick={() => {
                                props.onSubmit?.(selectedAccount);
                                setopenConfirmModal(false);
                            }} />
                    </div>
                </Box>
            </ModalOrganism>
        </>
    )
}

export default AccountCancelForm