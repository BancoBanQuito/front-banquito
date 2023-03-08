import React, { ReactInstance, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule';
import LoadOrganism from '../../../components/organisms/LoadOrganism';
import { AccountStatementService } from '../../../services/account/AccountStatementService';
import { AlertColor } from '@mui/material';
import AccountStatementBody from '../../../components/organisms/Account/AccountStatementBody';
import { Print } from '@mui/icons-material';
import ReactToPrint from 'react-to-print';
import ButtonIcon from '../../../components/atoms/ButtonIcon';
import { ColorPalette } from '../../../style/ColorPalette';
import { RSAccountStatement } from '../../../services/account/dto/RSAccountStatement';

const AccountStatementPage = () => {

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [messageLoading, setmessageLoading] = useState<string | undefined>();

    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

    const [accountStatement, setaccountStatement] = useState<RSAccountStatement>();

    const params = useParams();
    const navigate = useNavigate();
    const printRef = useRef();

    

    useEffect(() => {
        const id = params.id;
        if (id) {
            handleParam(id);
        } else {
            navigate('/cliente/inicio');
        }
        return () => { }
    }, []);

    const handleParam = (id: string) => {
        const data = id.split('-');
        if (data[1]) {
            generateAccountStatement(data[1]);
        } else {
            handleAccountStatementSelection(data[0]);
        }
    }

    const generateAccountStatement = async (codeLocalAccount: string) => {
        setisLoading(true);
        try {
            const currentAccountStatement = (await AccountStatementService.getStatementCurrent(codeLocalAccount)).data.data;
            if (currentAccountStatement) {
                setaccountStatement(currentAccountStatement);
            }
            settitleSnack("Estado de cuenta");
            setmessageSnack("Estado de cuenta generado correctamente");
            setcolorSnack('success');
            setopenSnack(true);

        } catch (error) {
            setmessageSnack("Ha ocurrido un error");
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }

    const handleAccountStatementSelection = async (codeAccountStatement: string) => {
        setisLoading(true);
        try {
            const currentAccountStatement = (await AccountStatementService.getStatementHistoric(codeAccountStatement)).data.data;
            if (currentAccountStatement) {
                setaccountStatement(currentAccountStatement);
            }
            settitleSnack("Estado de cuenta");
            setmessageSnack("Estado de cuenta generado correctamente");
            setcolorSnack('success');
            setopenSnack(true);
        } catch (error) {
            setmessageSnack("Ha ocurrido un error");
            settitleSnack("Error");
            setcolorSnack('error');
            setopenSnack(true);
        } finally {
            setisLoading(false);
        }
    }


    return (
        <>
            {accountStatement &&
                <>
                    <ReactToPrint
                        trigger={() => <ButtonIcon
                            float
                            bottom
                            right
                            color={ColorPalette.PRIMARY}
                            icon={<Print />} />}
                        content={() => printRef.current as unknown as ReactInstance | null} />
                    <AccountStatementBody
                        accountStatement={accountStatement}
                        ref={printRef} />
                </>}
            <LoadOrganism
                active={isLoading}
                text={messageLoading} />
            <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
        </>
    )
}

export default AccountStatementPage