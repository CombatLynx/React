import React, {FC, useEffect} from "react";
import User from "./User";
import PaginationUsers from "./PaginatonUsers/PaginationUsers";
import UserSearchForm from "./UserSearchForm/UserSearchForm";
import {FormikValues} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getIsFollowing,
    getPageSize,
    getPortionSize,
    getTotalUsersCount,
    getUsers, getUsersFilter
} from "../../redux/selectors/users-selectors";
import {followThunkCreator, getUsersThunkCreator, unfollowThunkCreator} from "../../redux/user-reducer";

export const Users: FC = () => {

    const users = useSelector(getUsers)
    const isFollowing = useSelector(getIsFollowing)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const portionSize = useSelector(getPortionSize)
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch()

    useEffect(() => {
        //todo: typing dispatch hook
        dispatch<any>(getUsersThunkCreator(currentPage, pageSize, filter))
    }, [])

    const onCurrentPage = (currentPage: number): any => {
        //todo: typing dispatch hook
        dispatch<any>(getUsersThunkCreator(currentPage, pageSize, filter))
    }

    const onFilterChange = (filter: FormikValues) => {
        //todo: typing dispatch hook
        dispatch<any>(getUsersThunkCreator(1, pageSize, filter))
    }

    const follow = (userId: number) => {
        //todo: typing dispatch hook
        dispatch<any>(followThunkCreator(userId))
    }

    const unfollow = (userId: number) => {
        //todo: typing dispatch hook
        dispatch<any>(unfollowThunkCreator(userId))
    }

    const usersProps = users.map(
        (user) => {
            return <User key={user.id}
                         user={user}
                         follow={follow}
                         unfollow={unfollow}
                         isFollowing={isFollowing}
            />
        })

    return (
        <div>
            <div>
                <UserSearchForm onFilterChange={onFilterChange}
                />
            </div>
            <PaginationUsers
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onCurrentPage={onCurrentPage}
                portionSize={portionSize}
            />
            {usersProps}
        </div>
    );
}

export default Users;