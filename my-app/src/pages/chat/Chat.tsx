import React, {ChangeEvent, FC, useEffect, useState} from "react";
import classes from "../../pages/chat/Chat.module.css";
// @ts-ignore
import profileImage from "../../assets/images/avatar.jpg";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string,
    photo: string
    userId: number
    userName: string
}

export const Chat: FC = () => {
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
}

export const Messages: FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.onmessage = (e) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessage) => [...prevMessage, ...newMessages])
        }
    }, [])

    return (
        <div>
            {messages.map((message) => {
                return <Message message={message}/>
            })}
        </div>
    )
}

export const Message: FC<{message: ChatMessageType}> = ({message}) => {
    return (
        <div>
            <img className={classes["chat-img__local"]} src={message.photo} alt={"img"}/>
            <span>{message.userName}</span>
            <div>{message.message}</div>
        </div>
    )
}

export const AddMessageForm: FC = () => {
    const [message, setMessage] = useState('')

    const changeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }

    const sendMessage = () => {
        ws.send(message)
        setMessage('')
    }

    return (
        <div>
            <textarea onChange={changeMessage} value={message}></textarea>
            <div>
                <button onClick={sendMessage} type={"submit"}>Send</button>
            </div>
        </div>
    )
}