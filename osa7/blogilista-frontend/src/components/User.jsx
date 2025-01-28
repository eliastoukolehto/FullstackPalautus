import ListGroup from 'react-bootstrap/ListGroup'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.username}</h2>
      <div>added blogs</div>
      <ListGroup as="ul" numbered>
        {user.blogs.map((b) => (
          <ListGroup.Item key={b.id} as="li">{b.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User