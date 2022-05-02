import React, {useContext} from 'react';
// import {Helmet} from 'react-helmet'
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
                {/*<NavLink to="#"*/}
                {/*         className='dropdown-trigger btn right'*/}
                {/*         onClick={dropDown}*/}
                {/*         data-target='dropdown1'>Drop Me!*/}
                {/*</NavLink>*/}

                {/*<ul id='dropdown1' className='dropdown-content'>*/}
                {/*    <li><NavLink to="">one</NavLink></li>*/}
                {/*    <li><NavLink to="">one</NavLink></li>*/}
                {/*</ul>*/}

            </div>
        </nav>

    );
};

export default NavBar;