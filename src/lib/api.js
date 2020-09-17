import axios from 'axios'

const baseUrl = 'https://newsapi.org/v2'
const apiKey = 'dae9c70dfb4c409f9e684bccc6a9355e'

export const getEverything = params => {

  const { query } = params

  return axios.get(`${baseUrl}/everything?q=${query}&apiKey=${apiKey}`)
}