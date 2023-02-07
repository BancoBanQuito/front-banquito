import { useEffect, useState } from "react";
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
import InterestInvestmentPolicies from "./pages/ClientPages/Transaction/InterestInvestmentPolicies";
import CreateClient from "./pages/ClientPages/Client/CreateClient";
import CreateSegment from "./pages/UserPages/Segment/CreateSegment";
import { UserProvider } from "./context/UserContext";
import { userRoutes } from "./routes/userRoutes";
import { clientRoutes } from "./routes/clientRoutes";
import { atmRoutes } from "./routes/atmRoutes";


const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Home />} />
            <Route
              path="/usuario"
              element={
                <Layout to="usuario" />
              }>
              <Route index element={<HomeUser />} />
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
                <Layout to="cliente" />
              }>
              <Route index element={<HomeClient />} />
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
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
