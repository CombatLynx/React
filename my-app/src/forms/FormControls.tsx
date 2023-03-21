import {FC} from "react";
import {Field, WrappedFieldProps} from "redux-form";

export function createField(placeholder: string | undefined,
                            name: string,
                            validators: Array<string>,
                            component: FC<WrappedFieldProps>,
                            props = {}, text = "") {
    return (
        <div>
            <Field placeholder={placeholder}
                   name={name}
                   validate={validators}
                   component={component}
                   {...props}
            /> {text}
        </div>
    )
}