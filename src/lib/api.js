import axios from 'axios'

const baseUrl = 'https://newsapi.org/v2'
const apiKey = 'dae9c70dfb4c409f9e684bccc6a9355e'

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

export const getTopStories = () => {
  const pageSize = '&pageSize=5'
  const categories = ['business', 'technology', 'entertainment', 'health', 'sport']
  const business = axios.get(`${baseUrl}/top-headlines?category=${categories[0]}${pageSize}&apiKey=${apiKey}`)
  // const tech = axios.get(`${baseUrl}/top-headlines?category=${categories[1]}${pageSize}&apiKey=${apiKey}`)
  // const entertainment = axios.get(`${baseUrl}/top-headlines?category=${categories[2]}${pageSize}&apiKey=${apiKey}`)
  // const health = axios.get(`${baseUrl}/top-headlines?category=${categories[3]}${pageSize}&apiKey=${apiKey}`)
  // const sport = axios.get(`${baseUrl}/top-headlines?category=${categories[4]}${pageSize}&apiKey=${apiKey}`)

  return business

}

