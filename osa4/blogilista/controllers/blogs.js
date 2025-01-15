const blogsRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')
const { response } = require('../app')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  const blog = await new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter