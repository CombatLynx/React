const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

let initialReducer = {
    users: [
        {
            id: 1,
            photoUrl: "https://cdn-icons-png.flaticon.com/512/35/35527.png",
            followed: true,
            fullName: "Misha Nefedov",
            status: 'I am a boss',
            location: {
                country: "Russia",
                city: "Ruzaevka"
            }
        },
        {
            id: 2,
            photoUrl: "https://flomaster.club/uploads/posts/2021-11/1635852262_1-flomaster-club-p-udivlennoe-litso-narisovannoe-krasivii-ris-1.jpg",
            followed: false,
            fullName: "Dima Kilunov",
            status: 'I am a not boss',
            location: {
                country: "Russia",
                city: "Saransk"
            }
        }
    ]
}

const usersReducer = (state = initialReducer, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        default:
            return state;
    }
}

export const followActionCreator = (userId) => {
    return {
        type: FOLLOW,
        userId
    }
}

export const unfollowActionCreator = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    }
}

export const setUsersActionCreator = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export default usersReducer;