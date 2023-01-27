import React, { useState } from 'react';
import { Login, Home } from '@mui/icons-material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { BankEntity } from './components/organisms/BankEntity/BankEntity';
import { UpdateBankEntity } from './components/organisms/BankEntity/UpdateBankEntity';
import CreateUser from './components/organisms/Login/CreateUser';
import InterestRateLog from './components/organisms/interestrate/InterestRateLog';
import AccountAvailableBalance from './pages/ATMPages/Account/AccountAvailableBalance';
import AccountConsolidatedPosition from './pages/ClientPages/Account/AccountConsolidatedPosition';
import AccountCreateBank from './pages/ClientPages/Account/AccountCreateBank';
import PaymentCheckbook from './pages/ClientPages/Account/CheckbookPayment';
import PaymentDebitCard from './pages/ClientPages/Account/DebitCardPayment';
import Branch from './pages/ClientPages/Branches/Branch';
import HomeClient from './pages/ClientPages/HomeClient';
import InterestInvestmentPolicies from './pages/ClientPages/Transferences/InterestInvestmentPolicies';
import InterestSavingAccounts from './pages/ClientPages/Transferences/InterestSavingAccounts';
import TransferBank from './pages/ClientPages/Transferences/TransferBank';
import CreateRequestService from './pages/CreateRequestService';
import Error404 from './pages/ErrorPages/Error404';
import ProductLinkAssociatedService from './pages/ProductLinkAssociatedService';
import { Product } from './pages/ProductPages/Product';
import { ProductType } from './pages/ProductPages/ProductType';
import AccountCreateUser from './pages/UserPages/Account/AccountCreateUser';
import BranchUser from './pages/UserPages/Branches/BranchUser';
import HolidayUser from './pages/UserPages/Holidays/HolidayUser';
import HomeUser from './pages/UserPages/HomeUser';
import TransactionBeetwenDates from './pages/UserPages/Transferences/TransactionBeetwenDates';
import TransferUser from './pages/UserPages/Transferences/TransferUser';
import theme from './style/Theme';
import Layout from './template/Layout';
import AccountCreateSignature from './pages/ClientPages/Account/AccountCreateSignature';
import AccountEditSignature from './pages/ClientPages/Account/AccountEditSignature';
import AccountCancel from './pages/ClientPages/Account/AccountCancel';

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
      element: <AccountStatementBank client />,
    },
    {
      path: "transaccion",
      element: <TransferUser />,
    },
    {
      path: "interes/polizas-inversion",
      element: <InterestInvestmentPolicies />,
    }, {
      path: "interes/cuenta-ahorro",
      element: <InterestSavingAccounts />,
    },
    {
      path: "pagos/tarjeta-debito",
      element: <PaymentDebitCard />,
    },
    {
      path: "pagos/cheque",
      element: <PaymentCheckbook />,
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
