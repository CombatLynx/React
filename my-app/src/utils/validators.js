import React from "react";

export const required = (value) => {
    return value ? undefined : `required`
}

export const maxLengthString = (maxLength) => {
    return (value) => {
        return value && value.length > maxLength ? `Max length > ${maxLength}` : undefined
    }
}