import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Location } from "./pages/UserPages/Locations/Location";
import theme from "./style/Theme";
import Error404 from "./pages/ErrorPages/Error404";
import { ThemeProvider } from "@mui/material";
import HomeClient from "./pages/ClientPages/HomeClient";
import HomeUser from "./pages/UserPages/HomeUser";
import Login from "./components/organisms/Login/Login";
import CreateSignature from "./pages/AccountCreateSignature";
import EditAccountSignature from "./pages/EditAccountSignature";
import CancelAccount from "./pages/CancelAccount";
import Layout from "./template/Layout";
import AccountCreateUser from "./pages/UserPages/AccountCreate/AccountCreateUser";
import TransferUser from "./pages/UserPages/Transferences/TransferUser";
import TransferBank from "./pages/ClientPages/Transferences/TransferBank";
import AccountCreateBank from "./pages/ClientPages/Account/AccountCreateBank";
import Branch from "./pages/ClientPages/Branches/Branch";
import AccountStatementBank from "./pages/UserPages/AccountStatement/AccountStatementBank";
import AccountStatementClient from "./pages/UserPages/AccountStatement/AccountStatementClient";
import BranchUser from "./pages/UserPages/Branches/BranchUser";
import HolidayUser from "./pages/UserPages/Holidays/HolidayUser";
import TransactionBeetwenDates from "./pages/UserPages/Transferences/TransactionBeetwenDates";
import InterestRateLog from './components/organisms/interestrate/InterestRateLog';
import Home from "./pages/Home";
import CreateUser from "./components/organisms/Login/CreateUser";

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
      path: "signup",
      element: <CreateUser redirect="/usuario" />,
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
      path: "signup",
      element: <CreateUser redirect="/cliente" />,
    }
  ]

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout isLogged={isLogged} setIsLogged={setIsLogged} user={{}} />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} setIsLogged={setIsLogged} />} />
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
