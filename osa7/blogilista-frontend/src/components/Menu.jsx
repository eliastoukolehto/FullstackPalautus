import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleLogout = () => {
    dispatch(userLogout())
  }

  return(
    <Navbar bg='secondary'>
      <Container>
        <Nav>
          <Navbar.Brand href='/'>Blogs</Navbar.Brand>
          <Navbar.Brand href='/users'>Users</Navbar.Brand>
        </Nav>
        {user && (
          <Navbar.Text className='text-black'>
            {user.username} logged in <button onClick={handleLogout}> Logout </button>
          </Navbar.Text>)}
      </Container>
    </Navbar>
  )
}

export default Menu