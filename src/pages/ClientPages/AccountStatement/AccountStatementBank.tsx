import React, { ReactInstance, useRef, useState } from 'react'
import { Box } from '@mui/system'
import { Card, CardContent, Fade, Modal, Typography } from '@mui/material'
import { ColorPalette } from '../../../style/ColorPalette'
import { ChevronLeft, Print } from '@mui/icons-material'
import { AccountStament } from '../../../services/account/model/AccountStatement'
import { AccountStatementService } from '../../../services/account/accountStatementService'
import SearchAccount from '../../../components/organisms/SearchAccount'
import ButtonIcon from '../../../components/atoms/ButtonIcon'
import AccountStatementBody from '../../../components/organisms/AccountStatement/AccountStatementBody'
import ReactToPrint from 'react-to-print'
import AccountStatementTable from '../../../components/organisms/AccountStatement/AccountStatementTable'
import { useNavigate } from 'react-router-dom'
import LoadOrganism from '../../../components/organisms/LoadOrganism'
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism'
import { AccountService } from '../../../services/account/accountService'

const AccountStatementBank = () => {
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [activeSearchBox, setactiveSearchBox] = useState<boolean>(true);
    const [activeAccountStatement, setactiveAccountStatement] = useState<boolean>(false);
    const [activeAccountStatementTable, setactiveAccountStatementTable] = useState<boolean>(false);
    const [accountStatement, setaccountStatement] = useState<AccountStament | undefined>();
    const [accountStatements, setaccountStatements] = useState<AccountStament[]>([]);
    const [accountNumberData, setaccountNumberDate] = useState<string>();

    const navigate = useNavigate();

    const printRef = useRef();

    const handleBackEvent = () => {
        setactiveAccountStatementTable(true);
        setactiveAccountStatement(false);
        setaccountStatement(undefined);
    }

    const handleSearch = (data: string) => {
        setaccountNumberDate(data);
        searchAccountStatement(data);
    }

    const handleAccountStatementSelection = (data: AccountStament) => {
        setaccountStatement(data);
        setactiveAccountStatementTable(false);
        setactiveAccountStatement(true);
    }

    const searchAccountStatement = async (identification: string, identificationType?: string) => {
        setisLoading(true);
        try {
            const { codeLocalAccount, codeInternationalAccount }: any = (await AccountService.getAccountsById(identification, identificationType || "DNI")).data?.data?.at(0);
            if (!!codeLocalAccount && !!codeInternationalAccount) {
                setactiveErrorModal(true);
                seterrorMessage("No se han encontrado datos");
                return;
            }
            const data: AccountStament | undefined = (await AccountStatementService.getStatementCurrent(codeLocalAccount, codeInternationalAccount)).data.data;
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
                position: 'relative',
                top: 0
            }}>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '80vh',
                    top: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: activeSearchBox ? '100' : '0'
                }}>
                    <Fade in={activeSearchBox}>
                        <Card sx={{ minWidth: '450px', maxWidth: '750px' }}>
                            <CardContent>
                                <SearchAccount
                                    color={ColorPalette.SECONDARY}
                                    title='Estado de Cuenta'
                                    onSubmit={handleSearch} />
                            </CardContent>
                        </Card>
                    </Fade>
                </div>
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
                                data={accountStatements}
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
                onConfirm={() => accountNumberData && searchAccountStatement(accountNumberData)}
                onReject={() => navigate('/cliente')}
            />
        </>
    )
}

export default AccountStatementBank