import {useState} from 'react'

const Blog = ({blog, userInfo}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [shown, setShown] = useState(false)
  
  //console.log(userInfo, 'is userinfo')
  
  const toggleDetail = () => {
    setShown(!(shown))
  }
  
  const deleteEntry = (id) => {
  
  
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
        <p>likes: {blog.likes} <button>like</button></p>
        <p>{blog.user.personName}</p>
        <button onClick={deleteEntry(blog.id)}>remove</button>
      </div>
      </div>
    )
   } else {
     return (
      <div style={blogStyle}>
      <div>
        <p>"{blog.title}" by {blog.author} <button onClick={toggleDetail}>{label}</button> </p>
        <p>{blog.url}</p>
        <p>likes: {blog.likes} <button>like</button></p>
        <p>{userInfo.personName}</p>
        <button onClick={deleteEntry(blog.id)}>remove</button>
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