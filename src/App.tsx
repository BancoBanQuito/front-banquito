import { useState } from "react";
import { Location } from "./pages/UserPages/Locations/Location";
import theme from "./style/Theme";
import Error404 from "./pages/ErrorPages/Error404";
import HomeClient from "./pages/ClientPages/HomeClient";
import HomeUser from "./pages/UserPages/HomeUser/HomeUser";
import Login from "./components/organisms/Login/Login";
import { BankEntity } from "./components/organisms/BankEntity/BankEntity";
import { UpdateBankEntity } from "./components/organisms/BankEntity/UpdateBankEntity";
import { Product } from "./pages/ProductPages/Product";
import { ProductType } from "./pages/ProductPages/ProductType";
import CreateRequestService from "./pages/CreateRequestService";
import AccountCreateUser from "./pages/UserPages/Account/AccountCreateUser";
import AccountStatementBankUser from "./pages/UserPages/Account/AccountStatementUser";
import TransferUser from "./pages/UserPages/Transaction/TransferUser";
import Branch from "./pages/ClientPages/Branches/Branch";
import BranchUser from "./pages/UserPages/Branches/BranchUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HolidayUser from "./pages/UserPages/Holidays/HolidayUser";
import InterestRateLog from "./components/organisms/interestrate/InterestRateLog";
import ProductLinkAssociatedService from "./pages/ProductLinkAssociatedService";
import Home from "./pages/Home";
import CreateUser from "./components/organisms/Login/CreateUser";
import SearchCardClient from "./pages/UserPages/SearchCardClient/SearchCardClient";
import SearchClientDataForm from "./pages/UserPages/SearchClientData/SearchClientDataForm";
import UpdateClientDataForm from "./pages/UserPages/UpdateClientLikeBankUser/UpdateClientLikeBankUser";

import Layout from "./template/Layout";
import AccountCreateSignatureUser from "./pages/UserPages/Account/AccountCreateSignatureUser";
import AccountCancelUser from "./pages/UserPages/Account/AccountCancelUser";
import AccountAvailableBalance from "./pages/ATMPages/Account/AccountAvailableBalance";
import AccountCreateClient from "./pages/ClientPages/Account/AccountCreateClient";
import DepositAtm from "./pages/ATMPages/Transaction/DepositAtm";
import WithdrawAtm from "./pages/ATMPages/Transaction/WithdrawAtm";
import AccountConsolidatedPositionUser from "./pages/UserPages/Account/AccountConsolidatedPositionUser";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import DepositBank from "./pages/UserPages/Transaction/DepositBank";
import WithdrawBank from "./pages/UserPages/Transaction/WithdrawBank";
import InterestSavingAccounts from "./pages/ClientPages/Transaction/InterestSavingAccounts";
import { UpdateClient } from "./pages/ClientPages/Client/UpdateClient";
import TransactionBeetwenDates from "./pages/UserPages/Transaction/TransactionBeetwenDates";
import ATMHome from "./pages/ATMPages/ATMHome";
import ATMReturnHome from "./pages/ATMPages/ATMReturnHome";
import InterestInvestmentPolicies from "./pages/ClientPages/Transaction/InterestInvestmentPolicies";
import CreateClient from "./pages/ClientPages/Client/CreateClient";
import { ReportAccountAsocServ } from './components/organisms/asociatedServiceParam/ReportAccountAsocServ';
import { AsociatedServicesReport } from './components/organisms/asociatedServiceParam/AsociatedServicesReport';

interface userProps {
  username: string;
  password: string;
  identification: string;
  typeIdentification: string;
}

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<userProps | null>(null);

  const userRoutes = [
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
    }, {
      path: "cuenta/servicio-asociado",
      element: <AsociatedServicesReport />,
    },
    {
      path: "cuenta/solicitud-servicio",
      element: <ReportAccountAsocServ />,
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
      path: "login",
      element: (
        <Login
          setUser={setUser}
          setIsLogged={setIsLogged}
          redirect="/usuario"
        />
      ),
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
  ];

  const clientRoutes = [
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
        <Login
          setUser={setUser}
          setIsLogged={setIsLogged}
          redirect="/cliente"
        />
      ),
    },
  ];

  const atmRoutes = [
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

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route
            path="/usuario"
            element={
              <Layout
                isLogged={isLogged}
                setIsLogged={setIsLogged}
                user={{}}
                to="usuario"
              />
            }
          >
            <Route index element={<HomeUser user={user} isLogged={isLogged} />} />
            {userRoutes.map((route) => (
              <Route
                key={route.path}
                path={`/usuario/${route.path}`}
                element={route.element}
              />
            ))}
          </Route>
          <Route
            path="/cliente"
            element={
              <Layout
                isLogged={isLogged}
                setIsLogged={setIsLogged}
                user={{}}
                to="cliente"
              />
            }
          >
            <Route index element={<HomeClient user={user} isLogged={isLogged} />} />
            {clientRoutes.map((route) => (
              <Route
                key={route.path}
                path={`/cliente/${route.path}`}
                element={route.element}
              />
            ))}
          </Route>
          <Route path="/atm">
            <Route index element={<ATMHome />} />
            {atmRoutes.map((route) => (
              <Route
                key={route.path}
                path={`/atm/${route.path}`}
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
