import React, { ReactInstance, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/system'
import { Fade } from '@mui/material'
import { ColorPalette } from '../../../style/ColorPalette'
import { ChevronLeft, Print } from '@mui/icons-material'
import { AccountStatementService } from '../../../services/account/AccountStatementService'
import ButtonIcon from '../../../components/atoms/ButtonIcon'
import ReactToPrint from 'react-to-print'
import AccountStatementBody from '../../../components/organisms/Account/AccountStatementBody'
import AccountStatementTable from '../../../components/organisms/Account/AccountStatementTable'
import { useNavigate } from 'react-router-dom'
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism'
import LoadOrganism from '../../../components/organisms/LoadOrganism'
import { AccountService } from '../../../services/account/AccountService'
import { RSAccountStatement } from '../../../services/account/dto/RSAccountStatement'
import { RSAccountStatementList } from '../../../services/account/dto/RSAccountStatementList'

const AccountStatementClient = () => {

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [activeAccountStatement, setactiveAccountStatement] = useState<boolean>(false);
    const [activeAccountStatementTable, setactiveAccountStatementTable] = useState<boolean>(true);
    const [accountStatement, setaccountStatement] = useState<RSAccountStatement | undefined>();
    const [accountStatements, setaccountStatements] = useState<RSAccountStatementList[]>();
    const [accountNumberData, setaccountNumberDate] = useState<string>("1751990332");

    const navigate = useNavigate();

    const printRef = useRef();

    useEffect(() => {
        searchAccountStatement(accountNumberData);
        return () => { }
    }, [])


    const handleBackEvent = () => {
        setactiveAccountStatementTable(true);
        setactiveAccountStatement(false);
        setaccountStatement(undefined);
    }

    const handleAccountStatementSelection = (data: RSAccountStatement) => {
        setaccountStatement(data);
        setactiveAccountStatementTable(false);
        setactiveAccountStatement(true);
    }

    const searchAccountStatement = async (identification: string, identificationType?: string) => {
        setisLoading(true);
        try {
            // const data: AccountStament[] = /* (await AccountStatementService.getStatements(accountNumber)).data.data || */ [];
            const { codeLocalAccount, codeInternationalAccount }: any = (await AccountService.getAccountsById(identification, identificationType || "DNI")).data?.data?.at(0);
            if (!!codeLocalAccount && !!codeInternationalAccount) {
                setactiveErrorModal(true);
                seterrorMessage("No se han encontrado datos");
                return;
            }
            const data: RSAccountStatement | undefined = (await AccountStatementService.getStatementCurrent(codeLocalAccount)).data.data;
            if (data) {
                // setaccountStatements(data);
                setaccountStatement(data);
                setactiveAccountStatementTable(true);
            } else {
                setactiveErrorModal(true);
                seterrorMessage("No se han encontrado datos");
            }
        } catch (error: any) {
            setactiveErrorModal(true);
            seterrorMessage(error.message);
        } finally {
            setisLoading(false);
        }
    }

    return (
        <>
            <Box sx={{
                position: 'absolute',
                width: '98%',
            }}>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    top: '5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: activeAccountStatementTable ? '100' : '0',
                    textTransform: 'uppercase'
                }}>
                    <Fade in={activeAccountStatementTable}>
                        <div>
                            <AccountStatementTable
                                data={accountStatements || []}
                                onSelection={handleAccountStatementSelection} />
                        </div>
                    </Fade>
                </div>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    top: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: activeAccountStatement ? '100' : '0'
                }}>
                    <Fade in={activeAccountStatement}>
                        <div>
                            <ButtonIcon
                                color={ColorPalette.PRIMARY}
                                icon={<ChevronLeft />}
                                onClick={handleBackEvent} />

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
                        </div>
                    </Fade>
                </div>
            </Box>
            <LoadOrganism active={isLoading} />
            <ErrorModalOrganism
                active={activeErrorModal}
                onDeactive={() => { setactiveErrorModal(false); navigate('/cliente') }}
                text={`${errorMessage}. ¿Desea volver a intentar?`}
                enableButtonBox
                onConfirm={() => searchAccountStatement(accountNumberData)}
                onReject={() => navigate('/cliente')}
            />
        </>
    )
}

export default AccountStatementClient