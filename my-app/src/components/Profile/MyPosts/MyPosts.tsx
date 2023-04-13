import React, {FC} from "react";
import Post from "./Post/Post";
import classes from "./MyPosts.module.css";
import PostReduxForm, {PostFormValuesType} from "./Post/PostReduxForm";
import {PostsType} from "../../../redux/profile-reducer";

type PropsType = {
    dataPost: Array<PostsType>,
    addPost: (newPostText: string) => void
}

const MyPosts: FC<PropsType> = React.memo(props => {

    const dataPost = props.dataPost.map(
        (dataElement) => {
            return <Post message={dataElement.message} countLikes={dataElement.countLikes}></Post>
        }
    )

    const addPostText = (values: PostFormValuesType) => {
        props.addPost(values.filedPostMessage);
    }

    return (
        <div className={classes.posts}>
            <div className={classes["posts-add"]}>My posts
                <div>
                    <PostReduxForm onSubmit={addPostText}/>
                </div>
            </div>
            {dataPost}
        </div>
    );
});

export default MyPosts;