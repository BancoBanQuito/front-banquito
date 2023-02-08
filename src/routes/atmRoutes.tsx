import AccountAvailableBalance from "../pages/ATMPages/Account/AccountAvailableBalance";
import DepositAtm from "../pages/ATMPages/Transaction/DepositAtm";
import WithdrawAtm from "../pages/ATMPages/Transaction/WithdrawAtm";

export const atmRoutes = [
    {
        path: "cuenta/saldo",
        element: <AccountAvailableBalance />,
    },
    {
        path: "cuenta/deposito",
        element: <DepositAtm />,
    },
    {
        path: "cuenta/retiro",
        element: <WithdrawAtm />,
    },
];