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

type UserType = {
    id: number,
    login: string,
    avatar_url: string,
    html_url: string
}

export const GitHubUsers = () => {
    const [selectedUser, setSelectedUser] = useState<UserSearchResultType | null>(() => null)
    const [userDetails, setUserDetails] = useState<null | UserType>(null)
    const [users, setUsers] = useState<Array<UserSearchResultType>>(() => [])
    const [tempSearch, setTempSearch] = useState('it')
    const [searchInitTerm, setSearchInitTerm] = useState('it')

    const addElemInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTempSearch(e.currentTarget.value)
    }

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    useEffect(() => {
        const apiURL = `https://api.github.com/search/users?q=${tempSearch}`
        axios.get<SearchResultType>(apiURL)
            .then((response) => {
                setUsers(response.data.items)
            })
    }, [searchInitTerm])

    useEffect(() => {
        console.log("user detail")
        if (selectedUser) {
            const apiURL = `https://api.github.com/users/${selectedUser.login}`
            axios.get<UserType>(apiURL)
                .then((response) => {
                    setUserDetails(response.data)
                })
        }

    }, [selectedUser])

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
                                setSearchInitTerm(tempSearch)
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
                            </li>
                        })
                    }
                    </ul>
                </div>
            </div>
            <div className={classes.wrapperItem + ' ' + classes.wrapperItemDetails }>
                {userDetails &&
                    <>
                        <div>Details user:</div>
                        <div className={classes.userDetailsLogin}>{userDetails.login}</div>
                        <div><img src={userDetails.avatar_url} alt={"user_detail"}/></div>
                        <div><a href={userDetails.html_url}>{userDetails.html_url}</a></div>
                    </>
                }
            </div>
        </div>
    )
}