import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from '../NotificatonContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    },
    onError: (error) => {
      console.log(error)
      dispatch({type: "SET", payload: error.response.data.error})
    setTimeout(() => dispatch({type: "CLEAR"}), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes:0})

    dispatch({type: "SET", payload: `You created ${content}`})
    setTimeout(() => dispatch({type: "CLEAR"}), 5000)

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
