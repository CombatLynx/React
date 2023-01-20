import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthString, required} from "../../../../utils/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";

const maxLengthString10 = maxLengthString(10);

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name={"filedPostMessage"}
                       placeholder={"Enter text"}
                       validate={[required, maxLengthString10]}
                />
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