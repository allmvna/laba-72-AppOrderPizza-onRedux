import React, {PropsWithChildren} from "react";
import Navbar from "../../components/Navbar/Navbar.tsx";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {

  return (
      <>
          <header>
              <Navbar/>
          </header>
          <main>
              {children}
          </main>
      </>
  );
};

export default Layout;
