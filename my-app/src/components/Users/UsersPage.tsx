import React, {FC} from "react";
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader";
import Users from "./Users";
import {getIsFetching} from "../../redux/selectors/users-selectors";

type OwnPropsType = {
    title: string
}

type PropsType = OwnPropsType;

export const UsersPage: FC<PropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)

    return (
        <>
            <div>{props.title}</div>
            <div>{isFetching ? <Preloader/> : null}</div>
            <Users/>
        </>
    );
}