import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notiflication from './components/Notiflication'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, userLogin, userLogout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])
  useEffect(() => {
    dispatch(initializeUser())
  },[])


  const user = useSelector(state => state.user)
  const blogs = useSelector(state => [...state.blogs])
  blogs.reverse().sort((a, b) => b.likes - a.likes)

  const blogFormRef = useRef()

  const handleLogout = () => {
    dispatch(userLogout())
  }

  return (
    <div>
      <h1>Bloglist App</h1>
      <Notiflication />
      <br />
      {!user && (
        <div>
          <LoginForm/>
        </div>
      )}
      {user && (
        <div>
          <p>
            {user.username} logged in
            <button onClick={handleLogout}> Logout </button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <br />
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
