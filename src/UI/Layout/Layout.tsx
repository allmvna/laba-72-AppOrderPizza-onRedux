import React, {PropsWithChildren} from "react";
import Navbar from "../../components/Navbar/Navbar.tsx";
import {Container} from "@mui/material";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {

  return (
      <>
          <header>
              <Navbar/>
          </header>
          <main>
              <Container>
                  {children}
              </Container>
          </main>
      </>
  );
};

export default Layout;
