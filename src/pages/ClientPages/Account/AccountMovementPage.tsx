import React, { useEffect, useState } from 'react'
import CardMolecule from '../../../components/molecules/CardMolecule'
import { AlertColor, Box, Card, CardContent, Typography } from '@mui/material'
import DatePickerAtom from '../../../components/atoms/DatePickerAtom'
import dayjs, { Dayjs } from 'dayjs'
import { RSTransaction } from '../../../services/transaction/dto/RSTransaction'
import MovementCardOrganism from '../../../components/organisms/MovementCardOrganism'
import ModalOrganism from '../../../components/organisms/ModalOrganism'
import OnConstructionMolecule from '../../../components/molecules/OnConstructionMolecule'
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule'
import LoadOrganism from '../../../components/organisms/LoadOrganism'
import { TransactionService } from '../../../services/transaction/TransactionService'
import TransactionCheckForm from '../../../components/organisms/Transaction/TransactionCheckForm'

interface AccountMovementOranismProps {
    codeLocalAccount: string;
    fromDate?: number;
    toDate?: number;
}

const AccountMovementPage = (props: AccountMovementOranismProps) => {

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [messageLoading, setmessageLoading] = useState<string | undefined>();

    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

    const [fromDate, setfromDate] = useState<Dayjs | null>(props.fromDate ? dayjs(props.fromDate) : dayjs().set('month', dayjs().get('month') - 1));
    const [toDate, settoDate] = useState<Dayjs | null>(props.toDate ? dayjs(props.toDate) : dayjs());
    const [transactions, settransactions] = useState<RSTransaction[]>([]);

    const [selectedTransaction, setselectedTransaction] = useState<RSTransaction | undefined>();
    const [openModal, setopenModal] = useState<boolean>(false);

    useEffect(() => {
        retriveAccountMovements(props.codeLocalAccount);
        return () => { }
    }, [props.codeLocalAccount])


    const handleFromChange = (date: Dayjs | null) => {
        setfromDate(date);
        retriveAccountMovements(props.codeLocalAccount);
    }

    const handleToChange = (date: Dayjs | null) => {
        settoDate(date);
        retriveAccountMovements(props.codeLocalAccount);
    }

    const handleTransactionChange = (data: RSTransaction) => {
        setselectedTransaction(data);
        setopenModal(true);
    }

    const retriveAccountMovements = async (id: string) => {
        setisLoading(true);
        try {
            const data: RSTransaction[] = (await TransactionService
                .getTransaction(id, fromDate?.format('YYYY-MM-DDThh:mm:ss') || '', toDate?.format('YYYY-MM-DDThh:mm:ss') || '')).data.data || [];
            settransactions(data);
            settitleSnack("Movimientos");
            setmessageSnack("Movimientos cargados correctamente");
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
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem'
            }}
                variant='outlined'>
                <CardContent>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                        <DatePickerAtom
                            label={'Desde'}
                            value={fromDate}
                            onChange={handleFromChange} />
                        <DatePickerAtom label={'Hasta'}
                            value={toDate}
                            onChange={handleToChange} />
                    </div>
                    <hr style={{ width: '100%' }} />
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {
                            transactions.length <= 0 ?
                                <>
                                    <Typography variant='h6' color='secondary'>Lo sentimos</Typography>
                                    <Typography variant='body1'>Parece que aun no hay movimientos en tu cuenta</Typography>

                                </>
                                :
                                transactions.map(transaction => {
                                    return <MovementCardOrganism
                                        onClick={() => handleTransactionChange(transaction)}
                                        transaction={transaction} />
                                })
                        }
                    </Box>
                </CardContent>
            </Card>
            <ModalOrganism
                open={openModal}
                onClose={() => setopenModal(false)}>
                {/* Introducir cuerpo cuenta origen - cuenta destino */}
                <OnConstructionMolecule />
            </ModalOrganism>
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

export default AccountMovementPage