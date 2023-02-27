type InitialStateType = typeof initialReducer;

type FriendsType = {
    id: number,
    name: string
}

let initialReducer = {
    friends: [
        {
            id: 1,
            name: "Petya"
        },
        {
            id: 2,
            name: "Vasya"
        },
        {
            id: 3,
            name: "Kolya"
        }
    ] as Array<FriendsType>
}

type ActionCreatorsTypes = null

const sidebarReducer = (state: InitialStateType = initialReducer, action: ActionCreatorsTypes): InitialStateType => {
    return state;
}

export default sidebarReducer;