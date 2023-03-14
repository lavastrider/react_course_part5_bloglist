import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const [errorMessage, setErrorMessage] = useState(null)
  
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)}, 5000)    
    }
  }
  
  const addBlog = (event) => {
    event.preventDefault()
    try {
      //console.log('well we at least fired this function')
      const blogObject = {
        title: blogTitle, 
	    author: blogAuthor,
        url: blogUrl
	  }
	  
	  //console.log(blogObject, 'is blogobject that was created')
	  //console.log(errorMessage, 'is error msg before set')
	  blogService
	    .create(blogObject)
	  
	  setErrorMessage(`The blog post "${blogObject.title}" by ${blogObject.author} has been added`)
	  //console.log(errorMessage, 'is error msg after set')
	  setTimeout(() => {
	    setErrorMessage(null)}, 5000)
	  setBlogTitle('')
	  setBlogAuthor('')
	  setBlogUrl('')
	} catch (exception) {
	  setErrorMessage({exception})
	}
  }
  
  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  const blogForm = () => (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={blogTitle}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blogAuthor}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blogUrl}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <button onClick={addBlog}>create</button>
      </form>
    </div>  
  )
  
  const loginForm = () => {
   if (user === null) {
     return (
       <div>
         <h2>Log in to the application</h2>
         <form onSubmit={handleLogin}>
            <div>
              username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>  
       </div>
     )
   }
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


  return (
    <div>
      <h2>Blogs</h2>
      <Notification message ={errorMessage}/>
      {!user && loginForm()}
      {user && <div>
        <p>{user.personName} is logged in</p>
        <button onClick={logOut}>logout</button>
        {blogForm()}
        <h2>Blog List</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </div>       
       }
       <div className='note'>
         <p>poop</p>
       </div>
    </div>
  )
}

export default App