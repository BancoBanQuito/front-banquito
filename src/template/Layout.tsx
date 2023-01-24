import { Outlet } from "react-router-dom";
import Topnav from "../components/molecules/Topnav";

interface TopnavProps {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
  user: {};
}

const Layout = ({ isLogged, setIsLogged, user }: TopnavProps) => {
  return (
    <>
      <Topnav isLogged={isLogged} user={user} setIsLogged={setIsLogged} />
      <Outlet />
    </>
  );
};

export default Layout;
