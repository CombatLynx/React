import {InferActionsTypes} from "./redux-store";

enum typesActions {
    GET_POINTS = 'games/GET-POINTS'
}

export type PlayersType = {
    id: number,
    name: string,
    surname: string,
    points: number
}

let initialReducer = {
    players: [
        {
            id: 1,
            name: "Михаил",
            surname: "Нефедов",
            points: 0
        },
        {
            id: 2,
            name: "Арина",
            surname: "Вельмискина",
            points: 0
        }
    ] as Array<PlayersType>,
    // count: 0
}

export type InitialStateType = typeof initialReducer

type ActionsType = InferActionsTypes<typeof actionCreators>

const gamesReducer = (state: InitialStateType = initialReducer, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case typesActions.GET_POINTS:
            return <InitialStateType>{
                ...state,
                players: [...state.players],
                points: action.points
            }
        default:
            return state;
    }
}

export const actionCreators = {
    addPointsDispatchCreator: (points: number) => ({
        type: typesActions.GET_POINTS,
        points: points
    } as const)
}

export default gamesReducer;