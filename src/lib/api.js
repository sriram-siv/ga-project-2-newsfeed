import axios from 'axios'

const baseUrl = 'https://newsapi.org/v2'
const apiKey = '9be5f7a0c56142638c29c8c773f91044'

export const getEverything = params => {

  let queryString = ''
  Object.keys(params).map(key => {
    if (params[key]) {
      queryString += `${params[key] ? key + '=' + params[key] + '&' : ''}`
    }
  })

  // const queryString =
  //   `${query ? 'q=' + query + '&' : ''}` +
  //   `${source ? 'sources=' + source + '&' : ''}` +
  //   `${pageSize ? 'pageSize=' + pageSize + '&' : ''}`

  return axios.get(`${baseUrl}/everything?${queryString}apiKey=${apiKey}`)
}

export const getSources = () => {
  return axios.get(`${baseUrl}/sources?apiKey=${apiKey}`)
}

export const getTopStories = (category) => {
  return axios.get(`${baseUrl}/top-headlines?category=${category.toLowerCase()}&pageSize=15&apiKey=${apiKey}`)
}