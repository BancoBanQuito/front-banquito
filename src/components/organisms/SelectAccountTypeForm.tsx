import React from 'react'
import { Wallet } from '@mui/icons-material';
import { Savings } from '@mui/icons-material';
import { AccountBalance } from '@mui/icons-material';
import { Box, SxProps, Theme, Typography } from '@mui/material';
import { ButtonStyle } from '@/style/ButtonStyle';
import { ColorPalette } from '@/style/ColorPalette';
import { SizeButton } from '../atoms/SizeButton';

const mainBoxStyle = (): SxProps<Theme> => {
    return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    };
}

const iconStyle = (): SxProps<Theme> => {
    return {
        width: '100px',
        height: '100px'
    };
}

const buttonSize = () => {
    return {
        width: '250px',
        height: '250px',
    }
}

interface SelectAccountFormProps {
    onSelect: (data: any, index?: number) => void;
}

const SelectAccountTypeForm = (props: SelectAccountFormProps) => {
    return (
        <>
            <Box sx={mainBoxStyle()}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 2
                    }}>
                    Seleccione el tipo de cuenta
                </Typography>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <div style={{ margin: 5 }}>
                        <SizeButton
                            palette={{ backgroundColor: ColorPalette.PRIMARY }}
                            onClick={() => props.onSelect("be04e60db27fd509df44cfdb72dcfd74", 0)}
                            style={ButtonStyle.BIG}
                            text='Inversion'
                            column
                            icon={<Wallet sx={iconStyle()} />}
                            size={buttonSize()}
                        />
                    </div>
                    <div style={{ margin: 5 }}>
                        <SizeButton
                            palette={{ backgroundColor: ColorPalette.PRIMARY }}
                            onClick={() => props.onSelect("6c24027751bc43c5b232242e307880a7", 1)}
                            style={ButtonStyle.BIG}
                            text='Ahorros'
                            column
                            icon={<Savings sx={iconStyle()} />}
                            size={buttonSize()}
                        />
                    </div>
                    <div style={{ margin: 5 }}>
                        <SizeButton
                            palette={{ backgroundColor: ColorPalette.PRIMARY }}
                            onClick={() => props.onSelect("bdc60173d3f0a82a1a04557e2d14ee32", 2)}
                            style={ButtonStyle.BIG}
                            text='Corriente'
                            column
                            icon={<AccountBalance

                                sx={iconStyle()} />}
                            size={buttonSize()}
                        />
                    </div>
                </div>
            </Box>
        </>
    )
}

export default SelectAccountTypeForm