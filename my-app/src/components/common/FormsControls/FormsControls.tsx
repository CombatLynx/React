import React, {FC} from "react";
import {Field, WrappedFieldProps} from "redux-form";
import classes from "./FormsControls.module.css";
import {FieldValidatorType} from "../../../utils/validators";

type FormControlPropsType = {
    children: React.ReactNode
}

const FormControl: FC<WrappedFieldProps & FormControlPropsType> = (props) => {
    const {touched, error} = props.meta;
    const hasError = touched && error;

    return (
        <div className={ hasError
            ? `${classes["form-control__textarea"]} ${classes["error"]}`
            : classes["form-control__textarea"]}>
            <div>
                {props.children}
            </div>
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    );
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
    return (
        <FormControl {...props}><textarea {...props.input} {...props}/></FormControl>
    );
}

export const Input: FC<WrappedFieldProps> = (props) => {
    return (
        <FormControl {...props}><input {...props.input} {...props}/></FormControl>
    );
}

export function createField(placeholder: string | undefined,
                            name: string,
                            validators: Array<FieldValidatorType>,
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