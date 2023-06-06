import {ChangeEvent, useEffect, useState} from "react";
import classes from "./GitHubUsers.module.css"
import axios from "axios";

type UserSearchResultType = {
    id: number,
    login: string,
    url: string
}

type SearchResultType = {
    items: Array<UserSearchResultType>
}

export const GitHubUsers = () => {
    const [selectedUser, setSelectedUser] = useState<UserSearchResultType | null>(() => null)
    const [users, setUsers] = useState<Array<UserSearchResultType>>(() => [])
    const [tempSearch, setTempSearch] = useState('')

    const fetchData = (term: string) => {
        const apiURL = `https://api.github.com/search/users?q=${term}`
        axios.get<SearchResultType>(apiURL)
            .then((response) => {
                setUsers(response.data.items)
            })
    }

    const addElemInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTempSearch(e.currentTarget.value)
    }

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    useEffect(() => {
        fetchData('a')
    }, [])

    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapperItem}>
                <div>
                    <input type={"text"}
                           placeholder={"search"}
                           value={tempSearch}
                           onChange={addElemInput}
                    />
                    <button type={"submit"}
                            onClick={() => {
                                fetchData(tempSearch)
                            }}>find
                    </button>
                </div>
                <div>
                    <ul className={classes.listUsers}>{users
                        .map((user) => {
                            return <li className={selectedUser === user ? classes.activeUser : ''}
                                       key={user.id}
                                       onClick={() => {
                                           setSelectedUser(user)
                                       }}>
                                <div>id:<span className={classes.paddingUser}></span>
                                    {user.id}
                                </div>
                                <div>login:<span className={classes.paddingUser}></span>
                                    {user.login}
                                </div>
                                <div>url:<span className={classes.paddingUser}></span>
                                    <a href={user.url}>{user.url}</a>
                                </div>
                            </li>
                        })
                    }
                    </ul>
                </div>
            </div>
            <div className={classes.wrapperItem}>
                <div>Username</div>
                <div>details</div>
            </div>
        </div>
    )
}