import React from "react";
import profileReducer, {addPostDispatchCreator, deletePostActionCreator} from "./profile-reducer";

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
    ]
}

it('count posts', () => {
    let action = addPostDispatchCreator('Hello');
    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe('Hello');
});

it('delete post', () => {
    let action = deletePostActionCreator(2);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1);
});