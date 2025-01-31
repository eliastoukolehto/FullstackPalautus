import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result1 = useQuery(ALL_BOOKS, {
    variables: {genre}
  })
  const result2 = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result1.loading || result2.loading)  {
    return <div>loading...</div>
  } 
  const books = result1.data.allBooks
  const genres = [...new Set(result2.data.allBooks.flatMap(b => b.genres))]
   

  return (
    <div>
      <h2>books</h2>

      {genre && <div> in genre <b>{genre}</b></div>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <span key={g}><button onClick={() => setGenre(g)}>{g}</button></span>
        ))}
      <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
