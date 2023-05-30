import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import classes from "./Question.module.css";
import {actionCreators} from "../../../redux/games-reducer";

export const QuestionPage: FC = () => {
    const players = useSelector((state: AppStateType) => state.games.players)
    const [countPlayers, setCountPlayer] = useState(players)
    const dispatch = useDispatch()

    const handleIncreaseClick = (playerId: number) => {
        setCountPlayer(countPlayers.map(player => {
            if (player.id === playerId) {
                return {
                    ...player,
                    points: player.points + 1
                }
            } else {
                return player
            }
        }))
    }

    const handleReducesClick = () => {
        setCountPlayer(countPlayers.map(player => {
            return {
                ...player,
                points: player.points - 1
            }
        }))
    }

    useEffect(() => {
        dispatch(actionCreators.addPointsDispatchCreator(countPlayers))
    }, [countPlayers])

    return (
        <>
            <div className={classes.gameFieldPosition}>
                <div className={classes.gameField}>
                    <div className={classes.versus}>VS</div>
                    {
                        countPlayers.map(player => (
                            <div key={player.id} className={classes.card}>
                                <div className={classes.cardElement}>
                                    <div className={classes.players}>
                                        <div>{player.name}</div>
                                        <div>{player.surname}</div>
                                    </div>
                                    <div className={classes.countPoints}>{player.points}</div>
                                    <div className={classes.buttonPlus}>
                                        <button onClick={() => {
                                            handleIncreaseClick(player.id)
                                        }}>+
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={classes.buttonMinus}>
                    <button onClick={handleReducesClick}>—</button>
                </div>
            </div>
        </>
    )
}