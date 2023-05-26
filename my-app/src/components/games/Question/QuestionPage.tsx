import {FC, useState} from "react";
import {QuestionCard} from "./QuestionCard";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import classes from "./Question.module.css"

export const QuestionPage: FC = () => {
    const players = useSelector((state: AppStateType) => state.games.players)
    console.log(players)

    let points: number[] = []

    players.map((player) => {
        points.push(player.points)
    })
    console.log(points)

    let [state, setState] = useState(points)
    console.log(state)

    const reducePoints = () => {
        setState(state.map((point) => {
            return point - 1
        }))
    }

    return (
        <>
            <div className={classes.gameField}>
                <div className={classes.versus}>VS</div>
                {
                    players.map((player) => {
                        return <QuestionCard key={player.id}
                                             name={player.name}
                                             surname={player.surname}
                                             points={player.points}
                        />
                    })
                }
            </div>
            <div className={classes.buttonMinus}>
                <button onClick={reducePoints}>—</button>
            </div>
        </>
    )
}