import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertColor, Box } from "@mui/material";
import ProgressButtonMolecule from "../../../components/molecules/ProgressButtonMolecule";
import ConfirmTransferUserForm from "../../../components/organisms/ConfirmTransferUserForm";
import ErrorModalOrganism from "../../../components/organisms/ErrorModalOrganism";
import TransferAmountForm from "../../../components/organisms/Transaction/TransferAmountForm";
import TransferDataForm from "../../../components/organisms/Transaction/TransferDataForm";
import { AccountService } from "../../../services/account/AccountService";
import { RSAccount } from "../../../services/account/dto/RSAccount";
import { TransactionService } from "../../../services/transaction/TransactionService";
import { RQTransaction } from "../../../services/transaction/dto/RQTransaction";
import { ColorPalette } from "../../../style/ColorPalette";
import LoadOrganism from "../../../components/organisms/LoadOrganism";
import InfoModalOrganism from "../../../components/organisms/InfoModalOrganism";
import AtmLoginForm from "../../../components/organisms/AtmLoginForm";
import { AtmLoginService } from "../../../services/login/AtmLoginService";
import { RSAtmLogin } from "../../../services/login/dto/RSAtmLogin";
import ATMFormOrganism from "../../../components/organisms/ATMFormOrganism";
import ATMConfirmOrganism from "../../../components/organisms/ATMConfirmOrganism";
import ATMTransactionFileOrganism from "../../../components/organisms/ATMTransactionFileOrganism";
import ATMPrintOrganism from "../../../components/organisms/ATMPrintFormOrganism";
import SnackBarMolecule from "../../../components/molecules/SnackBarMolecule";

interface ATMLoginForm {
    codeLocalAccount: string,
    password: string,
}

const fileValue = 0.5;

const WithdrawAtm = () => {

    const [showInfoModal, setshowInfoModal] = useState<boolean>(false);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [loadingMessage, setloadingMessage] = useState<string | undefined>();
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [indexForm, setindexForm] = useState<number>(0);
    const [canPrint, setcanPrint] = useState<boolean>(false);
    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error')
    const [login, setlogin] = useState<ATMLoginForm>({
        codeLocalAccount: "",
        password: ""
    });

    const [value, setvalue] = useState<RQTransaction>({
        codeInternationalAccount: "",
        codeLocalAccount: "",
        concept: "Retiro cajero",
        description: "",
        movement: "NOTA DEBITO",
        recipientAccountNumber: "",
        recipientBank: "",
        recipientType: "",
        type: "RETIRO",
        value: 0
    });

    const printRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        return () => { }
    }, []);

    const handleAccept = async () => {
        setisLoading(true);
        try {
            setloadingMessage("Validando transaccion...");
            await TransactionService.postTransaction(value);
            setshowInfoModal(true);
            settitleSnack("Transaccion exitosa");
            setmessageSnack("Transaccion exitosa");
            setcolorSnack('success');
            setopenSnack(true);
        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
            settitleSnack("Error");
            setmessageSnack(error.message);
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const handleLogin = async (password: string) => {
        setisLoading(true);
        try {
            setloadingMessage("Validando cuenta...")
            const account: RSAccount | undefined = (await AccountService.getAccountByCode(login.codeLocalAccount)).data.data;
            if (account) {
                setvalue({
                    ...value,
                    codeLocalAccount: login.codeLocalAccount,
                    codeInternationalAccount: account.codeInternationalAccount
                });
                setindexForm(2);
                setloadingMessage("Validando contraseña...")
                const user: RSAtmLogin | undefined = (await (AtmLoginService.getLoginCredentials(account.identification))).data;
                if (user) {
                    if (user.user.password === password) {
                        setvalue({
                            ...value,
                            codeLocalAccount: login.codeLocalAccount,
                            codeInternationalAccount: account.codeInternationalAccount
                        });
                        setindexForm(2);
                        settitleSnack("Bienvenido");
                        setmessageSnack("Bienvenido");
                        setcolorSnack('success');
                        setopenSnack(true);
                    } else {
                        seterrorMessage("Contraseña invalida");
                        setactiveErrorModal(true);
                        settitleSnack("Error");
                        setmessageSnack("Contraseña invalida");
                        setcolorSnack('error');
                        setopenSnack(true);
                    }
                } else {
                    seterrorMessage("Cuenta no encontrada");
                    setactiveErrorModal(true);
                    settitleSnack("Error");
                    setmessageSnack("Cuenta no encontrada");
                    setcolorSnack('error');
                    setopenSnack(true);
                }
            } else {
                seterrorMessage("Cuenta no encontrada");
                setactiveErrorModal(true);
                settitleSnack("Error");
                setmessageSnack("Cuenta no encontrada");
                setcolorSnack('error');
                setopenSnack(true);
            }
            
        } catch (error: any) {
            seterrorMessage(error.message);
            setactiveErrorModal(true);
            settitleSnack("Error");
            setmessageSnack(error.message);
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const handlePrint = () => {
        setvalue({
            ...value,
            value: value.value + fileValue
        })
        handleAccept();
    }

    const handleDecline = () => {
        navigate('/atm');
    }


    return (
        <>
        <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{ position: 'absolute', bottom: 0 }}>
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
                                    title={"Ingresa tu cuenta"}
                                    type={"text"}
                                    label="Cuenta"
                                    onSubmit={(data: any) => {
                                        setindexForm(1);
                                        setlogin({
                                            ...login,
                                            codeLocalAccount: data
                                        });
                                    }} />
                                : indexForm === 1 ?
                                    <ATMFormOrganism
                                        key={1}
                                        title={"Contraseña"}
                                        type={"password"}
                                        label="Contraseña"
                                        onSubmit={(data: any) => {
                                            setlogin({
                                                ...login,
                                                password: data
                                            });
                                            handleLogin(data);
                                        }} />
                                    : indexForm === 2 ?
                                        <ATMFormOrganism
                                            key={2}
                                            title={"Monto"}
                                            type={"money"}
                                            label="Monto"
                                            onSubmit={(data: any) => {
                                                setindexForm(3);
                                                setvalue({
                                                    ...value,
                                                    value: data
                                                })
                                            }} />
                                        :
                                        <ATMConfirmOrganism
                                            title='Confirme su retiro'
                                            onReject={handleDecline}
                                            onAccept={handleAccept}
                                            onPrint={() => {
                                                setcanPrint(true);
                                            }}
                                            type='withdraw'
                                            amount={value.value}
                                            label={'ATM'}
                                            accountTarget={value.codeLocalAccount} />}
                        </> : <ATMPrintOrganism
                            fileValue={fileValue}
                            printRef={printRef}
                            onAccept={handlePrint}
                            onReject={() => setcanPrint(false)}
                            type={'withdraw'} />}
                </Box>
            </div>
            <div style={{ display: 'none' }}>
                <ATMTransactionFileOrganism
                    ref={printRef}
                    type='withdraw'
                    account={value.codeLocalAccount}
                    value={value.value}
                    fileValue={fileValue} />
            </div>
            <InfoModalOrganism
                active={showInfoModal}
                onDeactive={() => { }}
                title='Retiro Completo'
                text={'Puede retirar su dinero'}
                buttonText='Ok'
                onClick={() => navigate('/atm')} />
            <LoadOrganism
                active={isLoading}
                text={loadingMessage} />
            <ErrorModalOrganism
                enableButtonBox
                onReject={() => { navigate('/atm') }}
                active={activeErrorModal}
                onDeactive={() => { }}
                text={`${errorMessage} ¿Deseas volver a intentar?`} />
        </>
    )
}

export default WithdrawAtm