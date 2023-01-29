import { Box, Typography, TextField } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import { SizeButton } from '../../atoms/SizeButton';
import { Search } from '@mui/icons-material';

interface SearchAccountProps {
    title: string,
    color?: string,
    label?: string,
    onSubmit?: (data: string) => void,
}

const SearchAccount = (props: SearchAccountProps) => {

    const [accountNumber, setaccountNumber] = useState<string>("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit?.(accountNumber);
    }
    const onlyNumbers = (event: ChangeEvent<HTMLInputElement>) => {
        setaccountNumber(event.target.value);
        /* const regex = /^[0-9\b]+$/;
        if (event.target.value == '' || regex.test(event.target.value)) {
            setaccountNumber(event.target.value);
        } */
    }

    return (
        <Box>
            <Box mb={2} sx={{ fontStyle: 'italic', color: props.color ? props.color : '#000' }}>
                <Typography variant='h4' component='h6'>
                    {props.title}
                </Typography>
                <Typography variant='body1' component='h6'>
                    Buscador
                </Typography>
            </Box>

            <Box
                mb={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                component='form'
                onSubmit={handleSubmit}>

                <div style={{ margin: '5px', width: '100%' }}>
                    <TextField
                        name='accountNumber'
                        label={props.label || 'Ingrese el numero de cuenta'}
                        onChange={onlyNumbers}
                        value={accountNumber}
                        sx={{
                            width: '100%',
                            height: 'auto'
                        }}
                    />
                </div>

                <div style={{ margin: '5px', width: '100%' }}>
                    <SizeButton
                        submit
                        palette={{ backgroundColor: ColorPalette.PRIMARY }}
                        style={ButtonStyle.BIG}
                        text='Buscar'
                        size={{
                            width: '100%',
                            height: 'auto'
                        }}
                        icon={<Search />} />
                </div>
            </Box>
        </Box>
    )
}

export default SearchAccount