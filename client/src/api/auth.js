import axios from 'axios'

const API = "/api"
export const registerRequest = user => axios.post(`${API}/register`, user)
