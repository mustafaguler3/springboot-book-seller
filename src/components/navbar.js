import React from "react";
import logo from "../logo.svg"
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () =>{

    const currentUser = useSelector(state => state.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearCurrentUser())
        navigate("/login")
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <NavLink to="/" className="navbar-brand ms-1">
                <img src={logo}></img>
            </NavLink>    

            <div className="navbar-nav me-auto">
                {currentUser?.role === Role.ADMIN && 
                <li className="nav-item">
                <NavLink to="/admin" className="nav-link">
                    Admin
                </NavLink>
            </li>}
                <li className="nav-item">
                    <NavLink to="/home" className="nav-link">
                        Home
                    </NavLink>
                </li>
            </div>

            {!currentUser && 
            <div className="navbar-nav ms-auto">
            <li className="nav-item">
                <NavLink to="/sign-up" className="nav-link">
                    Sign Up
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/sign-in" className="nav-link">
                    Sign In
                </NavLink>
            </li>
            </div>
                }

              {currentUser && 
                <div className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to="/profile" className="nav-link">
                            {currentUser.name}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" onClick={()=>logout()}>
                        Sign Out
                    </a>
                    </li>
                </div>
              
              }  
            

        </nav>
    )
}

export default Navbar;