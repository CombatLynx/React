import React from "react";
import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import NavbarFriends from "./NavbarFriends";

const setActive = ({isActive}) => (isActive ? classes.active : '');

const Navbar = (props) => {

    // let dataSidebar = props.dataNavbar.friends.map(
    //     (elemSidebar) => {
    //         return <NavbarFriends key={elemSidebar.id} name={elemSidebar.name} id={elemSidebar.id}/>
    //     }
    // );

    return (
        <nav className={classes.nav}>
            <ul className={classes["nav-menu"]}>
                <li className={classes["nav-menu__item"]}><NavLink className={setActive}
                                                                   to="/profile">Profile</NavLink>
                </li>
                <li className={classes["nav-menu__item"]}><NavLink className={setActive}
                                                                   to="/dialogs">Messages</NavLink>
                </li>
                <li className={classes["nav-menu__item"]}><NavLink className={setActive}
                                                                   to="/news">News</NavLink>
                </li>
                <li className={classes["nav-menu__item"]}><NavLink className={setActive}
                                                                   to="/users">Users</NavLink>
                </li>
                <li className={classes["nav-menu__item"]}><NavLink className={setActive}
                                                                   to="/music">Music</NavLink>
                </li>
                <li className={classes["nav-menu__item"]}><NavLink className={setActive}
                                                                   to="/settings">Settings</NavLink>
                </li>
            </ul>
            {/*<div className={classes["nav-menu__sidebar"]}>Friends*/}
            {/*    <div className={classes["nav-menu__sidebar__friends"]}>{dataSidebar}</div>*/}
            {/*</div>*/}
        </nav>
    );
}

export default Navbar;
