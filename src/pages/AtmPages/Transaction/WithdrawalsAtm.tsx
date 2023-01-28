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

const userCodeLocalAccount = "a3998d173acbf0c893db";

const WithdrawalsBank = () => {

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [indexForm, setindexForm] = useState<number>(0);
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
        setvalue({
            ...value,
            codeLocalAccount: userCodeLocalAccount
        });
        return () => { }
    }, []);

    const handleAccept = async () => {
        setisLoading(true);
        try {
            const accountSimple: RSAccount | undefined = (await AccountService.getAccountByCode(value.codeLocalAccount)).data.data;
            if (!accountSimple) {
                console.log("Ha ocurrido un error");
                return;
            }
            console.log(accountSimple);
            setvalue({
                ...value,
                codeInternationalAccount: accountSimple.codeInternationalAccount
            })
            console.log(value);
            await TransactionService.postTransaction(value);
            console.log(value);
            navigate('/cliente');
        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
        } finally {
            setisLoading(false);
        }
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
                        <TransferAmountForm
                            atm
                            onSubmit={(data: any) => {
                                setindexForm(1);
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
            <LoadOrganism
                active={isLoading}
                text="Validando Retiro..." />
            <ErrorModalOrganism
                active={activeErrorModal}
                onDeactive={() => setactiveErrorModal(false)}
                text={errorMessage} />
        </>
    )
}

export default WithdrawalsBank