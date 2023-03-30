import profileReducer, {actionCreators} from "./profile-reducer";
import {ProfileType} from "../types/types";

let state = {
    posts: [
        {
            id: 1,
            message: "Hi, how are you?",
            countLikes: 12
        },
        {
            id: 2,
            message: "It is my post",
            countLikes: 7
        }
    ],
    profile: null as ProfileType | null,
    status: null,
    newTextPost: null
}

it('count posts', () => {
    let action = actionCreators.addPostDispatchCreator('Hello');
    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe('Hello');
});

it('delete post', () => {
    let action = actionCreators.deletePostActionCreator(2);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1);
});