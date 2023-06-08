import {useEffect, useState} from "react";
import classes from "./GitHubUsers.module.css"
import {SearchUsers} from "./SearchUsers/SearchUsers";
import {UsersList} from "./UsersList/UsersList";
import {UserDetails} from "./UserDetails/UserDetails";

export type UserSearchResultType = {
    id: number,
    login: string,
    url: string
}

export type UserType = {
    id: number,
    login: string,
    avatar_url: string,
    html_url: string
}

export const GitHubUsers = () => {
    const [selectedUser, setSelectedUser] = useState<UserSearchResultType | null>(() => null)
    const [searchInitTerm, setSearchInitTerm] = useState('it')

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapperItem}>
                <div>
                    <SearchUsers value={searchInitTerm}
                                 onSubmit={(value: string) => {
                                     setSearchInitTerm(value)
                                 }}
                    />
                    <button onClick={() => setSearchInitTerm('it')}>reset</button>
                </div>
                <div>
                    <UsersList term={searchInitTerm}
                               selectedUser={selectedUser}
                               onUserSelect={(user) => {
                                   setSelectedUser(user)
                               }}
                    />
                </div>
            </div>
            <div className={classes.wrapperItem + ' ' + classes.wrapperItemDetails}>
                <UserDetails selectedUser={selectedUser}/>
            </div>
        </div>
    )
}