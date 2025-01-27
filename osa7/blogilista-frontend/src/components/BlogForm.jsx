import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
    }
    dispatch(createBlog(blog, user))
    dispatch(notify(`a new blog ${title} by ${author} added`,5))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          id="title-textbox"
          data-testid="title"
        />
      </div>
      <div>
        author
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          id="author-textbox"
          data-testid="author"
        />
      </div>
      <div>
        url
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          id="url-textbox"
          data-testid="url"
        />
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default BlogForm

BlogForm.propTypes = {
}
