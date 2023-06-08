import {FC, useEffect, useState} from "react";
import classes from "../GitHubUsers.module.css";
import {UserSearchResultType, UserType} from "../GitHubUsers";
import axios from "axios";
import {ReverseTimer} from "../ReverseTimer/ReverseTimer";

type UserDetailsPropsType = {
    selectedUser: UserSearchResultType | null
}

export const initialStartSeconds: number = 10

export const UserDetails: FC<UserDetailsPropsType> = (props) => {
    const [userDetails, setUserDetails] = useState<null | UserType>(null)
    const [seconds, setSeconds] = useState(initialStartSeconds)

    useEffect(() => {
        if (props.selectedUser) {
            const apiURL = `https://api.github.com/users/${props.selectedUser.login}`
            axios.get<UserType>(apiURL)
                .then((response) => {
                    setUserDetails(response.data)
                    setSeconds(initialStartSeconds)
                })
        }
    }, [props.selectedUser])

    useEffect(() => {
        if (seconds < 0) {
            setUserDetails(null)
        }
    }, [seconds])

    return (
        <>
            {userDetails &&
                <>
                    <div>Details user:
                        <ReverseTimer seconds={seconds}
                                      onChangeSeconds={(actualSeconds) => {setSeconds(actualSeconds)}}
                        />
                    </div>
                    <div className={classes.userDetailsLogin}>{userDetails.login}</div>
                    <div><img src={userDetails.avatar_url} alt={"user_detail"}/></div>
                    <div><a href={userDetails.html_url}>{userDetails.html_url}</a></div>
                </>
            }
        </>
    )
}