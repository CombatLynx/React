import React from "react";
import {addPostDispatchCreator, updatePostTexDispatchCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../storeContext";

const MyPostsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            { (store) => {
                let state = store.getState();

                let addPost = () => {
                    store.dispatch(addPostDispatchCreator());
                }

                let onChangeTextPost = (textPost) => {
                    store.dispatch(updatePostTexDispatchCreator(textPost));
                }

                return <MyPosts addPost={addPost}
                         updatePostText={onChangeTextPost}
                         dataPost={state.profilePage.posts}
                         newTextPost={state.profilePage.newTextPost}>
                </MyPosts>
            }
        }
        </StoreContext.Consumer>
    );
}

export default MyPostsContainer;
