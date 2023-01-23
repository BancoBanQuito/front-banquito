import { Typography, TextField } from '@mui/material'
import { Box, SxProps, Theme } from '@mui/system'
import { ButtonStyle } from '../../style/ButtonStyle'
import { ColorPalette } from '../../style/ColorPalette'
import { SizeButton } from '../atoms/SizeButton'
import { Transference } from '../../services/transference/model/Transference'

interface ConfirmFormProps {
    data: Transference,
    title?: string,
    onAccept?: (data: any) => void,
    onDecline?: (data: any) => void,
}

const ConfirmTransferUserForm = (props: ConfirmFormProps) => {
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
                    <TextField
                        sx={{ margin: '1rem' }}
                        label='Numero de Cuenta (Emisor)'
                        value={props.data.transferAmount}
                        disabled
                        fullWidth />
                    <TextField
                        sx={{ margin: '1rem' }}
                        label='Numero de Cuenta (Emisor)'
                        value={props.data.accountNumber}
                        fullWidth
                        disabled />
                    <TextField
                        sx={{ margin: '1rem' }}
                        label='Numero de Cuenta (Receptor)'
                        value={props.data.recipient.accountNumber}
                        fullWidth
                        disabled />
                </Box>
                <Box sx={{
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
                        text='Transferir' />
                    <SizeButton
                        palette={{
                            backgroundColor: ColorPalette.PRIMARY
                        }}
                        style={ButtonStyle.BIG}
                        onClick={() => { props.onDecline?.(null) }}
                        text='Rechazar' />
                </Box>
            </Box>
        </>
    )
}

export default ConfirmTransferUserForm