import React from "react";
import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const setActive = ({ isActive }) => (isActive ? classes.active: '');

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <ul className={classes["nav-menu"]}>
                <li className={classes["nav-menu__item"]}><NavLink className={setActive} to="/profile">Profile</NavLink></li>
                <li className={classes["nav-menu__item"]}><NavLink className={setActive} to="/dialogs">Messages</NavLink></li>
                <li className={classes["nav-menu__item"]}><NavLink className={setActive} to="/news">News</NavLink></li>
                <li className={classes["nav-menu__item"]}><NavLink className={setActive} to="/music">Music</NavLink></li>
                <li className={classes["nav-menu__item"]}><NavLink className={setActive} to="/settings">Settings</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;
