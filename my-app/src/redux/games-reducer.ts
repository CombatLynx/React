import {InferActionsTypes} from "./redux-store";

enum typesActions {
    SET_POINTS = 'games/SET-POINTS'
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
    ] as Array<PlayersType>
}

export type InitialStateType = typeof initialReducer

type ActionsType = InferActionsTypes<typeof actionCreators>

const gamesReducer = (state: InitialStateType = initialReducer, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case typesActions.SET_POINTS:
            return {
                ...state,
                players: [...action.payload]
            };
        default:
            return state;
    }
}

export const actionCreators = {
    addPointsDispatchCreator: (payload: Array<PlayersType>) => ({
        type: typesActions.SET_POINTS,
        payload
    } as const)
}

export default gamesReducer;