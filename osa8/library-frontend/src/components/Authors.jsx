import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: {name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  } else {
  const authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
          <div>
            <form onSubmit={submit}>
              <div>
                <select value={name}
                 onChange={({ target }) => setName(target.value)}>
                  {authors.map((a) => (
                    <option value={a.name} key={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div>
                born
                <input
                 value={born}
                 onChange={({ target }) => setBorn(target.value)}/>
              </div>
              <button type='submit'>update author</button>
            </form>
          </div>
    </div>
  )
}
}

export default Authors
