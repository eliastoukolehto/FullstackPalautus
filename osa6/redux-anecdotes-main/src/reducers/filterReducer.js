//import { createSlice } from "@reduxjs/toolkit"


/* const filterSlice = createSlice({
    name:'filter',
    initialState: '',
    reducers: {
        filterChange(state, action) {
            con
        }
    }
}) */

const filterReducer = (state = '', action) => {
    console.log('filter state now: ', state)
    console.log('filter action', action)
    switch(action.type) {
        case 'SET_FILTER':
            return action.payload
        default:
            return state
    }
}

export const filterChange = filter => {
    return {
        type: 'SET_FILTER',
        payload: filter,
    }
}

export default filterReducer