import { ChangeEvent, FormEvent, useState } from 'react'
import { Typography, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { ButtonStyle } from '../../../style/ButtonStyle'
import { ColorPalette } from '../../../style/ColorPalette'
import { SizeButton } from '../../atoms/SizeButton'
import { ChevronRight } from '@mui/icons-material'
import TextFieldAtom from '../../atoms/TextFieldAtom'

interface FormTransferUserInterface {
    amount: number
}

interface TransferAmountFormProps {
    title?: string,
    onSubmit?: (data: any) => void,
    atm?: boolean
}

const buttonATMSize = {
    height: 75,
    width: 200
}

const TransferAmountForm = (props: TransferAmountFormProps) => {

    const [transfer, settransfer] = useState<FormTransferUserInterface>({
        amount: 0,
    })

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit && props.onSubmit(transfer);
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        settransfer({ ...transfer, [name]: value });
    }

    return (
        <>
            
            <Box
                component="form"
                onSubmit={submitHandler}>
                <Box>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {props.title || 'Monto'}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '1rem'
                    }}>
                    <TextFieldAtom
                        id="amount"
                        name="amount"
                        type="number"
                        onChange={handleFormChange}
                        label='Monto'
                        fullWidth
                        required
                    />
                </Box>
                {!!props.atm ?
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: -30,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center'
                    }}>
                        <div style={{ margin: '1rem 0' }}>
                            <SizeButton
                                submit
                                text={'Siguiente'}
                                icon={<ChevronRight />}
                                style={ButtonStyle.BIG}
                                size={buttonATMSize}
                                palette={{
                                    backgroundColor: ColorPalette.PRIMARY,
                                }} />
                        </div>
                    </div>
                    : <Box>
                        <SizeButton
                            palette={{
                                backgroundColor: ColorPalette.PRIMARY
                            }}
                            size={{
                                height: 'auto',
                                width: 'auto'
                            }}
                            style={ButtonStyle.BIG}
                            submit
                            text="Siguiente" />
                    </Box>}
            </Box>
        </>
    )
}

export default TransferAmountForm