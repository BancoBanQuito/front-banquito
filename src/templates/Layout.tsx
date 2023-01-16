import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div>topnav</div>
      <Outlet />
    </>
  );
};

export default Layout;
