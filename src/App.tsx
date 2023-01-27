import { ThemeProvider } from "@mui/material";
import { useState } from "react";
import SearchCardClient from "./pages/UserPages/SearchCardClient/SearchCardClient";
import SearchClientDataForm from "./pages/UserPages/SearchClientData/SearchClientDataForm";
import theme from "./style/Theme";

interface userProps {
  username: string;
  password: string;
}

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<userProps | null>(null);
  /*
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
      path: "signup",
      element: <CreateUser redirect="/cliente" />,
    },
    {
      path: "login",
      element: <Login setUser={setUser} setIsLogged={setIsLogged} redirect='/cliente' />
    }
  ]
*/
  return (
    <ThemeProvider theme={theme}>
      {/* <BrowserRouter>
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
      <SearchClient />*/}
      <SearchCardClient />
    </ThemeProvider>
  );
};

export default App;
