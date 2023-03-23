import React from "react";

export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    return value ? undefined : `required`
}

export const maxLengthString = (maxLength: number): FieldValidatorType => {
    return (value) => {
        return value && value.length > maxLength ? `Max length > ${maxLength}` : undefined
    }
}