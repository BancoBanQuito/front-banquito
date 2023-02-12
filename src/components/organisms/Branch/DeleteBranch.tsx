import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Typography } from '@mui/material';

import { IBranch } from './Types';
import EnvManager from '../../../config/EnvManager';
import { Spinner } from '../../atoms/Spinner';
import { Dropdown } from '../../atoms/Dropdown';
import { SizeButton } from '../../atoms/SizeButton';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';

const DeleteBranch: React.FC = () => {
    const [activateSpinner, setActivateSpinner] = useState(false);
    const [branchesData, setBranchesData] = useState<IBranch[]>([])
    const [selectedBranch, setSelectedBranch] = useState<string>('')
    const optionsBranch = branchesData.map(({ name }) => ({
        name: name,
        value: name
    }))
    const onChangeBranch = (value: string) => {
        setSelectedBranch(value)
    }
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                setActivateSpinner(true)
                const response = await fetch(`${EnvManager.SETTINGS_URL}/api/branch`)
                const data = await response.json()
                setBranchesData(data)
                setActivateSpinner(false)
            } catch (error) {
                setActivateSpinner(false)
                console.error(error)
            }
        }
        fetchProvinces()
    }, [])

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                setActivateSpinner(true)
                const response = await fetch(`${EnvManager.SETTINGS_URL}/api/branch/name/${selectedBranch}`)
                const data = await response.json()
                setActivateSpinner(false)
            } catch (error) {
                setActivateSpinner(false)
                console.error(error)
            }
        }
        fetchProvinces()
    }, [selectedBranch])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            setActivateSpinner(true)
            const response = await fetch(`${EnvManager.SETTINGS_URL}/api/branch/name/${selectedBranch}`, {
                method: "DELETE",
            });
            alert("Eliminada con éxito")
            setActivateSpinner(false)

        } catch (error) {
            setActivateSpinner(false)
            console.error(error);
        }
    }

    return (
        <>
            {activateSpinner ? <Spinner /> : null}
            <Box
                component='form'
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 500
                }}>
                <Container sx={containerTitleStyles}>
                    <Typography variant="h4" align="center">
                        Eliminar Sucursal
                    </Typography>
                </Container>
                <Dropdown
                    label="Selecciona la sucursal a eliminar:"
                    value={selectedBranch}
                    items={optionsBranch}
                    onChange={onChangeBranch}
                    width={'100%'}
                    height={'auto'} />
                <SizeButton
                    submit
                    text={'Eliminar'}
                    style={ButtonStyle.BIG} palette={{
                        backgroundColor: ColorPalette.PRIMARY
                    }} />
            </Box>
        </>
    )
}

export default DeleteBranch;

const containerTitleStyles = () => ({
    textAlign: 'center',
    marginTop: '70px',
    marginBottom: '20px'
});
