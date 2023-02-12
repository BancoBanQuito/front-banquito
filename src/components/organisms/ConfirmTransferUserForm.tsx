import { Typography, TextField } from '@mui/material'
import { Box, SxProps, Theme } from '@mui/system'
import { SizeButton } from '../atoms/SizeButton'
import { ButtonStyle } from '../../style/ButtonStyle';
import { ColorPalette } from '../../style/ColorPalette';
import { Cancel, Check } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ATMButtonAtom from '../atoms/ATMButtonAtom';
import ATMButtonContainerMolecule from '../molecules/ATMButtonContainerMolecule';
import TextFieldAtom from '../atoms/TextFieldAtom';

interface ConfirmFormProps {
    showField?: boolean;
    showAccountReceptor?: boolean;
    data: {
        codeLocalAccount: string,
        value: number,
        recipientAccountNumber: string,
    },
    title?: string,
    onAccept?: (data: any) => void,
    onDecline?: (data: any) => void,
    atm?: boolean
}

const buttonATMSize = {
    height: 75,
    width: 200
}

const ConfirmTransferUserForm = (props: ConfirmFormProps) => {

    const navigate = useNavigate();

    return (
        <>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '1rem'
            }}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    {props.title || 'Confirmar'}
                </Typography>
                <Box
                    mb={1}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <TextFieldAtom
                        label='Monto'
                        value={props.data.value}
                        disable
                        fullWidth
                        type={'text'} />
                    {!!props.showField && <TextFieldAtom
                        label='Numero de Cuenta (Emisor)'
                        value={props.data.codeLocalAccount}
                        fullWidth
                        disable
                        type={'text'} />}
                    {!!props.showAccountReceptor && <TextFieldAtom
                        label='Numero de Cuenta (Receptor)'
                        value={props.data.recipientAccountNumber}
                        fullWidth
                        disable
                        type={'text'} />}
                </Box>
                {
                    !!props.atm ?
                        <ATMButtonContainerMolecule position="right">
                            <ATMButtonAtom
                                submit
                                text={'Rechazar'}
                                icon={<Cancel />}
                                onClick={() => { props.onDecline?.(null) }}
                                palette={{
                                    backgroundColor: ColorPalette.PRIMARY
                                }} />
                            <ATMButtonAtom
                                submit
                                text={'Aceptar'}
                                icon={<Check />}
                                onClick={() => { props.onAccept?.(null) }}
                                palette={{
                                    backgroundColor: ColorPalette.SECONDARY
                                }} />
                        </ATMButtonContainerMolecule>

                        : <Box sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <SizeButton
                                palette={{
                                    backgroundColor: ColorPalette.SECONDARY
                                }}
                                style={ButtonStyle.BIG}
                                onClick={() => { props.onAccept?.(null) }}
                                text={props.title || ''} />
                            <SizeButton
                                palette={{
                                    backgroundColor: ColorPalette.PRIMARY
                                }}
                                style={ButtonStyle.BIG}
                                onClick={() => { props.onDecline?.(null) }}
                                text='Rechazar' />
                        </Box>
                }
            </Box>
        </>
    )
}

export default ConfirmTransferUserForm
