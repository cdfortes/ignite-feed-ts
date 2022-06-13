import axios from 'axios'

const URL = 'http://localhost:3000/api'

export const api = axios.create({
  baseURL: URL
})
