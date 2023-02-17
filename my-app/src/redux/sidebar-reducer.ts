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

const sidebarReducer = (state: InitialStateType = initialReducer, action: any): InitialStateType => {
    return state;
}

export default sidebarReducer;