import { useState } from 'react'

const Blog = ({ blog, userInfo, increaseLikes, deleteEntry }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [shown, setShown] = useState(false)


  const toggleDetail = () => {
    setShown(!(shown))
  }



  //console.log(blogLikes, 'is blog likes in blog')
  //console.log(Object.values(blogLikes), 'is object values blog likes')
  //console.log(userInfo, 'is userinfo')



  const label = shown
    ? 'hide'
    : 'view'

  //the user wants to see detailed view
  if (shown) {
    //the blog contains info on the user
    if (blog.user){
      return (
        <div style={blogStyle} className="detail-view">
          <div>
            <p>{blog.title} by {blog.author} <button onClick={toggleDetail}>{label}</button></p>
            <p>{blog.url}</p>
            <p>likes: {blog.likes} <button onClick={increaseLikes}>like</button></p>
            <p>{blog.user.personName}</p>
            {userInfo.username === blog.user.username && <div>
              <button onClick={deleteEntry}>delete</button>
            </div>
            }
          </div>
        </div>
      )
    }
    //the blog info must come from user token
    else if (userInfo) {
      return (
        <div style={blogStyle} className="detail-view">
          <div>
            <p>{blog.title} by {blog.author} <button onClick={toggleDetail}>{label}</button></p>
            <p>{blog.url}</p>
            <p>likes: {blog.likes} <button onClick={increaseLikes}>like</button></p>
            <p>{userInfo.personName}</p>
            <button onClick={deleteEntry}>delete</button>
          </div>
        </div>
      )
    }
  }
  //the user does not want to see detailed view
  else {
    return(
      <div style={blogStyle} className="default-view">
        <div>
          <p>{blog.title} by {blog.author} <button onClick={toggleDetail}>{label}</button></p>
        </div>
      </div>

    )
  }
}

export default Blog