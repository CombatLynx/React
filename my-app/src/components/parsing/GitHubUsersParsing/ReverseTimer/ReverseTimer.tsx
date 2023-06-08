import {FC, useEffect, useState} from "react";
import {initialStartSeconds} from "../UserDetails/UserDetails";

type ReverseTimerProps = {
    seconds: number,
    onChangeSeconds: (seconds: number) => void,
    timerKey: number
}

export const ReverseTimer: FC<ReverseTimerProps> = (props) => {
    const [seconds, setSeconds] = useState(initialStartSeconds)

    useEffect(() => {
        setSeconds(props.seconds)
    }, [props.seconds])

    useEffect(() => {
        props.onChangeSeconds(seconds)
    }, [seconds])

    useEffect(() => {
        const myInterval = setInterval(() => {
            console.log('tick')
            if (seconds > 0) {
                setSeconds((actualSeconds) => actualSeconds - 1)
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    }, [props.timerKey])

    return (
        <div>
            {seconds === 0
                ? `Время вышло`
                : seconds
            }
        </div>
    )
}