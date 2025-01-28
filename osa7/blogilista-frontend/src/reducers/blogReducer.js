import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    newBlog(state, action) {
      const blog = action.payload
      state.push(blog)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const id = action.payload.id
      return state.map(b =>
        b.id === id ? { ...action.payload, user: b.user } : b
      )
    },
    removeBlog(state, action) {
      const id = action.payload.id
      return state.filter(b =>
        b.id !== id
      )
    }
  }
})

export const { newBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content, user) => {
  return async dispatch => {
    const blog = await blogService.create(content)
    dispatch(newBlog({ ...blog, user: user }))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes+1 }
    const updatedBlog = await blogService.update(likedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch(removeBlog(blog))
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const editedBlog = { ...blog, comments: blog.comments.concat(comment) }
    const updatedBlog = await blogService.update(editedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer