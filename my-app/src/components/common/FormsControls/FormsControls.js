import React from "react";
import classes from "./FormsControls.module.css";

const FormControl = (props) => {
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

export const Textarea = (props) => {
    return (
        <FormControl {...props}><textarea {...props.input} placeholder={props.placeholder}/></FormControl>
    );
}

export const Input = (props) => {
    return (
        <FormControl {...props}><input {...props.input} placeholder={props.placeholder}/></FormControl>
    );
}