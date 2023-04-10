import React, {FC} from "react";
import classes from "./NavbarFriends.module.css";

type PropsType = {
    name: string
}

const NavbarFriends: FC<PropsType> = (props) => {
    return (
        <div className={classes["navbar-friends"]}>{props.name}</div>
    );
}

export default NavbarFriends;
