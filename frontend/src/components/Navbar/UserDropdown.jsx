import { FaUser, FaQuestionCircle } from "react-icons/fa";
import { BiLock, BiLogOut } from "react-icons/bi";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { AiOutlineUser } from "react-icons/ai";
import "./navbar.css";

const UserDropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };
    return (
        <div className="dropdown">
            <div className="dropbtn">
                <FaUser />{" "}
            </div>
            <div className="dropdown-content">
                <NavLink to="/profile">
                    <AiOutlineUser /> My Account
                </NavLink>
                <NavLink to="/profile/security">
                    <BiLock /> Security
                </NavLink>
                <NavLink to="/profile/paymentmethods">Payment Methods</NavLink>
                <NavLink to="/orders">
                    <MdOutlineDeliveryDining /> Orders
                </NavLink>
                <NavLink to="/faqs">
                    <FaQuestionCircle /> FAQS
                </NavLink>
                <NavLink onClick={onLogout} to="/">
                    <BiLogOut />
                    Logout
                </NavLink>
            </div>
        </div>
    );
};

export default UserDropdown;
