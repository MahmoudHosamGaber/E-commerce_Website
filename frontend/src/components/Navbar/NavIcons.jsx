import SearchBar from "../SearchBar/SearchBar";
import UserDropdown from "./UserDropdown";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { useSelector } from "react-redux";

const NavIcons = ({ searchUpdate }) => {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className="d-flex icons">
            <SearchBar searchUpdate={searchUpdate} />
            <Link to="/cart">
                <AiOutlineShoppingCart />
            </Link>
            {user ? (
                <Link to={"/profile"}>
                    <div className="dropdown">
                        <FaUser />
                        <UserDropdown />
                    </div>
                </Link>
            ) : (
                <Link to="/login">
                    <FiLogIn />
                </Link>
            )}
        </div>
    );
};

export default NavIcons;
