import React, { useEffect, useState } from 'react'
import BranchBox from './BranchBox';
import { Button, Container, Typography } from '@mui/material';

import { IBranch } from './Types';

const DeleteBranch: React.FC = () => {

    const [branchesData, setBranchesData] = useState<IBranch[]>([])
    const [selectedBranch, setSelectedBranch] = useState<string>('')
    const optionsBranch = branchesData.map(({ name }) => ({
        value: name,
        label: name
    }))
    const onChangeBranch = (value: string) => {
        setSelectedBranch(value)
    }
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://settingsbanquito-app-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/branch')
                const data = await response.json()
                setBranchesData(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchProvinces()
    }, [])

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch(`https://settingsbanquito-app-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/branch/name/${selectedBranch}`)
                const data = await response.json()
            } catch (error) {
                console.error(error)
            }
        }
        fetchProvinces()
    }, [selectedBranch])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const response = await fetch(`https://settingsbanquito-app-kjduy-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/branch/name/${selectedBranch}`, {
                method: "DELETE",
            });
            alert("Eliminada con éxito")
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Container sx={containerTitleStyles}>
                <Typography variant="h4" align="center">
                    Eliminar Sucursal
                </Typography>
            </Container>
            <BranchBox
                label="Selecciona la sucursal a eliminar:"
                value={selectedBranch}
                options={optionsBranch}
                onChange={onChangeBranch}
            />
            <Container sx={containerTextFieldStyles}>
                <Button onClick={handleSubmit} sx={buttonStyles}>Eliminar sucursal</Button>
            </Container>
        </>
    )
}

export default DeleteBranch;

const containerTitleStyles = () => ({
    textAlign: 'center',
    marginTop: '70px',
    marginBottom: '20px'
});

const containerTextFieldStyles = () => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '50px',
});

const buttonStyles = () => ({
    background: '#1D3557',
    color: 'white',
    ':hover': {
        background: '#1D3557',
        color: 'white'
    }
});
