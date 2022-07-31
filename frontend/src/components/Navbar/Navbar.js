import React from 'react';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {FaUser} from 'react-icons/fa';
import {useDispatch} from 'react-redux'
import {logout, reset} from '../../features/auth/authSlice'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import {useSelector} from 'react-redux'
import {BiLogOut}from 'react-icons/bi';
import {AiOutlineUser} from 'react-icons/ai';
import {MdOutlineDeliveryDining} from 'react-icons/md';
import {FaQuestionCircle} from 'react-icons/fa';
import {BiLock} from 'react-icons/bi';
import './navbar.css';
const Navbar = ({searchUpdate}) => {

   const {user} = useSelector((state) => state.auth)
   const navigate = useNavigate()
   const dispatch = useDispatch()
 
  const onLogout = () => {
     dispatch(logout())
     dispatch(reset())
     navigate('/')
    };
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>Orderat</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="categories">Categories</NavLink>
                        </li>
                    </ul>
                <div className="d-flex icons">
                    <SearchBar searchUpdate={searchUpdate} />
                    <Link to="/cart">
                        <AiOutlineShoppingCart />
                    </Link>
                    <Link to={user? "/profile" : "/login"}  >
                        { user?
                              <div className="dropdown">
                              <div className="dropbtn"><FaUser /> </div>
                              <div className="dropdown-content">
                              <NavLink to="/profile">
                               <AiOutlineUser/> My Account</NavLink> 
                              <NavLink to="/profile/security">
                               <BiLock/> Security</NavLink>  
                                <NavLink to="/profile/paymentmethods">
                                Payment Methods</NavLink>
                                <NavLink to="/orders">
                                <MdOutlineDeliveryDining/> Orders</NavLink> 
                                <NavLink to="/faqs">
                               <FaQuestionCircle/> FAQS</NavLink>  
                                <NavLink onClick={onLogout} to="/">
                                <BiLogOut />
                                Logout
                                </NavLink>
                              </div>
                              </div>
                           : <FaUser /> 
                        }
                    </Link>
                </div>
                </div>
            </div>
        </nav></>
    )
}

export default Navbar