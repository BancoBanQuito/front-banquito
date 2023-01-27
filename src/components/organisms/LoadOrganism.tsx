import React from 'react'
import { Modal, Box } from '@mui/material';
import LoadMolecule from '../molecules/LoadMolecule';

interface LoadOrganismProps {
    active: boolean,
    text?: string
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
                height: 400,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                textAlign: 'center',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}>
                <LoadMolecule
                    loadText={props.text} />
            </Box>
        </Modal>
    )
}

export default LoadOrganism