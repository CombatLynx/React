import React from "react";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";
import TimerForStaying from "./TimerForStaying/TimerForStaying";

const Header = (props) => {
    return (
        <header className={classes.header}>
            <div className={classes["header-item"]}>
                <TimerForStaying/>
            </div>
            <div className={classes["header-item"]}>
                <img
                    src="https://img2.freepng.ru/20180402/hze/kisspng-service-mark-symbol-registered-trademark-symbol-service-5ac256c44ba545.3203033915226856363099.jpg"
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