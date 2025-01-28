import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => [...state.blogs])
  blogs.reverse().sort((a, b) => b.likes - a.likes)
  const blogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr style={blogStyle} key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs