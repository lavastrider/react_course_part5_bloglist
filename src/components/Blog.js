import { useState } from 'react'

const Blog = ({ blog, increaseLikes, userInfo, deleteEntry }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [shown, setShown] = useState(false)

  const toggleDetail = () => {
    //console.log(showing, 'is showing')
    setShown((shown) => !shown)
  }

  const label = shown
    ? 'hide'
    : 'view'

  return (
    <div style={blogStyle} className="default-view">
      <p>{blog.title} by {blog.author} <button onClick={() => toggleDetail(!shown)}>{label}</button></p>
      {shown && <div style={blogStyle} className="detail-view">
        <p>{blog.url}</p>
        <p>likes: {blog.likes} <button onClick={increaseLikes}>like</button></p>
        <p>{blog.username}</p>
        {userInfo.username === blog.username && <button onClick={deleteEntry}>delete</button>}
      </div>}
    </div>
  )
}
export default Blog