import React from "react";
import classes from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";

const setActive = ({ isActive }) => (isActive ? classes.active: '');

const Dialogs = (props) => {
    return (
      <div className={classes.dialogs}>
          <div className={classes["dialogs-items"]}>
              <div className={classes["dialogs-items__element"]}>
                  <NavLink className={setActive} to="/dialogs/1">Misha1</NavLink>
              </div>
              <div className={classes["dialogs-items__element"]}>
                  <NavLink className={setActive} to="/dialogs/2">Misha2</NavLink>
              </div>
              <div className={classes["dialogs-items__element"]}>
                  <NavLink className={setActive} to="/dialogs/3">Misha3</NavLink>
              </div>
              <div className={classes["dialogs-items__element"]}>
                  <NavLink className={setActive} to="/dialogs/4">Misha4</NavLink>
              </div>
              <div className={classes["dialogs-items__element"]}>
                  <NavLink className={setActive} to="/dialogs/5">Misha5</NavLink>
              </div>
          </div>
          <div className={classes["dialogs-messages"]}>
              <NavLink to="/" className={classes["dialogs-messages__element"]}>6</NavLink>
              <NavLink to="/" className={classes["dialogs-messages__element"]}>7</NavLink>
              <NavLink to="/" className={classes["dialogs-messages__element"]}>8</NavLink>
              <NavLink to="/" className={classes["dialogs-messages__element"]}>9</NavLink>
          </div>
      </div>
    );
}

export default Dialogs;