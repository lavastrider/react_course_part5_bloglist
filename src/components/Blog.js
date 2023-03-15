import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, userInfo}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [shown, setShown] = useState(false)
  const ident = blog.id
  //console.log(ident)
  
  //console.log(userInfo, 'is userinfo')
  
  const toggleDetail = () => {
    setShown(!(shown))
  }
  
  const increaseLikes = (id) => {
    console.log(blog.user, 'is blog user')
    console.log(blog.user.id, 'is blog user id')
    
    const updatedBlogInfo = {
      user: blog.user.id,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    
    console.log(updatedBlogInfo, 'is updated blog info')
    
 
    blogService
      .update(blog.id, updatedBlogInfo)
      .then((diary) => {
        console.log('we updated the likes')     
      })
  }
  
  const deleteEntry = (id) => {
    const agree = window.confirm(`Are you sure you want to delete ${blog.title}?`)
    if (agree) {
      blogService
        .delete(id)
        .then(()=> console.log('we deleted'))
    }
  
  }

  const label = shown
    ? 'hide'
    : 'view'
  
  if (shown) {
    if (blog.user) {
    return (
      <div style={blogStyle}>
      <div>
        <p>"{blog.title}" by {blog.author} <button onClick={toggleDetail}>{label}</button> </p>
        <p>{blog.url}</p>
        <p>{blog.id}</p>
        <p>likes: {blog.likes} <button onClick=(()=>{increaseLikes(blog.id)})>like</button></p>
        <p>{blog.user.personName}</p>
        <p>pee</p>
        <button>remove</button>
      </div>
      </div>
    )
   } else {
     return (
      <div style={blogStyle}>
      <div>
        <p>"{blog.title}" by {blog.author} <button onClick={toggleDetail}>{label}</button> </p>
        <p>{blog.url}</p>
        <p>{blog.id}</p>
        <p>likes: {blog.likes} <button>like</button></p>
        <p>{userInfo.personName}</p>
        <button>remove</button>
      </div>
      </div>
     )
   } 
  } else {
    return (
      <div style={blogStyle}>
      <div>
        <p>"{blog.title}" by {blog.author} <button onClick={toggleDetail}>{label}</button> </p>
      </div>
      </div>
      
      )
  }  
}

export default Blog