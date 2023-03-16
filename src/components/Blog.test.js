import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author', () => {

  //test that checks that the component displaying a blog renders the blog title and author
  //but does not render url or likes by default
  
  const blog = {
     title: 'KT Tunstall Discography',
     author: 'Record Label',
     url: 'kttunstall.com/discography'
   }

   const {container} = render(<Blog blog={blog}/>)
   
   const element = container.querySelector('.default-view')
   //console.log(element, 'is container with query selector')
   expect(element).toHaveTextContent('KT Tunstall Discography')
   expect(element).toHaveTextContent('Record Label')
   expect(element).not.toHaveTextContent('kttunstall.com/discography')
})

test('blog url and likes shown when button clicked', async () => {
  //test that checks that the blog's url and number of likes are shown when button
  //controlling details clicked
  
  const blog = {
     title: 'Lene Marlin Discography',
     author: 'Record Label',
     url: 'lenemarlin.com/discography'
   }

  const mockHandler = jest.fn()

  const {container} = render(<Blog blog={blog}/>)
  console.log(container, 'is container')

  const user = userEvent.setup()
  const button = screen.getByText('view')
  //console.log(button, 'is button') <- button does have value with view, showing that it found the button
  await user.click(button)
  
  //const {container1} = render(<Blog blog={blog}/>)
  //console.log(container1, 'is container1')
  
  const element = container.querySelector('.detail-view')
  console.log(element, 'is element')

  //expect(element).toHaveTextContent('lenemarlin.com/discography')
})


test('if like button pressed twice like handler called twice', () => {
  //test which ensures that if like button pressed twice, event handler that component received
  //as props is called twice
  
  const mockHandler = jest.fn()

})


test('new blog created correctly', () => {
  //test for new blog form
  //should check that form calls event handler it received as props with the right details when
  //new blog created
  
 })
