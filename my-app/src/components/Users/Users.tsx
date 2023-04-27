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
    getUsers,
    getUsersFilter
} from "../../redux/selectors/users-selectors";
import {followThunkCreator, getUsersThunkCreator, unfollowThunkCreator} from "../../redux/user-reducer";
import {useLocation, useNavigate} from "react-router-dom";
import queryString from "querystring";

type ParsedType = {
    term?: string,
    page?: string,
    friend?: string
}

export const Users: FC = React.memo(() => {
    const users = useSelector(getUsers)
    const isFollowing = useSelector(getIsFollowing)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const portionSize = useSelector(getPortionSize)
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch()
    const navigation = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const query: ParsedType = {}

        if (filter.term) query.term = filter.term
        if (filter.friend) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        navigation({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    useEffect(() => {
        const {search} = location
        const parsed = queryString.parse(search.substring(1)) as ParsedType

        let actualPage = currentPage
        let actualFilter = filter

        if (parsed.page) {
            actualPage = Number(parsed.page)
        }

        if (parsed.term) {
            actualFilter = {...actualFilter, term: parsed.term as string}
        }

        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }

        //todo: typing dispatch hook
        dispatch<any>(getUsersThunkCreator(actualPage, pageSize, actualFilter))
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
})

export default Users;