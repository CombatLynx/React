import {FC, useEffect, useState} from "react";
import classes from "./Question.module.css"
import {useDispatch} from "react-redux";
import {actionCreators} from "../../../redux/games-reducer";

type PropsType = {
    name: string,
    surname: string,
    points: number
}

export const QuestionCard: FC<PropsType> = (props) => {
    let [count, setCount] = useState<number>(0)
    console.log('count', count)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.addPointsDispatchCreator(count))
    }, [count])

    const addPoint = () => {
        setCount((actual) => actual + 1)
    }

    return (
        <div className={classes.card}>
            <div className={classes.cardElement}>
                <div className={classes.players}>
                    <div>{props.name}</div>
                    <div>{props.surname}</div>
                </div>
                <div className={classes.countPoints}>{count}</div>
                <div className={classes.buttonPlus}>
                    <button onClick={addPoint}>+</button>
                </div>
            </div>
        </div>
    )
}