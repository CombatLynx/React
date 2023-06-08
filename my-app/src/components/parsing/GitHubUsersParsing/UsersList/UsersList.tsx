import {FC, useEffect, useState} from "react";
import {UserSearchResultType} from "../GitHubUsers";
import classes from "../GitHubUsers.module.css";
import axios from "axios";

type UsersListPropsType = {
    term: string,
    selectedUser: UserSearchResultType | null,
    onUserSelect: (user: UserSearchResultType) => void
}

type SearchResultType = {
    items: Array<UserSearchResultType>
}

export const UsersList: FC<UsersListPropsType> = (props) => {
    const [users, setUsers] = useState<Array<UserSearchResultType>>(() => [])

    useEffect(() => {
        const apiURL = `https://api.github.com/search/users?q=${props.term}`
        axios.get<SearchResultType>(apiURL)
            .then((response) => {
                setUsers(response.data.items)
            })
    }, [props.term])

    return (
        <>
            <ul className={classes.listUsers}>
                {users
                .map((user) => {
                    return <li className={props.selectedUser === user ? classes.activeUser : ''}
                               key={user.id}
                               onClick={() => {
                                   props.onUserSelect(user)
                               }}>
                        <div>id:<span className={classes.paddingUser}></span>
                            {user.id}
                        </div>
                        <div>login:<span className={classes.paddingUser}></span>
                            {user.login}
                        </div>
                    </li>
                })
            }
            </ul>
        </>
    )
}