import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import ConfirmTransferUserForm from '../../../components/organisms/ConfirmTransferUserForm';
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule';
import { ColorPalette } from '../../../style/ColorPalette';
import { Transference } from '../../../services/transference/model/Transference';
import TransferDataForm from '../../../components/organisms/TransferDataForm';
import TransferAmountForm from '../../../components/organisms/TransferAmountForm';
import { Box } from '@mui/material';

const TransferBank = () => {
    const [indexForm, setindexForm] = useState<number>(0);

    const navigate = useNavigate();

    const [value, setvalue] = useState<Transference>({
        accountNumber: "",
        identification: "",
        identificationType: "",
        transferAmount: 0,
        date: "",
        recipient: {
            accountNumber: "",
            identification: "",
            identificationType: "",
        }
    });

    const handleAccept = () => {
        console.log(value);
        // navigate('/usuario');
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
                        itemsCount={4}
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
                                    accountNumber: data.accountNumber,
                                    identification: data.identification,
                                    identificationType: data.identificationType,
                                });
                            }}
                            title='Cuenta(Emisor)' /> :
                        indexForm === 1 ?
                            <TransferDataForm
                                key={2}
                                onSubmit={(data: any) => {
                                    setindexForm(2);
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
                            indexForm === 2 ?
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

export default TransferBank