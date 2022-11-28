import React from "react";
import classes from "./Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <ul className={classes["nav-menu"]}>
                <li className={classes["nav-menu__item"]}><a href="#">Profile</a></li>
                <li className={classes["nav-menu__item"]}><a href="#">Messages</a></li>
                <li className={classes["nav-menu__item"]}><a href="#">News</a></li>
                <li className={classes["nav-menu__item"]}><a href="#">Music</a></li>
                <li className={classes["nav-menu__item"]}><a href="#">Settings</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
