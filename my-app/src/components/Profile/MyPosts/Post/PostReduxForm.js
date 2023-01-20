import React from "react";
import {Field, reduxForm} from "redux-form";

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"filedPostMessage"} placeholder={"Enter text"}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}

let PostReduxForm = reduxForm({
    form: 'postMessage'
})(PostForm);

export default PostReduxForm;