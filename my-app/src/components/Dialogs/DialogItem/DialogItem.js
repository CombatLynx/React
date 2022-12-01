import React from "react";
import classes from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";

const setActive = ({ isActive }) => (isActive ? classes.active: '');

const DialogItem = (props) => {
  return (
      <div className={classes["dialogs-items__element"]}>
        <NavLink className={setActive} to={"/dialogs/" + props.id}>{props.name}</NavLink>
      </div>
  );
}

export default DialogItem;