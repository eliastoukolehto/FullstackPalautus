import { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { useApolloClient, useSubscription } from "@apollo/client";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";


export const updateBookCache = (cache, query, addedBook) => {
  const uniqueByTitle = (b) => {
    let seen = new Set()
    return b.filter((item) => {
      let t = item.title
      return seen.has(t) ? false : seen.add(t) 
    })
  } 

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('library-user-token')
    if (loggedUserToken) {
      setToken(loggedUserToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const book = data.data.bookAdded 
      window.alert(
        `a new book ${book.title} by ${book.author.name} added!`
      )
      updateBookCache(client.cache, { query: ALL_BOOKS }, book )
      updateBookCache(client.cache, { query: ALL_BOOKS, variables: {genre: null} }, book )
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token &&
        <span>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={() => logout()}>logout</button>
        </span>}
        {!token &&
        <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <LoginForm show={page === "login"} setToken={setToken} />
      <Recommendations show={page === "recommend"} />
    </div>
  );
};

export default App;
