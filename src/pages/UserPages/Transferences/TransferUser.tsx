import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Transference } from '../../../services/transference/model/Transference';
import { ColorPalette } from '../../../style/ColorPalette';
import { Box } from '@mui/material';
import ConfirmTransferUserForm from '../../../components/organisms/ConfirmTransferUserForm';
import TransferDataForm from '../../../components/organisms/TransferDataForm';
import TransferAmountForm from '../../../components/organisms/TransferAmountForm';
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule';

const TransferUser = () => {

    const [indexForm, setindexForm] = useState<number>(0);

    const navigate = useNavigate();

    const [value, setvalue] = useState<Transference>({
        accountNumber: "123456789",
        identification: "1751990332",
        identificationType: "DNI",
        transferAmount: 0,
        date: "",
        recipient: {
            accountNumber: "",
            identification: "",
            identificationType: "",
        }
    });

    const handleAccept = () => {
        navigate('/usuario');
    }

    const handleDecline = () => {
        navigate('/usuario');
    }

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{ marginBottom: 50 }}>
                    <ProgressButtonMolecule
                        color={ColorPalette.PRIMARY}
                        itemsCount={3}
                        current={indexForm}
                        onUpdate={(value) => setindexForm(value)}
                    />
                </div>
                <Box sx={{
                    width: 500,
                }}>
                    {indexForm === 0 ?
                        <TransferDataForm
                            key={1}
                            onSubmit={(data: any) => {
                                setindexForm(1);
                                setvalue({
                                    ...value,
                                    recipient: {
                                        accountNumber: data.accountNumber,
                                        identification: data.identification,
                                        identificationType: data.identificationType,
                                    }
                                });
                            }}
                            title='Cuenta(Receptor)' /> :
                        indexForm === 1 ?
                            <TransferAmountForm
                                onSubmit={(data: any) => {
                                    setindexForm(3);
                                    setvalue({
                                        ...value,
                                        transferAmount: data.amount,
                                        date: Date.now().toString()
                                    })
                                }} />
                            :
                            <ConfirmTransferUserForm
                                onAccept={() => handleAccept()}
                                onDecline={() => handleDecline()}
                                data={value} />}
                </Box>
            </div>
        </>
    )
}

export default TransferUser