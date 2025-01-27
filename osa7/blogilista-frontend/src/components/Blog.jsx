import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const dispatch = useDispatch()
  const [view, setView] = useState(false)
  const hideWhenView = { display: view ? 'none' : '' }
  const showWhenView = { display: view ? '' : 'none' }
  const showWhenOwner = {
    display: user.username === blog.user.username ? '' : 'none',
  }
  //console.log('user: '+ JSON.stringify(user) + ' blog user: ' + blog.user)
  const toggleView = () => {
    setView(!view)
  }

  const addLike = () => {
    dispatch(likeBlog(blog))
  }
  const handleRemove = () => {
    dispatch(deleteBlog(blog))
  }

  return (
    <div>
      <div style={{ ...blogStyle, ...hideWhenView }}>
        <div>
          {blog.title} {blog.author} <button onClick={toggleView}>show</button>
        </div>
      </div>
      <div
        style={{ ...blogStyle, ...showWhenView }}
        className="showBlogContent"
      >
        <div>
          {blog.title} {blog.author} <button onClick={toggleView}>hide</button>
          <div>{blog.url} </div>
          <div>
            likes: {blog.likes} <button onClick={addLike}>like</button>
          </div>
          <div>{blog.user.username}</div>
          <button onClick={handleRemove} style={showWhenOwner}>
            remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
