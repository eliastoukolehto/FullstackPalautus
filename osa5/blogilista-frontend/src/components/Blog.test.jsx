import '@testing-library/jest-dom'
import Blog from './Blog'
import { render, screen } from '@testing-library/react'


let container

beforeEach(() => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'Admin'
    }
  }
  const user = {
    username: 'Admin',
  }

  container = render(
    <Blog blog={blog} user={user} />
  ).container
})

test('does not display all blog content at first', () => {
  const div = container.querySelector('.showBlogContent')
  expect(div).toHaveStyle('display:none')

})