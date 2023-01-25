import React, { FormEvent } from 'react'
import { Box } from '@mui/system'
import { Dropdown } from 'src/components/atoms/Dropdown'
import { SizeButton } from 'src/components/atoms/SizeButton'
import TextFieldAtom from 'src/components/atoms/TextFieldAtom'
import { ButtonStyle } from 'src/style/ButtonStyle'
import { ColorPalette } from 'src/style/ColorPalette'

const statusItems = [
    {
        name: 'ACTIVO',
        value: 'ACT'
    },
    {
        name: 'SUSPENDIDO',
        value: 'SUS'
    },
    {
        name: 'BLOQUEADO',
        value: 'BLO'
    }
]

const rolItem = [
    {
        name: 'SAMPLE',
        value: 'SAM'
    }
]

const AccountConfigurationEditForm = () => {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
            <div style={{ margin: '0.25rem', width: '100%' }}>
                <TextFieldAtom
                    id="outlined-basic"
                    label="Ingrese el numero de cedula"
                    variant="standard"
                    color="primary"
                    type="text"
                    placeholder="Ingrese el numero de cedula"
                    action={() => alert("")}
                    value=""
                />
            </div>
            <div style={{ margin: '0.25rem', width: '100%' }}>
                <Dropdown
                    backgroundColor={ColorPalette.TERNARY}
                    height='auto'
                    width='100%'
                    label='Estado'
                    items={statusItems}
                />
            </div>
            <SizeButton
                palette={{ backgroundColor: ColorPalette.PRIMARY }}
                style={ButtonStyle.MEDIUM}
                text='Editar'
                submit />
        </Box>
    )
}

export default AccountConfigurationEditForm
