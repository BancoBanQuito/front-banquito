import { useState } from "react";
import { Location } from "./pages/UserPages/Locations/Location";
import theme from "./style/Theme";
import Error404 from "./pages/ErrorPages/Error404";
import HomeClient from "./pages/ClientPages/HomeClient";
import HomeUser from "./pages/UserPages/HomeUser";
import Login from "./components/organisms/Login/Login";
import Layout from "./template/Layout";
import AccountCreateUser from "./pages/UserPages/Account/AccountCreateUser";
import TransferUser from "./pages/ClientPages/Transaction/TransferClient";
import TransferBank from "./pages/UserPages/Transaction/TransferBank";
import AccountCreateBank from "./pages/ClientPages/Account/AccountCreateBank";
import Branch from "./pages/ClientPages/Branches/Branch";
import BranchUser from "./pages/UserPages/Branches/BranchUser";
import HolidayUser from "./pages/UserPages/Holidays/HolidayUser";
import TransactionBeetwenDates from "./pages/UserPages/Transaction/TransactionBeetwenDates";
import InterestRateLog from './components/organisms/interestrate/InterestRateLog';
import AccountAvailableBalance from './pages/ATMPages/Account/AccountAvailableBalance';
import AccountConsolidatedPosition from './pages/ClientPages/Account/AccountConsolidatedPosition';
import ProductLinkAssociatedService from './pages/ProductLinkAssociatedService';
import { Product } from './pages/ProductPages/Product';
import { ProductType } from './pages/ProductPages/ProductType';
import AccountCreateSignature from './pages/ClientPages/Account/AccountCreateSignature';
import AccountEditSignature from './pages/ClientPages/Account/AccountEditSignature';
import AccountCancel from './pages/ClientPages/Account/AccountCancel';
import { BankEntity } from "./components/organisms/BankEntity/BankEntity";
import { UpdateBankEntity } from './components/organisms/BankEntity/UpdateBankEntity';
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DepositBank from "./pages/UserPages/Transaction/DepositBank";
import { Home } from "@mui/icons-material";
import CreateUser from "./components/organisms/Login/CreateUser";
import AccountStatementClient from "./pages/UserPages/Account/AccountStatementClient";
import CreateRequestService from "./pages/CreateRequestService";

interface userProps {
  username: string,
  password: string
}

const App = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<userProps | null>(null);

  const userRoutes = [
    {
      path: "",
      element: <HomeUser user={user} isLogged={isLogged} />,
    },
    {
      path: "ubicaciones",
      element: <Location />,
    },
    {
      path: "cuenta/crear",
      element: <AccountCreateBank />,
    },
    {
      path: "cuenta/estado",
      element: <AccountStatementClient />,
    },
    {
      path: "transaccion",
      element: <TransferBank />,
    },
    {
      path: "sucursales",
      element: <BranchUser />,
    },
    {
      path: "feriados",
      element: <HolidayUser />
    },
    {
      path: "account/signature",
      element: <AccountCreateSignature />,
    },
    {
      path: "edit/account/signature",
      element: <AccountEditSignature />,
    },
    {
      path: "account/cancel",
      element: <AccountCancel />,
    },
    {
      path: "transaccion/fechas",
      element: <TransactionBeetwenDates />,
    },
    {
      path: "deposito",
      element: <DepositBank/>
    },
    {
      path: "retiros",
      element: <WithdrawalsBank/>
    },
    {
      path: "interes",
      element: <InterestRateLog />,
    },
    {
      path: "agregar/tipo-de-producto",
      element: <AccountCreateUser />,
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
      path: "tipo-de-producto",
      element: <ProductType />,
    },
    {
      path: "producto/servicio",
      element: <CreateRequestService
        openDialog={true}
      />,
    },
    {
      path: "producto-vincular-servicio",
      element: <ProductLinkAssociatedService
        onSubmit={() => { }}
      />,
    },
    {
      path: "cuenta/posicion-consolidada",
      element: <AccountConsolidatedPosition />,
    },
    {
      path: "login",
      element: <Login setUser={setUser} setIsLogged={setIsLogged} redirect='/usuario' />
    }
  ];

  const clientRoutes = [
    {
      path: "",
      element: <HomeClient user={user} isLogged={isLogged} />,
    },
    {
      path: "cuenta/crear",
      element: <AccountCreateUser />,
    },
    {
      path: "sucursales",
      element: <Branch />
    },
    {
      path: "cuenta/estado",
      element: <AccountStatementClient client />,
    },
    {
      path: "transaccion",
      element: <TransferUser />,
    },
    {
      path: "fechaTransaccion",
      element: <TransactionBeetwenDates/>
    },
    {
      path: "signup",
      element: <CreateUser redirect="/cliente" />,
    },
    {
      path: "login",
      element: <Login setUser={setUser} setIsLogged={setIsLogged} redirect='/cliente' />
    }
  ]

  const atmRoutes = [
    {
      path: "",
      element: <HomeClient user={user} isLogged={isLogged} />,
    },
    {
      path: "cuenta/saldo",
      element: <AccountAvailableBalance />
    }
  ]

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout isLogged={isLogged} setIsLogged={setIsLogged} user={{}} />}>
            <Route index element={<Home />} />
            {userRoutes.map((route) => (
              <Route
                key={route.path}
                path={`usuario/${route.path}`}
                element={route.element}
              />
            ))}
            {clientRoutes.map((route) => (
              <Route
                key={route.path}
                path={`cliente/${route.path}`}
                element={route.element}
              />
            ))}
            {atmRoutes.map((route) => (
              <Route
                key={route.path}
                path={`atm/${route.path}`}
                element={route.element}
              />
            ))}
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
