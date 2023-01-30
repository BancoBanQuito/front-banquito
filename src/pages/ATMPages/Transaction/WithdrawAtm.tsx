import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
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

interface ATMLoginForm {
    codeLocalAccount: string,
    password: string,
}

const WithdrawAtm = () => {

    const [showInfoModal, setshowInfoModal] = useState<boolean>(false);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [loadingMessage, setloadingMessage] = useState<string | undefined>();
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [indexForm, setindexForm] = useState<number>(0);

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
        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
        } finally {
            setisLoading(false);
        }
    }

    const handleDecline = () => {
        navigate('/atm');
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
                    } else {
                        seterrorMessage("Contraseña invalida");
                        setactiveErrorModal(true);
                    }
                } else {
                    seterrorMessage("Cuenta no encontrada");
                    setactiveErrorModal(true);
                }
            } else {
                seterrorMessage("Cuenta no encontrada");
                setactiveErrorModal(true);
            }
        } catch (error: any) {
            seterrorMessage(error.message);
            setactiveErrorModal(true);
        } finally {
            setisLoading(false);
        }
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
                        <AtmLoginForm
                            atm
                            codeLocalAccount
                            onSubmit={(data: any) => {
                                setindexForm(1);
                                setlogin({
                                    ...login,
                                    codeLocalAccount: data.codeLocalAccount
                                });
                            }} />
                        : indexForm === 1 ?
                            <AtmLoginForm
                                atm
                                password
                                title="Contraseña"
                                onSubmit={(data: any) => {
                                    setlogin({
                                        ...login,
                                        password: data.password
                                    });
                                    handleLogin(data.password);
                                }} />
                            : indexForm === 2 ?
                                <TransferAmountForm
                                    atm
                                    onSubmit={(data: any) => {
                                        setindexForm(3);
                                        setvalue({
                                            ...value,
                                            value: data.amount
                                        })
                                    }} />
                                :
                                <ConfirmTransferUserForm
                                    atm
                                    title="Retirar"
                                    showField
                                    onAccept={() => handleAccept()}
                                    onDecline={() => handleDecline()}
                                    data={value} />}
                </Box>
            </div>
            <InfoModalOrganism
                active={showInfoModal}
                onDeactive={() => { }}
                title='Retiro Completo'
                text={'Puede retirar su dinero'}
                buttonText='Ok'
                onClick={() => navigate('/atm/load')} />
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