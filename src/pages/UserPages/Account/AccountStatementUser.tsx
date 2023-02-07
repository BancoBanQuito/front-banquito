import { ChevronLeft, Print } from '@mui/icons-material';
import { Box, Fade, Card, CardContent, Typography } from '@mui/material';
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
import { SizeButton } from '../../../components/atoms/SizeButton';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { AccountStatementService } from '../../../services/account/AccountStatementService';
import { Dropdown } from '../../../components/atoms/Dropdown';
import { useUser } from '../../../context/UserContext';
import { AccountService } from '../../../services/account/AccountService';
import { RSAccount } from '../../../services/account/dto/RSAccount';
import InfoModalOrganism from '../../../components/organisms/InfoModalOrganism';

interface AccountStatementBankUserProps {
    client?: boolean;
}

const AccountStatementBankUser = (props: AccountStatementBankUserProps) => {
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [infoModal, setinfoModal] = useState<boolean>(false);
    const [infoMessage, setinfoMessage] = useState<string>('');
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [activeSearchBox, setactiveSearchBox] = useState<boolean>(true);
    const [activeAccountStatement, setactiveAccountStatement] = useState<boolean>(false);
    const [activeAccountStatementTable, setactiveAccountStatementTable] = useState<boolean>(false);
    const [accountStatementList, setaccountStatementList] = useState<RSAccountStatementList[]>();
    const [selectedAccountStatement, setselectedAccountStatement] = useState<RSAccountStatement>();
    const [codeLocalAccount, setcodeLocalAccount] = useState<string>("");
    const [accounts, setaccounts] = useState<{ name: string, value: string }[]>([]);

    const user = useUser();
    const navigate = useNavigate();
    const printRef = useRef();

    useEffect(() => {
        if (!!props.client) {
            retriveAllAccounts(user.identification || '', user.identificationType || '');
        }
        return () => { }
    }, []);

    const retriveAllAccounts = async (id: string, idType: string) => {
        setisLoading(true);
        try {
            const rsAccounts: RSAccount[] | undefined = (await AccountService.getAccountsById(idType, id)).data.data;
            if (!rsAccounts || rsAccounts.length <= 0) {
                setinfoMessage("No se han encontrado cuentas asociadas");
                setinfoModal(true);
                return;
            }
            const dropAccounts = rsAccounts.map(account => {
                return {
                    name: account.codeLocalAccount,
                    value: account.codeLocalAccount
                }
            });
            setaccounts(dropAccounts);
        } catch (error: any) {
            seterrorMessage(error.message);
            setactiveErrorModal(true);
        } finally {
            setisLoading(false);
        }
    }


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
        searchSelectedAccountStatementLog(data.code);
    }

    const searchSelectedAccountStatementLog = async (historicCode: string) => {
        setisLoading(true);
        try {
            const data: RSAccountStatement | undefined = (await AccountStatementService.getStatementHistoric(historicCode)).data.data;
            if (data) {
                setselectedAccountStatement(data);
                setactiveAccountStatementTable(false);
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
                top: 50
            }}>
                {!!props.client ? <div style={{
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
                                {accounts.length <= 0 ? <Typography variant='h6'>Es necesario crear una cuenta</Typography> :
                                    <>
                                        <Box mb={2} sx={{ fontStyle: 'italic', color: ColorPalette.SECONDARY }}>
                                            <Typography variant='h4' component='h6'>
                                                Selector de cuentas
                                            </Typography>
                                            <Typography variant='body1' component='h6'>
                                                Buscador
                                            </Typography>
                                        </Box>
                                        <Dropdown
                                            label={'Cuentas'}
                                            items={accounts}
                                            onChange={handleSearch}
                                            width={'100%'}
                                            height={'auto'} />
                                    </>}
                            </CardContent>
                        </Card>
                    </Fade>
                </div> : <div style={{
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
            <InfoModalOrganism
                active={infoModal}
                onDeactive={() => { }}
                text={infoMessage}
                onClick={() => { navigate('/cliente') }} />
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
