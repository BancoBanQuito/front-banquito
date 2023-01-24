import { Modal, Box, Typography } from '@mui/material';
import React from 'react'
import LoadMolecule from '../molecules/LoadMolecule';

interface LoadOrganismProps {
    active: boolean,
}

const LoadOrganism = (props: LoadOrganismProps) => {
    return (
        <Modal
            open={props.active}>
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <LoadMolecule />
            </Box>
        </Modal>
    )
}

export default LoadOrganism