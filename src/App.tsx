import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "./pages/Error404";
import HomeATM from "./pages/HomeATM";
import HomeClient from "./pages/HomeClient";
import HomeUser from "./pages/UserPages/HomeUser";
import Login from "./pages/Login";
import Layout from "./templates/Layout";
import { Location } from "./pages/UserPages/Locations/Location";
import AccountCreateUser from "./pages/AccountCreateUser";
import CreateSignature from "./pages/AccountCreateSignature";
import EditAccountSignature from "./pages/EditAccountSignature";
import CancelAccount from "./pages/CancelAccount";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Login />} />
          {userRoutes.map((route) => (
            <Route
              key={route.path}
              path={`usuario/${route.path}`}
              element={route.element}
            />
          ))}
          <Route path="cliente" element={<HomeClient />} />
          <Route path="cajero" element={<HomeATM />} />
          <Route path="client/account/signature" element={<CreateSignature />} />
          <Route path="client/edit/account/signature" element={<EditAccountSignature />} />
          <Route path="client/edit/account/cancel" element={<CancelAccount />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
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
    element: <AccountCreateUser />,
  },
];

export default App;
