import { Box, Button, Grid } from '@mui/material'
import React, { useRef, useState } from 'react'
import { SizeButton } from './SizeButton'
import { ColorPalette } from '../../style/ColorPalette'
import { ButtonStyle } from '../../style/ButtonStyle'
import { Check, Close, Upload } from '@mui/icons-material'

interface InputFileAtomProps {
    accept?: string;
    mutilple?: boolean;
    required?: boolean;
}

const InputFileAtom = (props: InputFileAtomProps) => {

    const [hasChanged, sethasChanged] = useState<boolean>(false);

    const inputRef = useRef<any>();

    return (
        <>
            <input
                ref={inputRef}
                accept={props.accept || "image/*"}
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple={!!props.mutilple}
                type='file'
                required={!!props.required}
                onChange={() => sethasChanged(true)}
            />
            <Grid container spacing={2}>
                <Grid item sm={10}>
                    <SizeButton
                        icon={<Upload />}
                        text={'Cargar'}
                        style={ButtonStyle.BIG} palette={{
                            backgroundColor: ColorPalette.SECONDARY
                        }}
                        onClick={() =>
                            inputRef.current && inputRef.current.click()
                        }
                        size={{
                            height: 'auto',
                            width: '100%'
                        }} />
                </Grid>
                <Grid item sm={2}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyItems: 'center',
                            alignItems: 'center'
                        }}>
                        {hasChanged ? <Check color='secondary' /> : <Close />}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default InputFileAtom