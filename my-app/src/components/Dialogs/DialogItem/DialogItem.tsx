import React, {FC} from "react";
import classes from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";

type PropsType = {
    id: number,
    name: string | null
}

const setActive = ({ isActive }: {isActive: boolean}) => (isActive ? classes.active: '');

const DialogItem: FC<PropsType> = (props) => {
  return (
      <div className={classes["dialogs-items__element"]}>
        <NavLink className={setActive} to={"/dialogs/" + props.id}>{props.name}</NavLink>
      </div>
  );
}

export default DialogItem;