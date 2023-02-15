import { BankEntity } from "../components/organisms/BankEntity/BankEntity";
import { UpdateBankEntity } from "../components/organisms/BankEntity/UpdateBankEntity";
import CreateUser from "../components/organisms/Login/CreateUser";
import Login from "../components/organisms/Login/LoginForm";
import InterestRateLog from "../components/organisms/interestrate/InterestRateLog";
import CreateClient from "../pages/ClientPages/Client/CreateClient";
import CreateRequestService from "../pages/CreateRequestService";
import ProductLinkAssociatedService from "../pages/ProductLinkAssociatedService";
import { Product } from "../pages/ProductPages/Product";
import { ProductType } from "../pages/ProductPages/ProductType";
import AccountCancelUser from "../pages/UserPages/Account/AccountCancelUser";
import AccountConsolidatedPositionUser from "../pages/UserPages/Account/AccountConsolidatedPositionUser";
import AccountCreateSignatureUser from "../pages/UserPages/Account/AccountCreateSignatureUser";
import AccountCreateUser from "../pages/UserPages/Account/AccountCreateUser";
import AccountStatementBankUser from "../pages/UserPages/Account/AccountStatementUser";
import BranchUser from "../pages/UserPages/Branches/BranchUser";
import HolidayUser from "../pages/UserPages/Holidays/HolidayUser";
import HomeUser from "../pages/UserPages/HomeUser/HomeUser";
import { Location } from "../pages/UserPages/Locations/Location";
import SearchCardClient from "../pages/UserPages/SearchCardClient/SearchCardClient";
import SearchClientDataForm from "../pages/UserPages/SearchClientData/SearchClientDataForm";
import CreateSegment from "../pages/UserPages/Segment/CreateSegment";
import DepositBank from "../pages/UserPages/Transaction/DepositBank";
import TransactionBeetwenDates from "../pages/UserPages/Transaction/TransactionBeetwenDates";
import TransferUser from "../pages/UserPages/Transaction/TransferUser";
import WithdrawBank from "../pages/UserPages/Transaction/WithdrawBank";
import UpdateClientDataForm from "../pages/UserPages/UpdateClientLikeBankUser/UpdateClientLikeBankUser";

export const userRoutes = [
    {
        path: "inicio",
        element: <HomeUser />,
    },
    {
        path: "ubicaciones",
        element: <Location />,
    },
    {
        path: "cuenta/crear",
        element: <AccountCreateUser />,
    },
    {
        path: "cuenta/estado",
        element: <AccountStatementBankUser />,
    },
    {
        path: "cuenta/transaccion",
        element: <TransferUser />,
    },
    {
        path: "sucursales",
        element: <BranchUser />,
    },
    {
        path: "feriados",
        element: <HolidayUser />,
    },
    {
        path: "cuenta/firma",
        element: <AccountCreateSignatureUser />,
    },
    {
        path: "cuenta/cancelar",
        element: <AccountCancelUser />,
    },
    {
        path: "cuenta/deposito",
        element: <DepositBank />,
    },
    {
        path: "cuenta/retiro",
        element: <WithdrawBank />,
    },
    {
        path: "cuenta/transaccion/dias",
        element: <TransactionBeetwenDates />,
    },
    {
        path: "cuenta/interes",
        element: <InterestRateLog />,
    },
    {
        path: "entidad",
        element: <BankEntity />,
    },
    {
        path: "actualizar/entidad",
        element: <UpdateBankEntity />,
    },
    {
        path: "signup",
        element: <CreateUser redirect="/usuario" />,
    },
    {
        path: "producto",
        element: <Product />,
    },
    {
        path: "producto/tipo",
        element: <ProductType />,
    },
    {
        path: "producto/servicio",
        element: <CreateRequestService openDialog={true} />,
    },
    {
        path: "producto/vincular/servicio",
        element: <ProductLinkAssociatedService onSubmit={() => { }} />,
    },
    {
        path: "cuenta/posicion/consolidada",
        element: <AccountConsolidatedPositionUser />,
    },
    {
        path: "info-cliente",
        element: <SearchClientDataForm />,
    },
    {
        path: "buscar-info-cliente",
        element: <SearchCardClient />,
    },
    {
        path: "actualizar-info-cliente",
        element: <UpdateClientDataForm />,
    },
    {
        path: "crear-cliente",
        element: <CreateClient />,
    },
    {
        path: "segmento",
        element: <CreateSegment />,
    },
];