import React, {FC} from "react";
import preloaderPhoto from "../../../assets/images/preloader.gif";
import preloaderArinaPhoto from "../../../assets/images/arina_preloader.gif";
import classes from "./Preloader.module.css";

type PropsType = {}

const Preloader: FC<PropsType> = (props) => {
  return (
      <div className={classes.preloader}>
        <img className={classes["preloader-img"]} src={preloaderPhoto} alt="preloader" />
      </div>
  );
}
export default Preloader;

export const PreloaderArina: FC<PropsType> = (props) => {
  return (
      <div className={classes.preloaderArina}>
        <img src={preloaderArinaPhoto} alt="preloader" />
      </div>
  );
}
