import { Outlet } from "react-router-dom";
import Topnav from "../components/molecules/Topnav";

interface TopnavProps {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
  user: {};
  to: string;
}

const Layout = ({ isLogged, setIsLogged, user, to }: TopnavProps) => {
  return (
    <>
      <Topnav isLogged={isLogged} user={user} setIsLogged={setIsLogged} to={to} />
      <Outlet />
    </>
  );
};

export default Layout;
