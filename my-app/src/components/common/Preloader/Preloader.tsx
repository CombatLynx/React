import React, {FC} from "react";
// @ts-ignore
import preloaderPhoto from "../../../assets/images/preloader.gif";
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
