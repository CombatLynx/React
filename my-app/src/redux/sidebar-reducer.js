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
    ]
}

const sidebarReducer = (state = initialReducer, action) => {
    return state;
}

export default sidebarReducer;