import React from "react";
import classes from "./NavbarFriends.module.css";

const NavbarFriends = (props) => {
    return (
        <div className={classes["navbar-friends"]}>{props.name}</div>
    );
}

export default NavbarFriends;
