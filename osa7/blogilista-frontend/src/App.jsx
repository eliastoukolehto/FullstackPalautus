import { useEffect } from 'react'
import Notiflication from './components/Notiflication'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, userLogin, userLogout } from './reducers/userReducer'
import Blogs from './components/Blogs'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useMatch,
  useNavigate
} from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])
  useEffect(() => {
    dispatch(initializeUser())
  },[])
  useEffect(() => {
    dispatch(initializeUsers())
  },[])


  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const match = useMatch('/users/:id')
  const matchUser = match ? users.find(u => u.id === match.params.id) : null

  const match2 = useMatch('/blogs/:id')
  const matchBlog = match2 ? blogs.find(b => b.id === match2.params.id) : null

  return (
    <div className="container">
      <Menu/>
      <h1>Bloglist App</h1>
      <Notiflication />
      {!user && (
        <div>
          <LoginForm/>
        </div>
      )}
      {user && (
        <div>
          <Routes>
            <Route path='/' element={<Blogs/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/users/:id' element={<User user={matchUser}/>}/>
            <Route path='/blogs/:id' element={<Blog blog={matchBlog}/>}/>
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
