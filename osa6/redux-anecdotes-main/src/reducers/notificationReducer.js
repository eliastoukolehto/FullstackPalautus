import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notiflication',
    initialState: '',
    reducers: {
        changeNotification(state, action) {
            const notification = action.payload
            return state = notification
        }
    } 
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer