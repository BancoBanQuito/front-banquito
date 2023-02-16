import Login from "../components/organisms/Login/LoginForm";
import AccountCreateClient from "../pages/ClientPages/Account/AccountCreateClient";
import AccountStatementPage from "../pages/ClientPages/Account/AccountStatementPage";
import Branch from "../pages/ClientPages/Branches/Branch";
import { UpdateClient } from "../pages/ClientPages/Client/UpdateClient";
import CreateUser from "../pages/ClientPages/CreateUser";
import HomeClient from "../pages/ClientPages/HomeClient";
import LoginClient from "../pages/ClientPages/LoginClient";
import InterestInvestmentPolicies from "../pages/ClientPages/Transaction/InterestInvestmentPolicies";
import InterestSavingAccounts from "../pages/ClientPages/Transaction/InterestSavingAccounts";
import AccountStatementBankUser from "../pages/UserPages/Account/AccountStatementUser";
import TransactionBeetwenDates from "../pages/UserPages/Transaction/TransactionBeetwenDates";
import TransferUser from "../pages/UserPages/Transaction/TransferUser";

export const clientRoutes = [
    {
        path: "inicio",
        element: <HomeClient />,
    },
    {
        path: "cuenta/estado/:id",
        element: <AccountStatementPage />,
    },
    {
        path: "login",
        element: <LoginClient />,
    },
    {
        path: "crear/usuario",
        element: <CreateUser />,
    },
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
        path: "cuenta/transaccion",
        element: <TransferUser client />,
    },
    {
        path: "cuenta/transaccion/dias",
        element: <TransactionBeetwenDates client />,
    },
    {
        path: "interes/cuenta/ahorros",
        element: <InterestSavingAccounts />,
    },
    {
        path: "interes/inversion",
        element: <InterestInvestmentPolicies />,
    }
];
