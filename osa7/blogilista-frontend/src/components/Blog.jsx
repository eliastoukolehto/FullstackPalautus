import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { Table, Form, Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const showWhenOwner = {
    display: user.username === blog.user.username ? '' : 'none',
  }

  const addLike = () => {
    dispatch(likeBlog(blog))
  }
  const handleRemove = () => {
    dispatch(deleteBlog(blog))
    navigate('/')
  }
  const handleComment = () => {
    dispatch(commentBlog(blog, comment))
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        likes: {blog.likes} <button onClick={addLike}>like</button>
      </div>
      <div>added by {blog.user.username}</div>
      <button onClick={handleRemove} style={showWhenOwner}>
        remove
      </button>
      <br /><br />
      <h5>Comments</h5>
      <Form onSubmit={handleComment}>
        <Form.Group>
          <Form.Control
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button type="submit" variant='dark'>add comment</Button>
        </Form.Group>
      </Form>
      {blog.comments &&(
        <ul>
          {blog.comments.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Blog

Blog.propTypes = {
}
