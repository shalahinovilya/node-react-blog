import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {NavLink} from "react-router-dom";


const NavBar = () => {

    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <a href="#" className="brand-logo">Logo</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">create</NavLink></li>
                    <li><NavLink to="/posts">posts</NavLink></li>
                    <li><NavLink to="" onClick={logoutHandler}>logout</NavLink></li>
                </ul>
            </div>
        </nav>

    );
};

export default NavBar;