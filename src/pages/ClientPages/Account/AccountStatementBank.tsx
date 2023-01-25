import React, { ReactInstance, useRef, useState } from 'react'
import { Box } from '@mui/system'
import ReactToPrint from 'react-to-print'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, Fade } from '@mui/material'
import { ChevronLeft, Print } from '@mui/icons-material'
import ButtonIcon from '/src/components/atoms/ButtonIcon'
import AccountStatementBody from '/src/components/organisms/Account/AccountStatementBody'
import SearchAccount from '/src/components/organisms/Account/SearchAccount'
import ErrorModalOrganism from '/src/components/organisms/ErrorModalOrganism'
import LoadOrganism from '/src/components/organisms/LoadOrganism'
import { AccountStatementService } from '/src/services/account/AccountStatementService'
import { RSAccountStatement } from '/src/services/account/dto/RSAccountStatement'
import { ColorPalette } from '/src/style/ColorPalette'
import { RSAccountStatementList } from '/src/services/account/dto/RSAccountStatementList'
import AccountStatementTable from '/src/components/organisms/Account/AccountStatementTable'
import { SizeButton } from '/src/components/atoms/SizeButton'
import { ButtonStyle } from '/src/style/ButtonStyle'

const AccountStatementBank = () => {
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [activeSearchBox, setactiveSearchBox] = useState<boolean>(true);
    const [activeAccountStatement, setactiveAccountStatement] = useState<boolean>(false);
    const [activeAccountStatementTable, setactiveAccountStatementTable] = useState<boolean>(false);
    const [accountStatement, setaccountStatement] = useState<RSAccountStatement>();
    const [accountStatements, setaccountStatements] = useState<RSAccountStatementList[]>([]);
    const [codeLocalAccount, setcodeLocalAccount] = useState<string>();

    const navigate = useNavigate();

    const printRef = useRef();

    const handleBackEvent = () => {
        setactiveAccountStatementTable(true);
        setactiveAccountStatement(false);
        setaccountStatement(undefined);
    }

    const handleSearch = (data: string) => {
        setcodeLocalAccount(data);
        searchAccountStatements(data);
    }

    const searchAccountStatements = async (codeLocalAccount: string) => {
        setisLoading(true);
        try {
            const data: RSAccountStatementList[] = (await AccountStatementService.getStatementList(codeLocalAccount)).data.data || [];
            if (data) {
                setaccountStatements(data);
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

    const handleAccountStatementSelection = (data: RSAccountStatementList) => {
        searchAccountStatement(data.code);
    }

    const searchAccountStatement = async (codeHistoricLog: string) => {

        setisLoading(true);
        try {
            const data: RSAccountStatement | undefined = (await AccountStatementService.getStatementHistoric(codeHistoricLog)).data.data;
            if (data) {
                setaccountStatement(data);
                setactiveAccountStatement(true);
                setactiveAccountStatementTable(false);
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

    const generateAccountState = async () => {
        setisLoading(true);
        try {
            const data: RSAccountStatement | undefined = (await AccountStatementService.getStatementCurrent(codeLocalAccount || '')).data.data;
            if (data) {
                setaccountStatement(data);
                setactiveAccountStatement(true);
                setactiveAccountStatementTable(false);
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
                                    label='Numero de Cuenta'
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
                            <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                <SizeButton
                                    text={'Generar Estado de Cuenta'}
                                    onClick={generateAccountState}
                                    style={ButtonStyle.MEDIUM} palette={{
                                        backgroundColor: ColorPalette.PRIMARY,
                                    }} />
                            </div>
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
                onConfirm={() => codeLocalAccount && searchAccountStatements(codeLocalAccount)}
                onReject={() => navigate('/cliente')}
            />
        </>
    )
}

export default AccountStatementBank