import CreateUser from "../components/organisms/Login/CreateUser";
import Login from "../components/organisms/Login/Login";
import AccountCreateClient from "../pages/ClientPages/Account/AccountCreateClient";
import Branch from "../pages/ClientPages/Branches/Branch";
import { UpdateClient } from "../pages/ClientPages/Client/UpdateClient";
import InterestInvestmentPolicies from "../pages/ClientPages/Transaction/InterestInvestmentPolicies";
import InterestSavingAccounts from "../pages/ClientPages/Transaction/InterestSavingAccounts";
import AccountStatementBankUser from "../pages/UserPages/Account/AccountStatementUser";
import TransactionBeetwenDates from "../pages/UserPages/Transaction/TransactionBeetwenDates";
import TransferUser from "../pages/UserPages/Transaction/TransferUser";

export const clientRoutes = [
    {
        path: "cuenta/crear",
        element: <AccountCreateClient />,
    },
    {
        path: "cliente/editar",
        element: <UpdateClient />,
    },
    {
        path: "sucursales",
        element: <Branch />,
    },
    {
        path: "cuenta/estado",
        element: <AccountStatementBankUser client />,
    },
    {
        path: "cuenta/transaccion",
        element: <TransferUser client />,
    },
    {
        path: "cuenta/transaccion/dias",
        element: <TransactionBeetwenDates client />,
    },
    {
        path: "signup",
        element: <CreateUser redirect="/cliente" />,
    },
    {
        path: "interes/cuenta/ahorros",
        element: <InterestSavingAccounts />,
    },
    {
        path: "interes/inversion",
        element: <InterestInvestmentPolicies />,
    },
    {
        path: "login",
        element: (
            <Login redirect="/cliente" />
        ),
    },
];
