import NavbarForAdmin from "./NavbarForAdmin.tsx";
import NavbarForUser from "./NavbarForUser.tsx";
import {useLocation} from "react-router-dom";


const Navbar = () => {
    const location = useLocation();

    if (location.pathname === "/") {
        return <NavbarForUser />;
    }
    if (location.pathname.startsWith("/admin")) {
        return <NavbarForAdmin />;
    }
    return null;
};

export default Navbar;