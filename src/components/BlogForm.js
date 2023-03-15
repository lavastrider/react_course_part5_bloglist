import {useState} from 'react'

const BlogForm = ({ createBlog }, props) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  
  
  const addBlog = (event) => {
    event.preventDefault()
    try {
      //console.log('well we at least fired this function')
      createBlog({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      })
      
      //so the blog's info is there. it exists. then why does it require a refresh? 
	  
	  //console.log(testBlog, 'is createblog that was created')
	  //console.log(errorMessage, 'is error msg before set')
	  
	  
	  //props.setErrorMessage(`The blog post "${blogTitle}" by ${blogAuthor} has been added`)
	  //console.log(errorMessage, 'is error msg after set')
	  //setTimeout(() => {
	    //props.setErrorMessage(null)}, 5000)
	  setBlogTitle('')
	  setBlogAuthor('')
	  setBlogUrl('')
	} catch (exception) {
	  //setErrorMessage({exception})
	  console.log(exception, 'is exception')
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
  
  
   return (
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
}

export default BlogForm