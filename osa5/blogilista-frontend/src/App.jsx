import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notiflication from './components/Notiflication'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))

          setErrorMessage(`a new blog ${title} by ${author} added`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

        setTitle('')
        setAuthor('')
        setUrl('')
        })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }
  


  const loginForm = () => (
    <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
          </form> 
  )
  
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
      <input 
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      </div>
      <div>
        author 
      <input 
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      </div>
      <div>
        url
      <input 
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      </div>
      <button type='submit'>Save</button>
    </form>
  )

  return (
    <div>
      <h1>Bloglist App</h1>
      <Notiflication message={errorMessage}/>
      <br />
      {!user && loginForm()}
      {user && <div>
       <p>{user.name} logged in 
        <button onClick={handleLogout}> Logout </button></p>
        {blogForm()}
      <br />
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>}
      
    </div>
      
  )
  
}



export default App

