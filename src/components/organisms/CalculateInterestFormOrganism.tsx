import React, { ChangeEvent, FormEvent, useState } from 'react'
import { RSAccount } from '../../services/account/dto/RSAccount'
import { AlertColor, Box, Typography } from '@mui/material';
import { Dropdown } from '../atoms/Dropdown';
import { DataToDropdownUtils } from '../../utils/DataToDropdownUtils';
import { InterestService } from '../../services/transaction/InterestService';
import TextFieldAtom from '../atoms/TextFieldAtom';
import { SizeButton } from '../atoms/SizeButton';
import { ButtonStyle } from '../../style/ButtonStyle';
import { ColorPalette } from '../../style/ColorPalette';
import { RSInvestmentInterest } from '../../services/transaction/dto/RSInvestmentInterest';
import InterestResultCardOrganism from './InterestResultCardOrganism';
import SnackBarMolecule from '../molecules/SnackBarMolecule';
import LoadSpinner from '../atoms/LoadSpinner';

interface CalculateInterestFormOrganismProps {
    accounts: RSAccount[];
}

const CalculateInterestFormOrganism = (props: CalculateInterestFormOrganismProps) => {

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [messageLoading, setmessageLoading] = useState<string | undefined>();

    const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');

    const [interestResult, setinterestResult] = useState<RSInvestmentInterest | undefined>();

    const [tryToLook, settryToLook] = useState<boolean>(false);

    const [formData, setformData] = useState<{
        codeLocalAccount: string;
        capital: number;
        ear: number;
        days: number;
    }>({
        codeLocalAccount: props.accounts[0].codeInternationalAccount,
        capital: 0,
        ear: 0,
        days: 0
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        calculateInterest(formData.codeLocalAccount, formData.days, formData.capital, formData.ear);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setformData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const calculateInterest = async (id: string, days: number, capital: number, ear: number) => {
        setisLoading(true);
        try {
            settryToLook(true);
            const data = (await InterestService.getInterestInvestment(id, days, capital, ear)).data.data
            if (data) {
                setinterestResult(data);
            }
        } catch (error: any) {
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
            <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box
                    component='form'
                    onSubmit={handleSubmit}
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Dropdown
                        label={'Tus cuentas'}
                        items={DataToDropdownUtils.accountToDropdown(props.accounts)}
                        width={'100%'}
                        height={'auto'}
                        required
                        backgroundColor='white'
                        onChange={(value) => {
                            setformData({
                                ...formData,
                                codeLocalAccount: value
                            })
                        }} />
                    <TextFieldAtom
                        label='Dias'
                        required
                        fullWidth
                        name='days'
                        type={'number'}
                        onChange={handleChange} />
                    <TextFieldAtom
                        label='Capital'
                        required
                        fullWidth
                        name='capital'
                        step={0.01}
                        onChange={handleChange}
                        type={'number'} />
                    <TextFieldAtom
                        label='Ear'
                        required
                        fullWidth
                        name='ear'
                        type={'number'}
                        onChange={handleChange} />
                    <SizeButton
                        submit
                        text={'Calcular'}
                        style={ButtonStyle.SMALL} palette={{
                            backgroundColor: ColorPalette.PRIMARY
                        }} />
                </Box>
                <hr style={{ width: '100%' }} />
                {
                    isLoading ?
                        <LoadSpinner /> : <>
                            {
                                tryToLook && !interestResult && <>
                                    <Typography variant='h6' color='secondary' fontSize='0.75rem'>No se han obtenido resultados</Typography></>
                            }
                            {
                                tryToLook && !!interestResult && <InterestResultCardOrganism interest={interestResult} />
                            }
                        </>
                }
            </Box>
            <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
        </>
    )
}

export default CalculateInterestFormOrganism