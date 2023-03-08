import { AlertColor, Box, Card, CardContent, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react'
import DatePickerAtom from '../../../components/atoms/DatePickerAtom';
import OnConstructionMolecule from '../../../components/molecules/OnConstructionMolecule';
import SnackBarMolecule from '../../../components/molecules/SnackBarMolecule';
import LoadOrganism from '../../../components/organisms/LoadOrganism';
import ModalOrganism from '../../../components/organisms/ModalOrganism';
import { InterestService } from '../../../services/transaction/InterestService';
import { RSSavingsAccountInterest } from '../../../services/transaction/dto/RSSavingsAccountInterest';
import InterestCardOrganism from '../../../components/organisms/InterestCardOrganism';

interface AccountInterestPageProps {
    codeLocalAccount: string;
    fromDate?: number;
    toDate?: number;
}

const AccountInterestPage = (props: AccountInterestPageProps) => {

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [messageLoading, setmessageLoading] = useState<string | undefined>();

    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

    const [openModal, setopenModal] = useState<boolean>(false);

    const [fromDate, setfromDate] = useState<Dayjs | null>(props.fromDate ? dayjs(props.fromDate) : dayjs().set('month', dayjs().get('month') - 1));
    const [toDate, settoDate] = useState<Dayjs | null>(props.toDate ? dayjs(props.toDate) : dayjs());

    const [interests, setinterests] = useState<RSSavingsAccountInterest[]>([]);

    useEffect(() => {
        retriveAccountInterests(props.codeLocalAccount);
        return () => { }
    }, [props.codeLocalAccount])


    const handleFromChange = (date: Dayjs | null) => {
        setfromDate(date);
        retriveAccountInterests(props.codeLocalAccount);
    }

    const handleToChange = (date: Dayjs | null) => {
        settoDate(date);
        retriveAccountInterests(props.codeLocalAccount);
    }

    const retriveAccountInterests = async (id: string) => {
        setisLoading(true);
        try {
            const data: RSSavingsAccountInterest[] | undefined = (await InterestService.getInterest(id, fromDate?.format('YYYY-MM-DDThh:mm:ss') || '', toDate?.format('YYYY-MM-DDThh:mm:ss') || '')).data.data || [];
            console.log(data);
            settitleSnack("Exito");
            setmessageSnack("Se han cargado los intereses");
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
                            interests.length <= 0 ?
                                <>
                                    <Typography variant='h6' color='secondary'>Lo sentimos</Typography>
                                    <Typography variant='body1'>Parece que aun no se ha generado ningun interes en tu cuenta</Typography>

                                </> : interests.map(interest => {
                                    return <>
                                        <InterestCardOrganism interest={interest} />
                                    </>
                                })
                        }
                    </Box>
                </CardContent>
            </Card>
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

export default AccountInterestPage