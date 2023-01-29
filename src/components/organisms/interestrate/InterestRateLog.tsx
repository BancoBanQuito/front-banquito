import { Typography, Tooltip, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InterestRateService from '../../../services/product/interestrate/interestRate.service';
import IInterestRate from '../../../services/product/models/interestRate.model';
import { ButtonStyle } from '../../../style/ButtonStyle';
import { ColorPalette } from '../../../style/ColorPalette';
import ButtonIcon from '../../atoms/ButtonIcon';
import { SizeButton } from '../../atoms/SizeButton';
import TextFieldAtom from '../../atoms/TextFieldAtom';
import TableMolecule from '../../molecules/TableMolecule';
import FormInterestRate from './FormInterestRate';
import FormInterestRateLog from './FormInterestRateLog';
import { Content, ReturnButton, SearchContainer, ContentButtonAddRight } from './InteresRate';
import { Add, AddCircle, Check, Close, Info, KeyboardBackspace } from '@mui/icons-material';


const InterestRateLog = () => {

    const [rows, setRows] = useState<any>([
        [
            <Typography>
            </Typography>,
            <Typography>
            </Typography>,
            <Typography>
            </Typography>,
            <Typography>
            </Typography>,
            <Typography>
            </Typography>
        ]
    ]);

    const [name, setName] = useState<string>('');
    const [isActiveAddValue, setIsActiveAddValue] = useState(false);
    const [isActiveAddInteresRate, setIsActiveAddInteresRate] = useState(false);
    const [isCreateData, setIsCreateData] = useState(false);

    const returnButtonForms = () => {
        setIsActiveAddInteresRate(false);
        setIsActiveAddValue(false);
    }

    const addValue = () => {
        setIsActiveAddValue(true);
    }

    const addInteresRate = () => {
        setIsActiveAddInteresRate(true);
    }




    const getInteretRateList = async () => {
        let interestList = await InterestRateService.getInterestRates();
        console.log(interestList);
        let rows = row(interestList);
        setRows(rows);
        return rows;
    }
    const getInteretRateListByName = async () => {
        let interestList = await InterestRateService.getInterestRatesByName(name);
        console.log(interestList);
        let rows = row(interestList);
        setRows(rows);
        return rows;
    }

    useEffect(() => {
        if (name === '') {
            getInteretRateList();
        }
        else {
            getInteretRateListByName();
        }

    }, [name, isCreateData])



    const headers = [
        <Typography>
            Nombre
        </Typography>,
        <Typography>
            Tipo
        </Typography>,
        <Typography>
            Calculo base
        </Typography>,
        <Typography>
            Valor de la tasa
        </Typography>,
        <Typography>
            Acciones
        </Typography>
    ];

    const changeStatus = async (interestRate: any, status: string) => {
        interestRate.status = status;
        let data = {
            id: interestRate.id,
            status: interestRate.status,
            name: '',
            type: '',
            value: 0,
            calcBase: ''
        }

        let response = await InterestRateService.updateInterestRateStatus(data);
        console.log(response);
        getInteretRateList();
    }

    const row = (interestList: any) => {
        let rows = interestList.map((interestRate: IInterestRate) => {
            return [
                <Typography>
                    {interestRate.name}
                </Typography>,
                <Typography>
                    {interestRate.type}
                </Typography>,
                <Typography>
                    {interestRate.calcBase}
                </Typography>,
                <Typography>
                    {interestRate.value ? interestRate.value :
                        <Tooltip title="Agregue un valor de tasa de interés">
                            <Info  color='secondary' />
                        </Tooltip>}
                </Typography>,
                <Typography>
                    {interestRate.status == 'ACT' ?
                        <SizeButton palette={{ backgroundColor: ColorPalette.PRIMARY }}
                            icon={<Close />}
                            text="Deshabilitar"
                            onClick={() => { changeStatus(interestRate, 'INA') }}
                            style={ButtonStyle.MEDIUM}
                        /> : interestRate.status == 'INA' ?
                            <SizeButton palette={{ backgroundColor: ColorPalette.TERNARY }}
                                icon={<Check />}
                                text="Habilitar"
                                onClick={() => { changeStatus(interestRate, 'ACT') }}
                                style={ButtonStyle.MEDIUM}
                            /> :
                            <Tooltip title="Agregue un valor de tasa de interés">
                                <Info color='secondary' />
                            </Tooltip>
                    }

                </Typography>
            ]
        })
        return rows;
    }



    if (isActiveAddValue) {
        return (
            <FormInterestRateLog action={returnButtonForms}
                setVal={(val: boolean) => { setIsCreateData(val) }}
                isCreate={isCreateData}
            />
        )
    }

    if (isActiveAddInteresRate) {
        return (
            <FormInterestRate action={returnButtonForms}
                setValue={(val: boolean) => { setIsCreateData(val) }}
                isCreate={isCreateData}
            />
        )
    }

    return (
        <Container>
            <Content>
                <ReturnButton>
                    <ButtonIcon color={ColorPalette.PRIMARY} icon={<KeyboardBackspace />} onClick={() => console.log('Buscar')} top={true} />
                </ReturnButton>
                <div>
                    <h1>Registros de Tasas de Interés</h1>
                </div>
                {/* Buscar tasa de interes */}
                <div>
                    <SearchContainer>
                        <span>Buscar por Nombre: </span>
                        <TextFieldAtom
                            id="id"
                            label="Nombre tasa de interes"
                            color="primary"
                            type="text"
                            placeholder="id"
                            variant="standard"
                            action={(event) => setName(event.target.value)}
                            value=""
                        />
                    </SearchContainer>
                    <ContentButtonAddRight>
                        <ButtonIcon color={ColorPalette.TERNARY} icon={<AddCircle />} onClick={() => addValue()} top={true} />
                        <span>Agregar Valor de Interés</span>
                    </ContentButtonAddRight>
                    <div>
                        <TableMolecule headers={headers} rows={rows} />
                    </div>

                    <ContentButtonAddRight>
                        <SizeButton palette={{ backgroundColor: ColorPalette.TERNARY }}
                            icon={<Add />}
                            onClick={() => addInteresRate()}
                            text="Agregar"
                            style={ButtonStyle.BIG}
                        />
                    </ContentButtonAddRight>
                </div>
            </Content>
        </Container>
    );
}

export default InterestRateLog
