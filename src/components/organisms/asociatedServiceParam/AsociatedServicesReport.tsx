import React, { useEffect, useState } from 'react'
import TableMolecule from '../../molecules/TableMolecule'
import { Container, Content } from '../interestrate/InteresRate'
import RequestServiceService from '../../../services/product/asociatedServices/asociatedServices.service';
import { Typography } from '@mui/material';
import { Spinner } from '../../atoms/Spinner';
// Add icon
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ButtonIcon from '../../atoms/ButtonIcon';
import AddParam from './AddParam';
import { ColorPalette } from '../../../style/ColorPalette';
// view icon
import VisibilityIcon from '@mui/icons-material/Visibility';
import ParamReport from './ParamReport';





export const AsociatedServicesReport = () => {
    const [activateSpinner, setActivateSpinner] = useState(false);
    const [report, setReport] = useState<any>([])
    const [rows, setRows] = useState<any>([])
    const [isAdd, setIsAdd] = useState(false)
    const [selectId, setSelectId] = useState('')
    const [isView, setIsView] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        getReport()
    }, [])

    const headersTable = [
        <Typography>Servicio Asociado</Typography>,
        <Typography>Valor</Typography>,
        <Typography>Parámetro</Typography>,]

    const createRows = () => report.map((item: any) => {
        return [
            <Typography>{item.name}</Typography>,
            <Typography>{item.fee}</Typography>,
            <Typography>
                <ButtonIcon icon={<AddIcon />}
                    onClick={() => createParam(item.id)}
                    color={ColorPalette.TERNARY}
                />
                 <ButtonIcon icon={<VisibilityIcon />}
                    onClick={() => {viewParam(item.id, item.name)}}
                    color={ColorPalette.TERNARY}
                />
            </Typography>,
        ]
    })

    const viewParam = (id: string, name: string) => {

        setSelectId(id)
        setName(name)
        setIsView(true)
    }
    const createParam = (id: string) => {
        setSelectId(id)
        setIsAdd(true)
    }

    const getReport = async () => {
        try {
            setActivateSpinner(true);
            
            let data = await RequestServiceService.getAsociatedServices();
            setReport(data);
            let rowList = createRows();
            setRows(rowList);
            setActivateSpinner(false);
        } catch (error) {
            console.log(error);
            setActivateSpinner(false);
        }
    }



    if (isAdd) {
        return (<AddParam
            id={selectId}
            action={() => setIsAdd(false)}
        />)
    }

    if (isView) {
        return (<ParamReport
            id={selectId}
            action={() => setIsView(false)}
            name={name}

        />)
    }

    return (
        <Container>
            {activateSpinner ? <Spinner /> : null}

            <Content>
                <h1>Servicios asociados</h1>

                <TableMolecule
                    headers={headersTable}
                    rows={rows}
                />
            </Content>
        </Container>
    )
}

