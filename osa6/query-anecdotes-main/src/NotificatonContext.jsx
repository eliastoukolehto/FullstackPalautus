import { useContext } from "react"
import { useReducer } from "react"
import { createContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET":
            return action.payload
        case "CLEAR":
            return ''
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notiflication, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notiflication, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}


export default NotificationContext