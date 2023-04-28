export type ChatMessageType = {
    message: string,
    photo: string
    userId: number
    userName: string
}

type SubscriberType = (messages: ChatMessageType[]) => void

// type SubscribersType = Array<SubscriberType>
let subscribers = [] as SubscriberType[]

let ws: WebSocket

const closeHandler = () => {
    setTimeout(createWebSocket, 1000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach((s) => s(newMessages))
}

function createWebSocket() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)

    // ws.onmessage = (e: MessageEvent) => {
    //     const newMessages = JSON.parse(e.data)
    //     subscribers.forEach((s) => s(newMessages))
    // }
}

export const chatApi = {
    start: () => {
        createWebSocket()
    },
    stop: () => {
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe: (callback: SubscriberType) => {
        subscribers.push(callback)
    },
    unsubscribe: (callback: SubscriberType) => {
        subscribers.filter(s => s !== callback)
    },
    sendMessage: (message: string) => {
        ws?.send(message)
    }
}