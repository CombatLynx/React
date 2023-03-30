import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthString, required} from "../../../../utils/validators";
import {createField, GetStringKeys, Textarea} from "../../../common/FormsControls/FormsControls";

const maxLengthString10 = maxLengthString(10);

export type PostFormValuesType = {
    filedPostMessage: string
}

type PostFormValuesKeysType = GetStringKeys<PostFormValuesType>

type PostFormOwnProps = {}

const PostForm: FC<InjectedFormProps<PostFormValuesType, PostFormOwnProps> & PostFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<PostFormValuesKeysType>("Enter text", "filedPostMessage", [required, maxLengthString10], Textarea)}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}

const PostReduxForm = reduxForm<PostFormValuesType, PostFormOwnProps>({
    form: 'postMessage'
})(PostForm);

export default PostReduxForm;