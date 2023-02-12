import theme from "./style/Theme";
import Error404 from "./pages/ErrorPages/Error404";
import HomeClient from "./pages/ClientPages/HomeClient";
import HomeUser from "./pages/UserPages/HomeUser/HomeUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./template/Layout";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import ATMHome from "./pages/ATMPages/ATMHome";
import { UserProvider } from "./context/UserContext";
import { userRoutes } from "./routes/userRoutes";
import { clientRoutes } from "./routes/clientRoutes";
import { atmRoutes } from "./routes/atmRoutes";
import AppClient from "./pages/AppClient";
import SelectAccountClientType from "./pages/ClientPages/SelectAccountClientType";
import Organisms from "./Organisms";
import Molecules from "./Molecules";
import AppUser from "./pages/AppUser";


const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/molecules" element={<Molecules />} />
            <Route path="/organisms" element={<Organisms />} />
            <Route path="/banca" element={<AppUser />}>
              {userRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={`/banca/${route.path}`}
                  element={route.element}
                />
              ))}
            </Route>
            <Route path="/cliente" element={<AppClient />}>
              <Route index element={<SelectAccountClientType />} />
              {clientRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={`/cliente/${route.path}`}
                  element={route.element}
                />
              ))}
            </Route>
            {/* <Route path="/cliente" element={<Layout to="cliente" />}>
              <Route index element={<HomeClient />} />
              {clientRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={`/cliente/${route.path}`}
                  element={route.element}
                />
              ))}
            </Route> */}
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
