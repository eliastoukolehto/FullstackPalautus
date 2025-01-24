import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      if (state.filter) {
        const list = [...state.anecdotes]
        return list.filter(a =>  a.content.includes(state.filter))     
      } else {
        return [...state.anecdotes]
      }
    })
    anecdotes.reverse().sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(notify(`you voted '${anecdote.content}'`, 5))
    }

    return ( 
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList