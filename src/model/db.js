import md5 from 'md5'
import axios from 'axios'

const DB_HEADER_JSON = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
const DB_HEADER = { headers: DB_HEADER_JSON }

export const URL = `http://localhost:3000/users`

export const create = (name, email) => {
  const id = md5(JSON.stringify({ name, email, now: Date.now() }))
  return axios.post(URL, JSON.stringify({ name, email, id }), DB_HEADER)
}

export const read = id => axios.get(`${URL}/${id}`)

export const update = (name, email, id) => axios.put(`${URL}/${id}`, JSON.stringify({ id, name, email }), DB_HEADER)

export const remove = id => axios.delete(`${URL}/${id}`)

export const getTable = () => axios.get(URL)
