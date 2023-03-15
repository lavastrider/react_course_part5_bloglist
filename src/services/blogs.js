import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  console.log('we are in the update in service')
  return request.then((response) => response.data)
}

const deleteEntry = (id) => {
  console.log('we dare in the delete entry')
  axios.delete(`${baseUrl}/${id}`)
  console.log('we deleted the entry')
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
  getAll,
  create,
  update,
  deleteEntry,
  setToken 
}