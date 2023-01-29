import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Location } from "./pages/UserPages/Locations/Location";
import theme from "./style/Theme";
import Error404 from "./pages/ErrorPages/Error404";
import { ThemeProvider } from "@mui/material";
import HomeATM from "./pages/ATMPages/HomeATM";
import HomeClient from "./pages/ClientPages/HomeClient";
import HomeUser from "./pages/UserPages/HomeUser";
import Login from "./pages/Login";
import CreateSignature from "./pages/AccountCreateSignature";
import EditAccountSignature from "./pages/EditAccountSignature";
import CancelAccount from "./pages/CancelAccount";
import Layout from "./template/Layout";
import AccountCreateUser from "./pages/UserPages/AccountCreate/AccountCreateUser";
import TransferUser from "./pages/UserPages/Transferences/TransferUser";
import TransferBank from "./pages/ClientPages/Transferences/TransferBank";
import AccountCreateBank from "./pages/ClientPages/AccountCreate/AccountCreateBank";
import Branch from "./pages/ClientPages/Branches/Branch";
import AccountStatementBank from "./pages/UserPages/AccountStatement/AccountStatementBank";
import AccountStatementClient from "./pages/UserPages/AccountStatement/AccountStatementClient";
import BranchUser from "./pages/UserPages/Branches/BranchUser";
import InterestRateLog from './components/organisms/interestrate/InterestRateLog';
import { AssociatedServiceParam } from "./components/organisms/AssocietesServicesParam/AssociatedServiceParam";
import { AssociatedServicesAccount } from "./components/organisms/AssocietesServicesParam/AssociatedServicesAccount";

const App = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});

  return (
  //<AssociatedServiceParam></AssociatedServiceParam>
    <AssociatedServicesAccount></AssociatedServicesAccount>
  );
};

const userRoutes = [
  {
    path: "",
    element: <HomeUser />,
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
    path: "account/signature",
    element: <CreateSignature />,
  },
  {
    path: "edit/account/signature",
    element: <EditAccountSignature />,
  },
  {
    path: "edit/account/cancel",
    element: <CancelAccount />,
  }
];

const clientRoutes = [
  {
    path: "",
    element: <HomeClient />,
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
]

const productRoutes = [
  {
    path: "interest-rate",
    element: <InterestRateLog />,
  },
  {
    path: "agregar/tipo-de-producto",
    element: <AccountCreateUser />,
  },
]

export default App;
