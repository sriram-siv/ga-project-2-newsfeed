import axios from 'axios'

const baseUrl = 'https://gnews.io/api/v4'
const apiKey = process.env.REACT_APP_MY_API_KEY

export const getStories = params => {

  let queryString = ''
  Object.keys(params).forEach(key => {
    if (params[key]) {
      queryString += `${key}=${params[key]}&`
    }
  })

  return axios.get(`${baseUrl}/search?${queryString}token=${apiKey}`)
}

export const getTopStories = (category) => {
  return axios.get(`${baseUrl}/top-headlines?topic=${category.toLowerCase()}&token=${apiKey}`)
}

export const getTopStoriesInCountry = (country) => {
  return axios.get(`${baseUrl}/top-headlines?country=${country}&token=${apiKey}`)
}