import { useState } from "react";
import { Location } from "./pages/UserPages/Locations/Location";
import theme from "./style/Theme";
import Error404 from "./pages/ErrorPages/Error404";
import { ThemeProvider } from "@mui/material";
import HomeClient from "./pages/ClientPages/HomeClient";
import HomeUser from "./pages/UserPages/HomeUser";
import Login from "./components/organisms/Login/Login";
import { BankEntity } from "./components/organisms/BankEntity/BankEntity";
import { UpdateBankEntity } from "./components/organisms/BankEntity/UpdateBankEntity";
import { Product } from "./pages/ProductPages/Product";
import { ProductType } from "./pages/ProductPages/ProductType";
import CreateRequestService from './pages/CreateRequestService';
import AccountCreateUser from "./pages/UserPages/Account/AccountCreateUser";
import AccountStatementBankUser from "./pages/UserPages/Account/AccountStatementUser";
import TransferUser from "./pages/UserPages/Transaction/TransferUser";
import { Home } from "@mui/icons-material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./components/organisms/Login/CreateUser";
import InterestRateLog from "./components/organisms/interestrate/InterestRateLog";
import Branch from "./pages/ClientPages/Branches/Branch";
import ProductLinkAssociatedService from "./pages/ProductLinkAssociatedService";
import BranchUser from "./pages/UserPages/Branches/BranchUser";
import HolidayUser from "./pages/UserPages/Holidays/HolidayUser";
import TransactionBeetwenDates from "./pages/UserPages/Transaction/TransactionBeetwenDates";
import Layout from "./template/Layout";
import AccountCreateSignatureUser from "./pages/UserPages/Account/AccountCreateSignatureUser";
import AccountEditSignatureUser from "./pages/UserPages/Account/AccountEditSignatureUser";
import AccountCancelUser from "./pages/UserPages/Account/AccountCancelUser";
import AccountAvailableBalance from "./pages/ATMPages/Account/AccountAvailableBalance";
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
      element: <AccountCreateUser />,
    },
    {
      path: "cuenta/estado",
      element: <AccountStatementBankUser />,
    },
    {
      path: "transaccion",
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
      path: "account/signature",
      element: <AccountCreateSignatureUser />,
    },
    {
      path: "edit/account/signature",
      element: <AccountEditSignatureUser />,
    },
    {
      path: "account/cancel",
      element: <AccountCancelUser />,
    },
    {
      path: "transaccion/dates",
      element: <TransactionBeetwenDates />,
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
      element: <CreateRequestService openDialog={true} />,
    },
    {
      path: "producto-vincular-servicio",
      element: <ProductLinkAssociatedService onSubmit={() => { }} />,
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
      element: <Branch />,
    },
    {
      path: "cuenta/estado",
      element: <AccountStatementBankUser client />,
    },
    {
      path: "transaccion",
      element: <TransferUser />,
    },
    {
      path: "signup",
      element: <CreateUser redirect="/cliente" />,
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
