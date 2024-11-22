import React, {PropsWithChildren} from "react";
import NavbarForAdmin from "../../components/NavbarForAdmin/NavbarForAdmin.tsx";
import {useLocation} from "react-router-dom";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {

    const location = useLocation();

    const showNavbar = location.pathname.includes("admin");

  return (
      <>
          <header>{showNavbar && <NavbarForAdmin/>}</header>
          <main>
                  {children}
          </main>
      </>
  );
};

export default Layout;
