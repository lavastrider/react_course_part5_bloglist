import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, userInfo, increaseLikes}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [shown, setShown] = useState(false)
  
  //console.log(blogLikes, 'is blog likes in blog')
  //console.log(Object.values(blogLikes), 'is object values blog likes')
  //console.log(userInfo, 'is userinfo')
  
  const toggleDetail = () => {
    setShown(!(shown))
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
  
//the user wants to see detailed view
  if (shown) {
    //the blog contains info on the user
    if (blog.user){
        return (
         <div style={blogStyle}>
            <div>
              <p>{blog.title} by {blog.author} <button onClick={toggleDetail}>{label}</button></p>
              <p>{blog.url}</p>
              <p>likes: {blog.likes} <button onClick={increaseLikes}>like</button></p>
              <p>{blog.user.personName}</p>
              <p>peepers</p>
              <p>{userInfo.id} is userinfo id and {blog.user.id} is blog user id</p>
              {userInfo.id === blog.user.id && <div>
                <button>delete</button>
                </div>
                }
            </div>
          </div> 
        )
    }
    //the blog info must come from user token
    else {
        return (
        <div style={blogStyle}>
            <div>
              <p>{blog.title} by {blog.author} <button onClick={toggleDetail}>{label}</button></p>
              <p>{blog.url}</p>
              <p>likes: {blog.likes} <button onClick={increaseLikes}>like</button></p>
              <p>{userInfo.personName}</p>
              {userInfo.id === userInfo.id && <div>
                <button>delete</button>
                </div>
                }
            </div>
          </div> 
        )
    }
  }
  //the user does not want to see detailed view
  else {
    return(
      <div style={blogStyle}>
         <div>
           <p>{blog.title} by {blog.author} <button onClick={toggleDetail}>{label}</button></p>
         </div>
      </div>
    
    )
  }
}

export default Blog