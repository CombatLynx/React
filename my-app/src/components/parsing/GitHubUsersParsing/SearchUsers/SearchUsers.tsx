import {ChangeEvent, FC, useEffect, useState} from "react";

type SearchUsersPropsType = {
    value: string,
    onSubmit: (fixedValue: string) => void
}

export const SearchUsers: FC<SearchUsersPropsType> = (props) => {
    const [tempSearch, setTempSearch] = useState(props.value)

    const addElemInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTempSearch(e.currentTarget.value)
    }

    useEffect(() => {
        setTempSearch(props.value)
    }, [props.value])

    return (
        <>
            <input type={"text"}
                   placeholder={"search"}
                   value={tempSearch}
                   onChange={addElemInput}
            />
            <button type={"submit"}
                    onClick={() => {
                        props.onSubmit(tempSearch)
                    }}>find
            </button>
        </>
    )
}