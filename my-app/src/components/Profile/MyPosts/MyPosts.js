import React from "react";
import Post from "./Post";
import classes from "./MyPosts.module.css";

class MyPosts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textPost: this.props.textPost
        }
    }

    onAddPost = () => {
        this.props.updatePostText(this.state.textPost);
        this.props.addPost(this.state.textPost);
    }

    onChangeTextPost = (e) => {
        this.setState({
            textPost: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.textPost !== this.props.textPost) {
            this.setState({
                textPost: this.props.textPost
            })
        }
    }

    render() {
        return (
            <div className={classes.posts}>
                <div className={classes["posts-add"]}>My posts
                    <div className={classes["posts-textarea"]}>
                    <textarea onChange={this.onChangeTextPost}
                              value={this.state.newTextPost}>
                    </textarea>
                    </div>
                    <div>
                        <button onClick={this.onAddPost}>Add post</button>
                    </div>
                </div>
                {
                    this.props.dataPost.map(
                        (dataElement) => {
                            return <Post message={dataElement.message} countLikes={dataElement.countLikes}></Post>
                        }
                    )
                }
            </div>
        );
    }
}

export default MyPosts;
