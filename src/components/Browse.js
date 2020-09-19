import React from 'react'
import { getEverything, getSources } from '../lib/api'
import { saveKeyword, saveSource } from '../lib/feed'
import { popupNotification } from '../lib/notifications'

import NewsCard from './NewsCard'
import Filter from './Filter'

class Browse extends React.Component {
  
  state = {
    params: {
      q: '',
      source: '',
      sourceName: '' 
    },
    sources: null,
    articles: [],
    suggestions: '',
    formActive: true
  }

  async componentDidMount() {
    const response = await getSources()
    this.setState({ sources: response.data.sources })
  }
  
  findMatchingSources(wordSearched) {
    
    const matches = this.state.sources.filter(source => {
      // Remove illegal regex characters
      const illegalChars = ['(', ')', '[', ']']
      illegalChars.map(char => wordSearched = wordSearched.replaceAll(char, ''))
      
      const split = wordSearched.split(' ')
      return split.every(word => source.id.match(new RegExp(word, 'i')))
    })
    return matches
  }
  
  handleSubmit = async (event) => {
    event.preventDefault()
    // Show error message to user if invalid source
    if (this.state.params.sourceName !== '' && this.state.params.source === '') {
      popupNotification('No source matching that name')
      return
    }
    this.toggleForm(false)

    const response = await getEverything({ ...this.state.params, sourceName: null })
    console.log(response)
    this.setState({ 
      articles: response.data.articles
    })
  }

  toggleForm = (state) => {
    this.setState({
      formActive: state
    })
  }

  handleChange = (event) => {

    const params = {
      ...this.state.params,
      [event.target.name]: event.target.value
    }
    
    let suggestions = this.state.suggestions
    if (event.target.name === 'sourceName' && this.state.sources) {
      // Remove matched source if user edits the input field
      params.source = ''
      const matchesArray = this.findMatchingSources(event.target.value)
      suggestions = matchesArray.map(source => source.name)

      if (!event.target.value){
        suggestions = ''
      }
    }
    
    this.setState({
      params,
      suggestions
    })
  }

  handleAutocomplete = event => {
    let id, name
    // Find matching object in sources and save id and name to params
    for (let i = 0; i < this.state.sources.length; i++) {
      if (this.state.sources[i].name === event.target.innerHTML) {
        id = this.state.sources[i].id
        name = this.state.sources[i].name
      }
    }
    const params = {
      ...this.state.params,
      source: id,
      sourceName: name
    }
    this.setState({ params, suggestions: '' })
  }

  // Hide autocomplete when input loses focus
  handleBlur = () => {
    // On delay timer so that it doesnt prevent onClick from firing on the item
    setTimeout(() => this.setState({ suggestions: null }), 150)
  }

  addToFeed = param => {
    if (param === 'q') saveKeyword(this.state.params.q)
    if (param === 'source') saveSource(this.state.params.source)
    
    popupNotification('Added in Feed')
  }

  render() {
    return (
      <>
        <div className="header"></div>
        <div className="browse-outercontainer">
          <Filter params={this.state.params}
            suggestions={this.state.suggestions}
            formActive={this.state.formActive}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleAutocomplete={this.handleAutocomplete}
            handleBlur={this.handleBlur}
            toggleForm={this.toggleForm}
            addToFeed={this.addToFeed} />
          
        </div>
        <div className="news-grid">
          {this.state.articles.length > 0 && this.state.articles.map((article, i) => <NewsCard key={i} {...article}/> )}
        </div>

      </>
    )
  }
}

export default Browse