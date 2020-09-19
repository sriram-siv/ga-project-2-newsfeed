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

export const getTopStories = async (category) => {
  const pageSize = '&pageSize=15'
  
  // let response
  const response = await getCategoryURL(category, pageSize)
  // if (category === 'Business'){
    console.log(response)
  // } else if (category === 'Technology') {
  //   response = axios.get(`${baseUrl}/top-headlines?category=technology${pageSize}&apiKey=${apiKey}`)
  // } else if (category === 'Entertainment') {
  //   response = axios.get(`${baseUrl}/top-headlines?category=entertainment${pageSize}&apiKey=${apiKey}`)
  // } else if (category === 'Health') {
  //   response = axios.get(`${baseUrl}/top-headlines?category=health${pageSize}&apiKey=${apiKey}`)
  // } else {
  //   response = axios.get(`${baseUrl}/top-headlines?category=sport${pageSize}&apiKey=${apiKey}`)
  // }
  
  return response

}

async function getCategoryURL(category, pageSize){
  return await axios.get(
    `${baseUrl}/top-headlines?category=${category.toLowerCase()}${pageSize}&apiKey=${apiKey}`
  )

}