import { useQuery } from "@apollo/client"
import { ALL_BOOKS, USER } from "../queries"
import { useEffect, useState } from "react"


const Recommendations = (props) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const user = useQuery(USER)
  const recommendations = useQuery(ALL_BOOKS, {
    variables: {genre: favoriteGenre}
  })
  useEffect(() => {
    if (user.data && user.data.me) {
      setFavoriteGenre(user.data.me.favoriteGenre)
    } 
  }, [user])

  if (!props.show) {
    return null
  }
  if (recommendations.loading) {
    return <div>loading...</div>
  }
  const books = recommendations.data.allBooks
  

  return (
    <div>
      <h2>Recommendatons</h2>
      <div>books in your favorite genre <b>{favoriteGenre}</b></div>
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
  </div>
  )
}

export default Recommendations