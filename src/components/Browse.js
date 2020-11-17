import React from 'react'
import { getStories, getTopStoriesInCountry } from '../lib/api'
import { countryCodes } from '../lib/countryCodes'
import { saveKeyword, saveCountry } from '../lib/feed'
import { popupNotification } from '../lib/notifications'

import NewsCard from './NewsCard'
import Filter from './Filter'

class Browse extends React.Component {
  
  state = {
    params: {
      q: '',
      country: '',
      countryName: ''
    },
    countries: null,
    articles: null,
    suggestions: '',
    formActive: true
  }

  async componentDidMount() {
    this.setState({ countries: countryCodes })
  }
  
  findMatchingCountries(wordSearched) {
    
    return this.state.countries.filter(country => {
      // Remove illegal regex characters
      const illegalChars = ['(', ')', '[', ']']
      illegalChars.map(char => wordSearched = wordSearched.replaceAll(char, ''))
      
      return wordSearched.split(' ').every(word => country.name.match(new RegExp(word, 'i')))
    }).map(country => country.name)
  }
  
  handleSubmit = async (event) => {
    event.preventDefault()
    const { params } = this.state
    // Show error message to user if invalid country
    if (params.countryName !== '' && params.country === '') {
      popupNotification('No country matching that name')
      return
    }
    this.toggleForm(false)

    const response = params.country && !params.q
      ? await getTopStoriesInCountry(params.country)
      : await getStories({ ...this.state.params, countryName: '' })
    console.log(response)
    this.setState({ 
      articles: response.data.articles
    })
  }

  toggleForm = (state) => {
    this.setState({ formActive: state })
  }

  handleChange = event => {

    const params = {
      ...this.state.params,
      [event.target.name]: event.target.value
    }
    
    let suggestions = this.state.suggestions
    if (event.target.name === 'countryName' && this.state.countries) {
      // Remove matched source if user edits the input field
      params.country = ''
      suggestions = this.findMatchingCountries(event.target.value)
      if (!event.target.value){
        suggestions = ''
      }
    }
    this.setState({ params, suggestions })
  }

  handleAutocomplete = event => {
    // Find matching object in countries and save id to params
    for (let i = 0; i < this.state.countries.length; i++) {
      if (this.state.countries[i].name === event.target.innerHTML) {
        this.setState({ params: { ...this.state.params, country: this.state.countries[i].code, countryName: event.target.innerHTML } })
      }
    }
  }

  // Hide autocomplete when input loses focus
  handleBlur = () => {
    // On delay timer so that it doesnt prevent onClick from firing on the item
    setTimeout(() => this.setState({ suggestions: null }), 150)
  }

  addToFeed = param => {
    if (param === 'q') saveKeyword(this.state.params.q)
    if (param === 'country') saveCountry(this.state.params.country)
    
    popupNotification('Added in Feed')
  }

  render() {
    return (
      <>
        <div className="header"></div>

        <Filter params={this.state.params}
          suggestions={this.state.suggestions}
          formActive={this.state.formActive}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleAutocomplete={this.handleAutocomplete}
          handleBlur={this.handleBlur}
          toggleForm={this.toggleForm}
          addToFeed={this.addToFeed} />
          
        <div className="news-grid">
          {this.state.articles && this.state.articles.map((article, i) => < NewsCard key={i} {...article} />)}
        </div>

      </>
    )
  }
}

export default Browse