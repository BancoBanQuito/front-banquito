import { Box, Typography } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import ATMButtonContainerMolecule from '../molecules/ATMButtonContainerMolecule';
import ATMButtonAtom from '../atoms/ATMButtonAtom';
import { ChevronRight } from '@mui/icons-material';
import { ColorPalette } from '../../style/ColorPalette';
import TextFieldAtom from '../atoms/TextFieldAtom';
import BanQuitoIcon from '../atoms/BanQuitoIcon';

interface ATMFormOrganismProps {
    title: string;
    type: 'text' | 'money' | 'password';
    label?: string;
    placeholder?: string;
    onSubmit?: (data: any) => void;
}

const ATMFormOrganism = (props: ATMFormOrganismProps) => {

    const [data, setdata] = useState<any>();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit?.(data);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setdata(e.target.value);
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

            <div style={{
                position: 'absolute',
                top: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <BanQuitoIcon />
                <div style={{ margin: '0.25rem' }} />
                <Typography variant='body1'>Banco BanQuito</Typography>
            </div>

            <Typography variant='h5' color='secondary' mb={5}>{props.title}</Typography>
            <TextFieldAtom
                label={props.label}
                placeholder={props.placeholder}
                onChange={handleChange}
                value={data}
                fullWidth
                required
                type={props.type === 'text' ? 'text' : props.type === 'money' ? 'number' : 'password'}
                step={props.type === 'money' ? 0.01 : undefined} />

            <ATMButtonContainerMolecule
                position={'right'}>
                <ATMButtonAtom
                    submit
                    icon={<ChevronRight />}
                    text={'Siguiente'}
                    palette={{
                        backgroundColor: ColorPalette.PRIMARY
                    }} />
            </ATMButtonContainerMolecule>
        </Box>
    )
}

export default ATMFormOrganism