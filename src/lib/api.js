import axios from 'axios'

const baseUrl = 'https://newsapi.org/v2'
const apiKey = 'dae9c70dfb4c409f9e684bccc6a9355e'

export const getEverything = params => {

  const { query, source } = params

  function defineQuery(query, source){
    let queryString = ''
    if (query) {
      queryString += `q=${query}&`
    }
    if (source) {
      queryString += `sources=${source}&`
    }
    return queryString
  }
  console.log(`${baseUrl}/everything?${defineQuery(query, source)}apiKey=${apiKey}`)

  return axios.get(`${baseUrl}/everything?${defineQuery(query, source)}apiKey=${apiKey}`)
  // return axios.get(`${baseUrl}/everything?q=${query}&sources=${source}&apiKey=${apiKey}`)
}