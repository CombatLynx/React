import React from "react";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={classes.header}>
            <img
                src="https://img2.freepng.ru/20180402/hze/kisspng-service-mark-symbol-registered-trademark-symbol-service-5ac256c44ba545.3203033915226856363099.jpg"
                alt="logo"/>
            <div className={classes["login-block"]}>
                <div>{props.isAuth ? props.login + " " + props.userId : <NavLink to={'/login'}>Login</NavLink>}</div>
            </div>
        </header>
    );
}

export default Header;