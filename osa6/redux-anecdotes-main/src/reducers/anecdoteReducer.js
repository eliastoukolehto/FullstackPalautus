import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes"


const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    newAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      return state.map(anecdote =>
        anecdote.id === id ? action.payload : anecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }

  }
})

export const { newAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(newAnecdote(anecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes +1
    }
    const updatedAnecdote = await anecdoteService.update(votedAnecdote)
    console.log('rdata: '+JSON.stringify(updatedAnecdote))
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer