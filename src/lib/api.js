import axios from 'axios'

const baseUrl = 'https://newsapi.org/v2'
const apiKey = '9be5f7a0c56142638c29c8c773f91044'

export const getEverything = params => {

  const { query, source, pageSize } = params

  function defineQuery(query, source, pageSize ){
    let queryString = ''
    if (query) {
      queryString += `q=${query}&`
    }
    if (source) {
      queryString += `sources=${source}&`
    }
    if (pageSize) {
      queryString += `pageSize=${pageSize}&`
    }
    return queryString
  }
  console.log(`${baseUrl}/everything?${defineQuery(query, source, pageSize)}apiKey=${apiKey}`)

  return axios.get(`${baseUrl}/everything?${defineQuery(query, source, pageSize)}apiKey=${apiKey}`)
  // return axios.get(`${baseUrl}/everything?q=${query}&sources=${source}&apiKey=${apiKey}`)
}

export const getSources = () => {
  return axios.get(`${baseUrl}/sources?apiKey=${apiKey}`)
}