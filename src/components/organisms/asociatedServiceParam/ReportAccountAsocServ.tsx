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
import AddValueParam from './AddValueParam';




export const ReportAccountAsocServ = () => {
    const [activateSpinner, setActivateSpinner] = useState(false);
    const [report, setReport] = useState<any>([])
    const [rows, setRows] = useState<any>([])
    const [isAdd, setIsAdd] = useState(false)
    const [selectId, setSelectId] = useState('')
    const [selectName, setSelectName] = useState('')
    useEffect(() => {
        getReport()


    }, [])

    const headersTable = [
        <Typography>Servicio Asociado</Typography>,
        <Typography>Titular</Typography>,
        <Typography>Status</Typography>,
        <Typography>Numero de Cuenta</Typography>,
        <Typography>Acciones</Typography>,]

    const createRows = () => report.map((item: any) => {
      

        return [
            <Typography>{item.nameAssociatedService}</Typography>,
            <Typography>{item.fullName}</Typography>,
            <Typography>{item.status ? 'Activo' : 'Inactivo'}</Typography>,
            <Typography>{item.accountNumber}</Typography>,
            <Typography>
                <ButtonIcon icon={<AddIcon />}
                    onClick={() => createParam(item.nameAssociatedService,item.accountNumber)}
                    color={ColorPalette.TERNARY}
                />
            </Typography>,
        ]
    })

    const createParam = (name: string,account:string) => {
        setSelectId(account)
        setSelectName(name)
        setIsAdd(true)
    }

    const getReport = async () => {
        try {
            setActivateSpinner(true);
            let data = await RequestServiceService.getRequestServices();
            setReport(data);
            
            const rowList = createRows();

            setRows(rowList);

            setActivateSpinner(false);
        } catch (error) {
            console.log(error);
            setActivateSpinner(false);
        }

    }


    if (isAdd) {
        return (<AddValueParam
            name={selectName}
            action={() => setIsAdd(false)}
            account = {selectId}
        />)
    }

    return (
        <Container>
            {activateSpinner ? <Spinner /> : null}

            <Content>
                <h1>Solicitudes de servicios asociados</h1>

                <TableMolecule
                    headers={headersTable}
                    rows={rows}
                />
            </Content>
        </Container>
    )
}

