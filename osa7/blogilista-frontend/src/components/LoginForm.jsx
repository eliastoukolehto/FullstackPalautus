import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'
import { useState } from 'react'
import { Table, Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin({
      username,
      password }))
    setUsername('')
    setPassword('')
  }

  return(
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>password</Form.Label>
        <Form.Control
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button type="submit" variant='dark'>login</Button>
    </Form>
  )
}

export default LoginForm

LoginForm.propTypes = {
}
