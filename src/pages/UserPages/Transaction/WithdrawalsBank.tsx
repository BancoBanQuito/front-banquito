import { useState } from "react";
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

const WithdrawalsBank = () => {

    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [indexForm, setindexForm] = useState<number>(0);

    const navigate = useNavigate();

    const [value, setvalue] = useState<RQTransaction>({
        codeInternationalAccount: "",
        codeLocalAccount: "",
        concept: "Retiro ventanilla",
        description: "",
        movement: "NOTA DEBITO",
        recipientAccountNumber: "",
        recipientBank: "",
        recipientType: "",
        type: "RETIRO",
        value: 0
    });

    const handleAccept = async () => {
        try {
            const accountSimple: RSAccount | undefined = (await AccountService.getAccountByCode(value.codeLocalAccount)).data.data;
            if (!accountSimple) {
                console.log("Ha ocurrido un error");
                return;
            }
            console.log(accountSimple);
            setvalue({
                ...value,
                codeInternationalAccount: accountSimple.codeInternationalAccount,
            })
            console.log(value);
            await TransactionService.postTransaction(value);
            console.log(value);
            navigate('/cliente');
        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
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
                            key={0}
                            showAccountCode
                            onSubmit={(data: any) => {
                                setindexForm(1);
                                setvalue({
                                    ...value,
                                    codeLocalAccount: data.accountNumber
                                });
                            }}
                            title='Cuenta Retiro' /> :
                        indexForm === 1 ?
                            <TransferAmountForm
                                onSubmit={(data: any) => {
                                    setindexForm(3);
                                    setvalue({
                                        ...value,
                                        value: data.amount
                                    })
                                }} />
                            :
                            <ConfirmTransferUserForm
                                title="Retirar"
                                showField
                                onAccept={() => handleAccept()}
                                onDecline={() => handleDecline()}
                                data={value} />}
                </Box>
            </div>
            <ErrorModalOrganism
                active={activeErrorModal}
                onDeactive={() => setactiveErrorModal(false)}
                text={errorMessage} />
        </>
    )
}

export default WithdrawalsBank