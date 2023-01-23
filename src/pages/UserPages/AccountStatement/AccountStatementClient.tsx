import React, { ReactInstance, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/system'
import { Fade, Modal, Typography } from '@mui/material'
import { ColorPalette } from '../../../style/ColorPalette'
import { ChevronLeft, Print } from '@mui/icons-material'
import { AccountStament } from '../../../services/account/model/AccountStatement'
import { AccountStatementService } from '../../../services/account/accountStatementService'
import ButtonIcon from '../../../components/atoms/ButtonIcon'
import ReactToPrint from 'react-to-print'
import AccountStatementBody from '../../../components/organisms/AccountStatement/AccountStatementBody'
import AccountStatementTable from '../../../components/organisms/AccountStatement/AccountStatementTable'
import { useNavigate } from 'react-router-dom'

const AccountStatementClient = () => {

    const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");
    const [activeAccountStatement, setactiveAccountStatement] = useState<boolean>(false);
    const [activeAccountStatementTable, setactiveAccountStatementTable] = useState<boolean>(true);
    const [accountStatement, setaccountStatement] = useState<AccountStament | undefined>();
    const [accountStatements, setaccountStatements] = useState<AccountStament[]>();

    const navigate = useNavigate();

    const printRef = useRef();

    useEffect(() => {
        searchAccountStatement('1751990332');
        return () => { }
    }, [])


    const handleBackEvent = () => {
        setactiveAccountStatementTable(true);
        setactiveAccountStatement(false);
        setaccountStatement(undefined);
    }

    const handleAccountStatementSelection = (data: AccountStament) => {
        setaccountStatement(data);
        setactiveAccountStatementTable(false);
        setactiveAccountStatement(true);
    }

    const searchAccountStatement = async (accountNumber: string) => {
        try {
            const data: AccountStament[] = (await AccountStatementService.getStatements(accountNumber)).data.data || [];
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
            <Modal
                open={activeErrorModal}
                onClose={() => { setactiveErrorModal(false); navigate('/cliente') }}>
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" component="h2" sx={{ textTransform: 'uppercase' }}>
                        A ocurrido un error
                    </Typography>
                    <Typography variant="body2" component="h2">
                        {errorMessage}
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default AccountStatementClient