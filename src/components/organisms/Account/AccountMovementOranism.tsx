import React, { useState } from 'react'
import CardMolecule from '../../molecules/CardMolecule'
import { Card, CardContent } from '@mui/material'
import DatePickerAtom from '../../atoms/DatePickerAtom'
import dayjs, { Dayjs } from 'dayjs'

interface AccountMovementOranismProps {
    fromDate?: number;
    toDate?: number;
    onFromDateChange?: (data: string) => void;
    onToDateChange?: (data: string) => void;
}

const AccountMovementOranism = (props: AccountMovementOranismProps) => {

    const [fromDate, setfromDate] = useState<Dayjs | null>(props.fromDate ? dayjs(props.fromDate) : dayjs().set('month', dayjs().get('month') - 1));
    const [toDate, settoDate] = useState<Dayjs | null>(props.toDate ? dayjs(props.toDate) : dayjs());

    const handleFromChange = (date: Dayjs | null) => {
        setfromDate(date);
        props.onFromDateChange?.(date?.format("YYYY-MM-DDThh:mm:ss") || '');
    }

    const handleToChange = (date: Dayjs | null) => {
        settoDate(date);
        props.onToDateChange?.(date?.format("YYYY-MM-DDThh:mm:ss") || '');
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
                </CardContent>
            </Card>
        </>
    )
}

export default AccountMovementOranism