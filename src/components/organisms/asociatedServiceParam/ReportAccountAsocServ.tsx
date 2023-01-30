import React, { useEffect } from 'react'
import TableMolecule from '../../molecules/TableMolecule'
import { Container, Content } from '../interestrate/InteresRate'
import RequestServiceService from '../../../services/product/asociatedServices/asociatedServices.service';
import { Typography } from '@mui/material';
import { Spinner } from '../../atoms/Spinner';



export const ReportAccountAsocServ = () => {
    const [activateSpinner, setActivateSpinner] = useState(false);
    const [report, setReport] = React.useState<any>([])
    const [loading, setLoading] = React.useState<boolean>(false)
    const [rows, setRows] = React.useState<any>([])
    const headersTable = [
        <Typography>Servicio Asociado</Typography>,
        <Typography>Titular</Typography>,
        <Typography>Status</Typography>,
        <Typography>Numero de Cuenta</Typography>,
        <Typography>Acciones</Typography>,]

    const createRows = report.map((item: any) => {
        return [
            <Typography>{item.nameAssociatedService}</Typography>,
            <Typography>{item.fullName}</Typography>,
            <Typography>{item.status ? 'Activo' : 'Inactivo'}</Typography>,
            <Typography>{item.accountNumber}</Typography>,
            <Typography>Acciones</Typography>,
        ]
    })

    const getReport = async () => {
        setActivateSpinner(true);
        const data = await RequestServiceService.getRequestServices();
        setReport(data)
        setRows(createRows)
        setActivateSpinner(false);
        setLoading(false)
        console.log(data)
        console.log(rows)
    }

    useEffect(() => {
        getReport()
    }, [])

    return (
        <Container>
            {activateSpinner? <Spinner /> : null}
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

