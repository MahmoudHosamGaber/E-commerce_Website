import { NavLink } from "react-router-dom";

const NavItems = () => {
    return (
        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                    Home
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="products">
                    Products
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="categories">
                    Categories
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="contactus">
                    Contact Us
                </NavLink>
            </li>
        </ul>
    );
};

export default NavItems;
