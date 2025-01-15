const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const assert = require('node:assert')
const Blog = require('../models/blog')
const { title } = require('node:process')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id field is named \'id\'', async () => {

  const response = await helper.blogsInDb()
  assert(response[0].id)
  assert(!response[0]._id)
})

test('adding a blog adds blog and content', async () => {
  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await helper.blogsInDb()
  const titles = response.map(b => b.title) 
  assert.strictEqual(response.length, helper.initialBlogs.length + 1)
  assert(titles.includes('Go To Statement Considered Harmful'))

})

test('blog without likes gets 0 likes', async () => {
  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
  }

  response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await helper.blogsInDb()
  assert.strictEqual(response.length, helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await helper.blogsInDb()
  assert.strictEqual(response.length, helper.initialBlogs.length)
})

test('blog creates and deletes successfully', async () => {
  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }

  BlogToDelete = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  response = await api
    .delete(`/api/blogs/${BlogToDelete.body.id}`)
    .expect(204)

  //assert.strictEqual(response.)
})

test('likes change successfully', async () => {
  const blogs = await (helper.blogsInDb())
  const blogToUpdate = blogs[0]
  const newBlog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes +1
  }

  updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(updatedBlog.body.likes, blogToUpdate.likes +1)

})


after(async () => {
  await mongoose.connection.close()
})