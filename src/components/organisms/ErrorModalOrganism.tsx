import React from 'react'
import { Modal, Box, Typography } from '@mui/material';
import { ButtonStyle } from 'src/style/ButtonStyle';
import { ColorPalette } from 'src/style/ColorPalette';
import { SizeButton } from '../atoms/SizeButton';

interface ErrorModalOrganismProps {
    active: boolean,
    onDeactive: () => void,
    text: string,
    title?: string,
    enableButtonBox?: boolean,
    onConfirm?: () => void,
    onReject?: () => void,
}

const ErrorModalOrganism = (props: ErrorModalOrganismProps) => {
    return (
        <Modal
            open={props.active}
            onClose={props.onDeactive}>
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
                <Typography variant="h6" component="h2" sx={{ textTransform: 'uppercase' }}>
                    {props.title || 'A ocurrido un error'}
                </Typography>
                <Typography variant="body2" component="h2">
                    {props.text}
                </Typography>
                {
                    !!props.enableButtonBox && <>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginTop: '1rem'
                        }}>
                            {
                                props.onConfirm && <SizeButton
                                    palette={{ backgroundColor: ColorPalette.SECONDARY }}
                                    style={ButtonStyle.MEDIUM}
                                    text='Confirmar'
                                    onClick={props.onConfirm} />
                            }
                            {
                                props.onReject && <SizeButton
                                    palette={{ backgroundColor: ColorPalette.PRIMARY }}
                                    style={ButtonStyle.MEDIUM}
                                    text='Rechazar'
                                    onClick={props.onReject} />
                            }
                        </div>
                    </>
                }
            </Box>
        </Modal>
    )
}

export default ErrorModalOrganism