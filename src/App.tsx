import { useState } from "react";
import { Location } from "./pages/UserPages/Locations/Location";
import theme from "./style/Theme";
import Error404 from "./pages/ErrorPages/Error404";
import HomeClient from "./pages/ClientPages/HomeClient";
import HomeUser from "./pages/UserPages/HomeUser";
import Login from "./components/organisms/Login/Login";
import CreateSignature from "./pages/ClientPages/Account/AccountCreateSignature";
import EditAccountSignature from "./pages/ClientPages/Account/AccountEditSignature";
import CancelAccount from "./pages/ClientPages/Account/AccountCancel";
import Layout from "./template/Layout";
import AccountCreateUser from "./pages/UserPages/Account/AccountCreateUser";
import TransferUser from "./pages/ClientPages/Transaction/TransferClient";
import TransferBank from "./pages/UserPages/Transaction/TransferBank";
import AccountCreateBank from "./pages/ClientPages/Account/AccountCreateBank";
import Branch from "./pages/ClientPages/Branches/Branch";
import AccountStatementBank from "./pages/ClientPages/Account/AccountStatementBank";
import AccountStatementClient from "./pages/UserPages/Account/AccountStatementClient";
import BranchUser from "./pages/UserPages/Branches/BranchUser";
import HolidayUser from "./pages/UserPages/Holidays/HolidayUser";
import TransactionBeetwenDates from "./pages/UserPages/Transaction/TransactionBeetwenDates";
import InterestRateLog from './components/organisms/interestrate/InterestRateLog';
import ProductLinkAssociatedService from "./pages/ProductLinkAssociatedService";
import Home from "./pages/Home";
import CreateUser from "./components/organisms/Login/CreateUser";

interface userProps {
  username: string,
  password: string
}
import { BankEntity } from "./components/organisms/BankEntity/BankEntity";
import { UpdateBankEntity } from './components/organisms/BankEntity/UpdateBankEntity';
import { Product } from "./pages/ProductPages/Product";
import { ProductType } from "./pages/ProductPages/ProductType";
import CreateRequestService from './pages/CreateRequestService';
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DepositBank from "./pages/UserPages/Transaction/DepositBank";

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
      element: <AccountStatementBank />,
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
      element: <CreateSignature />,
    },
    {
      path: "edit/account/signature",
      element: <EditAccountSignature />,
    },
    {
      path: "account/cancel",
      element: <CancelAccount />,
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
      element: <AccountStatementClient />,
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
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
