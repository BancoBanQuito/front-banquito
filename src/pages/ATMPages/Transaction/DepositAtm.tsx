import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AlertColor, Box } from '@mui/material';
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule';
import ConfirmTransferUserForm from '../../../components/organisms/ConfirmTransferUserForm';
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism';
import TransferAmountForm from '../../../components/organisms/Transaction/TransferAmountForm';
import TransferDataForm from '../../../components/organisms/Transaction/TransferDataForm';
import { AccountService } from '../../../services/account/AccountService';
import { RSAccount } from '../../../services/account/dto/RSAccount';
import { TransactionService } from '../../../services/transaction/TransactionService';
import { RQTransaction } from '../../../services/transaction/dto/RQTransaction';
import { ColorPalette } from '../../../style/ColorPalette';
import LoadOrganism from '../../../components/organisms/LoadOrganism';
import InfoModalOrganism from '../../../components/organisms/InfoModalOrganism';
import ATMFormOrganism from '../../../components/organisms/ATMFormOrganism';
import ATMConfirmOrganism from '../../../components/organisms/ATMConfirmOrganism';
import OnConstructionMolecule from '../../../components/molecules/OnConstructionMolecule';
import ATMPrintOrganism from '../../../components/organisms/ATMPrintFormOrganism';
import ATMTransactionFileOrganism from '../../../components/organisms/ATMTransactionFileOrganism';
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule';

const fileValue = 0;

const DepositAtm = () => {

    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [indexForm, setindexForm] = useState<number>(0);
    const [showInfoModal, setshowInfoModal] = useState<boolean>(false)
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error')
    const [canPrint, setcanPrint] = useState<boolean>(false);

    const navigate = useNavigate();
    const printRef = useRef();

    const [value, setvalue] = useState<RQTransaction>({
        codeInternationalAccount: "",
        codeLocalAccount: "",
        concept: "Deposito",
        description: "",
        movement: "NOTA CREDITO",
        recipientAccountNumber: "",
        recipientBank: "BANQUITO",
        recipientType: "",
        type: "DEPOSITO",
        value: 0
    });

    const handleAccept = async () => {
        setisLoading(true);
        try {
            const accountSimple: RSAccount | undefined = (await AccountService.getAccountByCode(value.codeLocalAccount)).data.data;
            if (!accountSimple) {
                seterrorMessage('Cuenta no encontrada');
                settitleSnack('Error');
                setmessageSnack('Cuenta no encontrada');
                setcolorSnack('error');
                setopenSnack(true);
                return;
            }
            const depositAccount = {
                ...value,
                codeInternationalAccount: accountSimple.codeInternationalAccount
            }
            await TransactionService.postTransaction(depositAccount);
            setshowInfoModal(true);
            settitleSnack('Deposito realizado');
            setmessageSnack('El deposito se realizo correctamente');
            setcolorSnack('success');
            setopenSnack(true);

        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
            settitleSnack('Error');
            setmessageSnack('Ocurrio un error al realizar el deposito');
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const handleDecline = () => {
        navigate('/atm');
    }

    const handlePrint = () => {
        handleAccept();
    }
   


    return (
        <>
            <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                overflowX: 'hidden',
                overflowY: 'hidden'
            }}>
                <div style={{
                    marginBottom: 50,
                    position: 'absolute',
                    bottom: 0
                }}>
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
                    {
                        !canPrint ? <>
                            {indexForm === 0 ?
                                <ATMFormOrganism
                                    key={0}
                                    title='Cuenta Depósito'
                                    type={'text'}
                                    label='Tu cuenta'
                                    onSubmit={(data: any) => {
                                        setindexForm(1);
                                        setvalue({
                                            ...value,
                                            codeLocalAccount: data
                                        });
                                    }} />
                                :
                                indexForm === 1 ?
                                    <ATMFormOrganism
                                        key={1}
                                        title='Monto a depositar'
                                        type='money'
                                        label='Monto'
                                        placeholder='0.00'
                                        onSubmit={(data: any) => {
                                            setindexForm(2);
                                            setvalue({
                                                ...value,
                                                value: data
                                            });
                                        }} />
                                    :
                                    <ATMConfirmOrganism
                                        title='Confirme su deposito'
                                        onReject={handleDecline}
                                        onAccept={handleAccept}
                                        onPrint={() => {
                                            setcanPrint(true);
                                        }}
                                        type='deposit'
                                        amount={value.value}
                                        label={'ATM'}
                                        accountTarget={value.codeLocalAccount} />}
                        </>
                            : <ATMPrintOrganism
                                fileValue={fileValue}
                                printRef={printRef}
                                onAccept={handlePrint}
                                onReject={() => setcanPrint(false)}
                                type={'deposit'} />
                    }
                </Box>
            </div>
            <div style={{ display: 'none' }}>
                <ATMTransactionFileOrganism
                    ref={printRef}
                    type='deposit'
                    account={value.codeLocalAccount}
                    value={value.value}
                    fileValue={fileValue} />
            </div>
            <InfoModalOrganism
                active={showInfoModal}
                text='La transferencia ha sido completada'
                title='Transfercia Completa'
                onDeactive={() => { }}
                buttonText='Ok'
                onClick={() => navigate('/atm')} />
            <LoadOrganism
                active={isLoading}
                text='Depositando...' />
            <ErrorModalOrganism
                active={activeErrorModal}
                onDeactive={() => { }}
                enableButtonBox
                onReject={() => { navigate('/atm') }}
                text={errorMessage} />
        </>
    )
}

export default DepositAtm