import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [updatedBlogLikes, setUpdatedBlogLikes] = useState('')
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  
  const blogFormRef= useRef()
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    //console.log(loggedUserJSON, 'is logged user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //console.log(user, 'is user in useeffect')
      blogService.setToken(user.token)
    }
  }, [])
  
  //console.log(user, 'is user outside of useeffect')
  //console.log(loggedUserJSON, 'is logged user')
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem( 'loggedBlogAppUser', JSON.stringify(user) )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)}, 5000)    
    }
  }
  
  const addBlog = (blogObject) => {
  blogFormRef.current.toggleVisib()
  try{
    blogService
      .create(blogObject)
      .then((returnedBlog)=> {
        console.log(returnedBlog, 'is the obj that is returned blog')
        setBlogs(blogs.concat(returnedBlog))
       })	
       
    setErrorMessage(`The blog post "${blogs[blogs.length-1].title}" by ${blogs[blogs.length-1].author} has been added`)
	setTimeout(() => {
	    setErrorMessage(null)}, 5000)
   } catch(exception) {
     setErrorMessage(`There was an error when submitting the blog's information. Please try again.`)
   }
   }

  const blogForm = () => {
    return(
    <Togglable buttonLabel="New Blog">
      <BlogForm
        onSubmit={addBlog}
        value={newBlog}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
       />
     </Togglable>
    )  
  }
  
  const increaseLikes = async (id) => {
  
    const blog = blogs.find((diary)=> diary.id === id)
    console.log(blog, 'is blog')
    console.log(blog.id, 'is blog id')
    //console.log(blog.user, 'is blog user')
    //console.log(blog.user.id, 'is blog user id')
    console.log(blog.likes, 'is blog likes before update')
    
    const updatedBlogInfo = {
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    
    setUpdatedBlogLikes(updatedBlogInfo.likes)
    //console.log(updatedBlogInfo, 'is updated blog info')
    await blogService.update(blog.id, updatedBlogInfo)
    console.log('we updated the likes')
    console.log(blog.likes, 'is blog likes after put')
    console.log(updatedBlogInfo.likes, 'is updatedbloginfo likes after put')
    //blog.likes = updatedBlogLikes
    //console.log(blog.likes, 'is after setting it equal to blog likes')
}
  
  const loginForm = () => {
   return (
       <Togglable buttonLabel='login'>
         <LoginForm
           username={username}
           password={password}
           handleUsernameChange={({ target }) => setUsername(target.value)}
           handlePasswordChange={({ target }) => setPassword(target.value)}
           handleSubmit={handleLogin}
         />
       </Togglable>
     )
  }
  
  const logOut = () => {
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      if (!(window.localStorage.getItem('loggedBlogAppUser'))) {
        window.location.reload(true)
      }
    } catch (exception) {
      console.log('we have an error')
    }
  }
  
  const mappedBlogs = blogs.map(blog =><Blog key={blog.id} blog={blog} userInfo={user} increaseLikes={() => increaseLikes(blog.id)} blogLikes={updatedBlogLikes}/>)
  //mappedBlogs.sort((a,b)=> a.props.blog.likes-b.props.blog.likes)
  //console.log(mappedBlogs)
  //console.log(mappedBlogs[0], 'is mapped blogs zero')
  //console.log(mappedBlogs[0].props, 'is mapped blogs zero props')
  //console.log(mappedBlogs[0].props.blog, 'is mapped blogs zero props blog')
  //console.log(mappedBlogs[0].props.blog.likes, 'is mapped blogs zero props blog likes')
  
  //console.log(blogs, 'is blogs')
  const sorted = [...blogs].sort((a,b)=> a - b)
  //console.log(sorted, 'is sorted') 
  const sortVal = Object.values(blogs)
  //console.log(sortVal, 'is sort val')


  return (
    <div>
      <h2>Blogs</h2>
      <Notification message ={errorMessage}/>
      {!user && loginForm()}
      {user && <div>
        <p>{user.personName} is logged in</p>
        <button onClick={logOut}>logout</button>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
        <h2>Blog List</h2>
        {mappedBlogs}
        </div>       
       }
    </div>
  )
}

export default App