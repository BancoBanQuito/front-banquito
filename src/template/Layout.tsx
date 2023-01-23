import { Outlet } from "react-router-dom";
import Topnav from "../components/molecules/Topnav";

interface TopnavProps {
  isLogged: boolean;
  user: {};
}

const Layout = ({ isLogged, user }: TopnavProps) => {
  return (
    <>
      <Topnav isLogged={isLogged} user={user} />
      <Outlet />
    </>
  );
};

export default Layout;
