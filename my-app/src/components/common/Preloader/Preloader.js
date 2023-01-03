import React from "react";
import preloaderPhoto from "../../../assets/images/preloader.gif";
import classes from "./Preloader.module.css";

const Preloader = (props) => {
  return (
      <div className={classes.preloader}>
        <img className={classes["preloader-img"]} src={preloaderPhoto} alt="preloader" />
      </div>
  );
}
export default Preloader;
