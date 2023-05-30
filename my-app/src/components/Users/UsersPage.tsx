import React, {FC} from "react";
import {useSelector} from "react-redux";
import Users from "./Users";
import {getIsFetching} from "../../redux/selectors/users-selectors";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {PreloaderArina} from "../common/Preloader/Preloader";

type OwnPropsType = {
    title: string
}

type PropsType = OwnPropsType;

const UsersPage: FC<PropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)

    return (
        <>
            <div>{props.title}</div>
            <div>{isFetching ? <PreloaderArina/> : null}</div>
            <Users/>
        </>
    );
}

export default compose<React.ComponentType>(
    withAuthRedirect
)(UsersPage)