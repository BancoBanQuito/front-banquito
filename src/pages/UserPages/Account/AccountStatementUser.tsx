import { ChevronLeft, Print } from '@mui/icons-material';
import { Box, Fade, Card, CardContent } from '@mui/material';
import React, { ReactInstance, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import ButtonIcon from '../../../components/atoms/ButtonIcon';
import AccountStatementBody from '../../../components/organisms/Account/AccountStatementBody';
import AccountStatementTable from '../../../components/organisms/Account/AccountStatementTable';
import SearchAccount from '../../../components/organisms/Account/SearchAccount';
import ErrorModalOrganism from '../../../components/organisms/ErrorModalOrganism';
import LoadOrganism from '../../../components/organisms/LoadOrganism';
import { RSAccountStatement } from '../../../services/account/dto/RSAccountStatement';
import { RSAccountStatementList } from '../../../services/account/dto/RSAccountStatementList';
import { ColorPalette } from '../../../style/ColorPalette';
import { AccountStatementService } from '../../../services/AccountStatementService';
import { SizeButton } from '../../../components/atoms/SizeButton';
import { ButtonStyle } from '../../../style/ButtonStyle';

interface AccountStatementBankUserProps {
    client?: boolean
}

const userCodeLocalAccount = 'a3998d173acbf0c893db';

const AccountStatementBankUser = (props: AccountStatementBankUserProps) => {
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [activeSearchBox, setactiveSearchBox] = useState<boolean>(true);
    const [activeAccountStatement, setactiveAccountStatement] = useState<boolean>(false);
    const [activeAccountStatementTable, setactiveAccountStatementTable] = useState<boolean>(false);
    const [accountStatementList, setaccountStatementList] = useState<RSAccountStatementList[]>();
    const [selectedAccountStatement, setselectedAccountStatement] = useState<RSAccountStatement>();
    const [codeLocalAccount, setcodeLocalAccount] = useState<string>("");

    useEffect(() => {
        if (!!props.client) {
            setactiveSearchBox(false);
            handleSearch(userCodeLocalAccount);
        } else {
            setactiveSearchBox(true);
        }
        return () => { }
    }, [])


    const navigate = useNavigate();
    const printRef = useRef();

    const handleBackEvent = () => {
        setactiveAccountStatementTable(true);
        setactiveAccountStatement(false);
        setselectedAccountStatement(undefined);
    }

    const handleSearch = (data: string) => {
        setcodeLocalAccount(data);
        setactiveSearchBox(false);
        searchAccountStamentsList(data);
    }

    const searchAccountStamentsList = async (codeLocalAccount: string) => {
        setisLoading(true);
        try {
            const data: RSAccountStatementList[] | undefined = (await AccountStatementService.getStatementList(codeLocalAccount)).data.data;
            if (data) {
                setaccountStatementList(data);
                setactiveAccountStatementTable(true);
                console.log(accountStatementList);
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
        setactiveAccountStatementTable(false);
        setactiveAccountStatement(true);
        searchSelectedAccountStatement(codeLocalAccount);
    }

    const searchSelectedAccountStatement = async (data: string) => {
        setisLoading(true);
        try {
            const data: RSAccountStatement | undefined = (await AccountStatementService.getStatementHistoric(codeLocalAccount)).data.data;
            if (data) {
                setactiveAccountStatementTable(false);
                setselectedAccountStatement(data);
                setactiveAccountStatement(true);
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

    const generateAccountStatement = async () => {
        setisLoading(true);
        try {
            const data: RSAccountStatement | undefined = (await AccountStatementService.getStatementCurrent(codeLocalAccount)).data.data;
            if (data) {
                setactiveAccountStatementTable(false);
                setselectedAccountStatement(data);
                setactiveAccountStatement(true);
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
                {!(!!props.client) && <div style={{
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
                </div>}
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
                                    style={ButtonStyle.BIG} palette={{
                                        backgroundColor: ColorPalette.PRIMARY,
                                    }}
                                    size={{
                                        width: 'auto',
                                        height: 'auto'
                                    }}
                                    onClick={() => generateAccountStatement()} />
                            </div>
                            <AccountStatementTable
                                data={accountStatementList || []}
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
                                accountStatement={selectedAccountStatement}
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
                onConfirm={() => codeLocalAccount && searchAccountStamentsList(codeLocalAccount)}
                onReject={() => navigate('/cliente')}
            />
        </>
    )
}

export default AccountStatementBankUser;
