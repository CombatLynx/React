import React, {ChangeEvent, FC, useEffect, useState} from "react";
import classes from "../../pages/chat/Chat.module.css";
import {ChatMessageType} from "../../dal/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";

export const Chat: FC = React.memo(() => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch<any>(startMessagesListening())

        return () => {
            dispatch<any>(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <div className={classes.chat}>Chat</div>
            <div className={classes.messages}>
                <Messages/>
            </div>
            <div className={classes.messageForm}>
                <AddMessageForm/>
            </div>
        </div>
    )
})

export const Messages: FC = React.memo(() => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div>
            {messages.map((message, index) => {
                return <Message message={message} key={index}/>
            })}
        </div>
    )
})

export const Message: FC<{message: ChatMessageType}> = React.memo(({message}) => {
    return (
        <div>
            <img className={classes["chat-img__local"]} src={message.photo} alt={"img"}/>
            <span>{message.userName}</span>
            <div>{message.message}</div>
        </div>
    )
})

export const AddMessageForm: FC = React.memo(() => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const changeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }

    const sendMessageHandler = () => {
        if (!message) {
            return
        }

        dispatch<any>(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <textarea onChange={changeMessage} value={message}></textarea>
            <div>
                <button disabled={false} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
})