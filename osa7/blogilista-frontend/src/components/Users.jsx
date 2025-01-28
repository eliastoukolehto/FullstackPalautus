import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'


const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr key="index"><td/><td>Blogs created</td></tr>
          {users.map((u) => (
            <tr key={u.id}>
              <td><Link to={`/users/${u.id}`}>{u.username}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users