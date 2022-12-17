import React from "react";
import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import NavbarFriends from "./NavbarFriends";
import StoreContext from "../../storeContext"

const setActive = ({isActive}) => (isActive ? classes.active : '');

const Navbar = (props) => {

    return (
        <StoreContext.Consumer>
            { (store) => {
                let dataSidebar = store.getState().sidebar.friends.map(
                    (elemSidebar) => {
                        return <NavbarFriends name={elemSidebar.name} id={elemSidebar.id}/>
                    }
                );

                return <nav className={classes.nav}>
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
                                                                           to="/music">Music</NavLink>
                        </li>
                        <li className={classes["nav-menu__item"]}><NavLink className={setActive}
                                                                           to="/settings">Settings</NavLink>
                        </li>
                    </ul>
                    <div className={classes["nav-menu__sidebar"]}>Friends
                        <div className={classes["nav-menu__sidebar__friends"]}>{dataSidebar}</div>
                    </div>
                </nav>
                }
            }
        </StoreContext.Consumer>
    );
}

export default Navbar;
