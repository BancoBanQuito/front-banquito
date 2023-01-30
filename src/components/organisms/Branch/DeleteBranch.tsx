import React, { useEffect, useState } from 'react'
import BranchBox from './BranchBox';
import { Button, Container, Typography } from '@mui/material';

import { IBranch } from './Types';
import EnvManager from '../../../config/EnvManager';
import { Spinner } from '../../atoms/Spinner';

const DeleteBranch: React.FC = () => {
    const [activateSpinner, setActivateSpinner] = useState(false);
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
