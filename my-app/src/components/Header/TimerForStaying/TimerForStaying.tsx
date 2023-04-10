import React, {useEffect, useState} from "react";

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
        <div>
            <div>Время прибывания на сайте</div>
            <div>
                {seconds < 10
                    ? `0${seconds}`
                    : `${seconds}`
                }<span>:sec</span>
                {minutes < 10
                    ? `0${minutes}`
                    : `${minutes}`
                }<span>:min</span>
                {hours < 10
                    ? `0${hours}`
                    : `${hours}`
                }<span>:hours</span>
            </div>
        </div>
    );
}

export default TimerForStaying;