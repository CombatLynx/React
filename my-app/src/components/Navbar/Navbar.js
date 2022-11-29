import React from "react";
import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <ul className={classes["nav-menu"]}>
                <li className={classes["nav-menu__item"]}><NavLink className={({ isActive }) => (isActive ? classes.active: '')} to="/profile">Profile</NavLink></li>
                <li className={classes["nav-menu__item"]}><NavLink className={({ isActive }) => (isActive ? classes.active: '')} to="/dialogs">Messages</NavLink></li>
                <li className={classes["nav-menu__item"]}><NavLink className={({ isActive }) => (isActive ? classes.active: '')} to="/news">News</NavLink></li>
                <li className={classes["nav-menu__item"]}><NavLink className={({ isActive }) => (isActive ? classes.active: '')} to="/music">Music</NavLink></li>
                <li className={classes["nav-menu__item"]}><NavLink className={({ isActive }) => (isActive ? classes.active: '')} to="/settings">Settings</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;
