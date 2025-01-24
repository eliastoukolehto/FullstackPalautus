import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notiflication',
    initialState: '',
    reducers: {
        changeNotification(state, action) {
            const notification = action.payload
            return notification
        },
    } 
})

export const { changeNotification } = notificationSlice.actions

export const notify = ( message, time ) => {
    return async dispatch => {
        dispatch(changeNotification(message))
        setTimeout( () =>
            {dispatch(changeNotification(''))}, time*1000
        )
    }
}

export default notificationSlice.reducer