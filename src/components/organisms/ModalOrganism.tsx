import { Modal, Box } from '@mui/material';
import React, { ReactNode } from 'react'
import LoadMolecule from '../molecules/LoadMolecule';

interface ModalOrganismProps {
    open: boolean;
    children: ReactNode;
    onClose?: () => void;
}

const ModalOrganism = (props: ModalOrganismProps) => {
    return (
        <Modal
            open={props.open}
            onClose={props.onClose}>
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
                {props.children}
            </Box>
        </Modal>
    )
}

export default ModalOrganism