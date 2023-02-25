import React from "react";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";
import TimerForStaying from "./TimerForStaying/TimerForStaying";
import logoHeader from "../../assets/images/emblem_195x195.png"

const Header = (props) => {
    return (
        <header className={classes.header}>
            <div className={classes["header-item"]}>
                <TimerForStaying/>
            </div>
            <div className={`${classes["header-item"]} ${classes["header__logo-position"]}`}>
                <img className={classes.logo}
                    src={logoHeader}
                    alt="logo"/>
            </div>
            <div className={classes["login-block"] + classes["header-item"]}>
                <div>{props.isAuth
                    ? <div>{props.login + " " + props.userId}
                        <div>
                            <button onClick={props.logOut}>Logout</button>
                        </div>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
                </div>
            </div>
        </header>
    );
}

export default Header;