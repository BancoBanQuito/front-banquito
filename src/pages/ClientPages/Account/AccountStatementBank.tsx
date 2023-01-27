import React, { ReactInstance, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/system'
import { Card, CardContent, Fade, Modal, Typography } from '@mui/material'
import { ChevronLeft, Print } from '@mui/icons-material'
import ReactToPrint from 'react-to-print'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, Fade } from '@mui/material'
import { ChevronLeft, Print } from '@mui/icons-material'
import ButtonIcon from '@/components/atoms/ButtonIcon'
import AccountStatementBody from '@/components/organisms/Account/AccountStatementBody'
import SearchAccount from '@/components/organisms/Account/SearchAccount'
import ErrorModalOrganism from '@/components/organisms/ErrorModalOrganism'
import LoadOrganism from '@/components/organisms/LoadOrganism'
import { AccountStatementService } from '@/services/account/AccountStatementService'
import { RSAccountStatement } from '@/services/account/dto/RSAccountStatement'
import { ColorPalette } from '@/style/ColorPalette'

interface AccountStatementBankProps {
    client?: boolean
}

const userCodeLocalAccount = '1234567890';

const AccountStatementBank = (props: AccountStatementBankProps) => {
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [activeSearchBox, setactiveSearchBox] = useState<boolean>(true);
    const [activeAccountStatement, setactiveAccountStatement] = useState<boolean>(false);
    const [activeAccountStatementTable, setactiveAccountStatementTable] = useState<boolean>(false);
    const [accountStatement, setaccountStatement] = useState<RSAccountStatement>();
    const [accountStatements, setaccountStatements] = useState<RSAccountStatementList[]>([]);
    const [accountNumberData, setaccountNumberDate] = useState<string>();

    useEffect(() => {
        if (!!props.client) {
            setactiveSearchBox(false);
            setcodeLocalAccount(userCodeLocalAccount);
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
        // setaccountStatement(undefined);
    }

    const handleSearch = (data: string) => {
        setaccountNumberDate(data);
        searchAccountStatement(data);
    }

    const handleAccountStatementSelection = (data: RSAccountStatementList) => {
        setaccountStatement(data);
        /* setactiveAccountStatementTable(false); */
        setactiveAccountStatement(true);
    }

    const searchAccountStatement = async (codeLocalAccount: string, identificationType?: string) => {
        setisLoading(true);
        try {
            const data: AccountStament | undefined = (await AccountStatementService.getStatementCurrent(codeLocalAccount)).data.data;
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
                            <AccountStatementTable
                                data={accountStatements}
                                onSelection={handleAccountStatementSelection} />
                        </div>
                    </Fade>
                </div> */}
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
