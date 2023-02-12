import { Outlet } from "react-router-dom";
import Topnav from "../components/molecules/Topnav";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { isLogged } from "../utils/LoginUtils";
import { SessionVariable, getSession } from "../utils/SessionUtils";

interface TopnavProps {
  to: string;
}

const Layout = (props: TopnavProps) => {

  const user = useUser();

  useEffect(() => {
    if (isLogged()) {
      user.identification = getSession(SessionVariable.IDENTIFICATION) != null ? getSession(SessionVariable.IDENTIFICATION) as string | undefined : undefined;
      user.identificationType = getSession(SessionVariable.IDENTIFICATION_TYPE) != null ? getSession(SessionVariable.IDENTIFICATION_TYPE) as string | undefined : undefined;
      user.username = !!getSession(SessionVariable.USERNAME) != null ? getSession(SessionVariable.USERNAME) as string | undefined : undefined;
      user.isLogged = true;
    }
    return () => { }
  }, []);


  return (
    <>
      <div
        style={{
          overflowX: 'hidden',
          overflowY: 'auto'
        }}>
        <Topnav to={props.to} />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
