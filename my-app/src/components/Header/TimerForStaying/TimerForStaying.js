import React, {useEffect, useState} from "react";
import classes from "../TimerForStaying/TimerForStaying.module.css";

const TimerForStaying = () => {

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(() => {
        if (seconds < 60) {
            const timer = setInterval(() => {
                setSeconds(seconds + 1);
            }, 1000);
            return () => {
                clearInterval(timer);
            }
        } else {
            if (minutes < 60) {
                setMinutes(minutes + 1);
            } else {
                setMinutes(0);
                setHours(hours + 1);
            }
            setSeconds(0);
        }
    }, [seconds, minutes, hours]);

    return (
        <div className={classes.timer}>
            <div>Время прибывания на сайте</div>
            <div>
                {seconds < 10
                    ? `0${seconds}`
                    : `${seconds}`
                }<span>:sec</span>
                {minutes}<span>:min</span>
                {hours}<span>:hours</span>
            </div>
        </div>
    );
}

export default TimerForStaying;