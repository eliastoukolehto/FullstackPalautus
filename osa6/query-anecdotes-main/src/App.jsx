import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificatonContext'

const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const handleVoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes'] })
    }
  }
  )

  const handleVote = (anecdote) => {
    handleVoteMutation.mutate({...anecdote, votes: anecdote.votes +1})
    
    dispatch({type: "SET", payload: `You liked ${anecdote.content}`})
    setTimeout(() => dispatch({type: "CLEAR"}), 5000)
  }
  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: false
    }
  )
  
  if (result.isPending) {
    return <div>Loading...</div>
  }
  if (result.isError) {
    return <div>anecdote service is not available due to problems in server </div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
