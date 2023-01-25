import React, { useState } from 'react';
import TextFieldAtom from 'src/components/atoms/TextFieldAtom';
import { Box, FormControl, SxProps, Theme, Typography } from '@mui/material';
import { Dropdown } from 'src/components/atoms/Dropdown';
import { SizeButton } from 'src/components/atoms/SizeButton';
import { ButtonStyle } from 'src/style/ButtonStyle';
import { ColorPalette } from 'src/style/ColorPalette';

const Withdrawals = () => {
    const mockedItems = [{
        name: 'DNI',
        value: 'DNI'
    }, {
        name: 'RUC',
        value: 'RUC'
    }, {
        name: 'PASAPORTE',
        value: 'PAS'
    }];

    const [selectedItem, setSelectedItem] = useState<string>(mockedItems[0].value);

    const handleDropdownChange = (value: string) => setSelectedItem(value);

    const mainBoxStyle = (): SxProps<Theme> => {
        return {
            m: 1,
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
        };
    }

    const formBoxStyle = (): SxProps<Theme> => {
        return {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
        };
    }
    const fieldBoxStyle = (): SxProps<Theme> => {
        return {
            m: 1,
            p: 1,
        };
    }
    const buttonBoxStyle = (): SxProps<Theme> => {
        return {
            m: 1,
            p: 10,
            display: 'flex',
            justifyContent: 'center'
        };
    }

    return (
        <>
            <Box>
                <Typography variant='h4' align='center'>Retiros</Typography>
            </Box>
            <Box
                sx={
                    formBoxStyle()
                }>
                <Box
                    sx={
                        mainBoxStyle()
                    }>
                    <Box
                        sx={
                            fieldBoxStyle()
                        }>
                        <Typography>Número de cuenta</Typography>
                        <TextFieldAtom
                            id="outlined-basic"
                            label=""
                            color="success"
                            type="text"
                            placeholder="Número de cuenta"
                            variant="filled"
                            action={() => alert("")}
                            value=""
                        />
                    </Box>
                    <Box
                        sx={
                            fieldBoxStyle()
                        }>
                        <Typography>Tipo de Identificación</Typography>
                        <Dropdown
                            label=""
                            items={mockedItems}
                            width={300}
                            height={50}
                            backgroundColor="lightblue"
                            onChange={handleDropdownChange}
                        />
                    </Box>
                </Box>
                <Box
                    sx={
                        mainBoxStyle()
                    }>
                    <Box
                        sx={
                            fieldBoxStyle()
                        }>
                        <Typography>Valor a retirar</Typography>
                        <TextFieldAtom
                            id="outlined-basic-filled"
                            label=""
                            color="success"
                            type="number"
                            placeholder="Valor a retirar"
                            variant="filled"
                            action={() => alert("")}
                            value=""
                        />
                    </Box>
                    <Box
                        sx={
                            fieldBoxStyle()
                        }>
                        <Typography>Identificación</Typography>
                        <TextFieldAtom
                            id="outlined-basic-outlined"
                            label=""
                            color="success"
                            type="text"
                            placeholder="Identificación"
                            variant="filled"
                            action={() => alert("")}
                            value=""
                        />
                    </Box>
                </Box>
            </Box>
            <Box
                sx={
                    buttonBoxStyle()
                }>
                <SizeButton
                    palette={{
                        backgroundColor: ColorPalette.PRIMARY
                    }}
                    size={{
                        height: 'auto',
                        width: '20%'
                    }}
                    style={ButtonStyle.BIG}
                    submit
                    text={'Retirar'} />
            </Box>
        </>
    );
};

export default Withdrawals;
